/**
 * lib/common/utils.js
 */

'use strict';

const _ = require('lodash');
const os = require('os');
const crypto = require('crypto');
const qs = require('qs');
const moment = require('moment');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Constant = require('./constant');

class Utility {
  constructor() {
    this._orderCounter = this.counter(1000);
    this._orderPool = this.queue(1);
    this._accountCounter = this.counter(1000);
    this._accountPool = this.queue(10);
  }

  queue(step) {
    let n = 0;
    const moveStep = step || 1;
    return {
      enque: function() {
        const tick = n;
        n += moveStep;
        return tick;
      },
      deque: function() {
        if (n > 0) {
          n -= moveStep;
        }
      }
    };
  }

  counter(loop) {
    let n = 0;
    loop = loop || Utility.DEFAULT_LOOP;
    return {
      count: function() {
        return (++n < loop) ? n : this.reset(1);
      },
      reset: function(num) {
        n = num || 0;
        return n;
      }
    };
  }

  makeTransactionId(transType) {
    const self = this;
    return new Promise(function(resolve, reject) {
      const delay = self._orderPool.enque();
      setTimeout(function() {
        self._orderPool.deque();
        resolve(self._makeTransactionId(
          transType,
          self._orderCounter.count()
        ));
      }, delay);
    });
  }

  makeOrderNo(transId) {
    let orderNo = null;

    let parts = transId.replace(/[A-Z]/g, ',').split(',');

    const machineCode = parts[0];
    const transCode = parts[1];

    const machinePart = parseInt(machineCode, 36).toString(10);
    const transPart = parseInt(transCode, 36).toString(10);

    let ipPart = parseInt(machinePart.substr(0, machineCode.length));
    const ip = this.convertIpIntegerToString(ipPart);
    ipPart = _.padStart(this.convertIpStringToInteger(ip, 2), 5, '0');
    const pidPart = machinePart.substr(machineCode.length, 5);

    const timestamp = parseInt(transPart.substr(0, 10));
    const typeCode = transPart.substr(10, 2);
    const sn = transPart.substr(12, 3);

    const datetime = new Date(timestamp * 1000);
    const dateStr = datetime.toDateString();
    const dateBegin = new Date(dateStr);
    const beginstamp = Math.round(dateBegin.getTime() / 1000);

    const datePart = moment(dateBegin).format('YYYYMMDD');
    const secPart = timestamp - beginstamp;

    orderNo = typeCode + datePart + ipPart + pidPart + secPart + sn;

    return orderNo;
  }

  makeObjectId() {
    return (new ObjectId).toString();
  }

  makeTestApiKey(id, secret) {
    const password = secret || Utility.DEFAULT_API_SECRET;
    const salt = _.padStart(
      (new Date()).getMilliseconds(),
      Utility.DEFAULT_SALT_LENGTH,
      '0'
    );
    return this._generateApiKey(
      id, password, salt, 'test', Utility.DEFAULT_API_KEY_PREFIX);
  }

  makeLiveApiKey(id, secret) {
    const password = secret || Utility.DEFAULT_API_SECRET;
    const salt = _.padStart(
      (new Date()).getMilliseconds(),
      Utility.DEFAULT_SALT_LENGTH,
      '0'
    );
    return this._generateApiKey(
      id, password, salt, 'live', Utility.DEFAULT_API_KEY_PREFIX);
  }

  _generateApiKey(id, password, salt, status, prefix) {
    const now = new Date();
    let plain = id;
    plain += salt || '';
    const key = this.encrypt(plain, password);
    prefix = prefix + '_' || '';
    prefix += status + '_';
    return prefix + key;
  }

  extractApiKey(key, secret, saltLength, prefix) {
    const KEY_REGEX = /^(?:[\w]{2})\_([\w]{4})\_([0-9A-z]+)/;
    const password = secret || Utility.DEFAULT_API_SECRET;
    const extracted = {
      status: null,
      user: null
    };

    prefix = prefix || Utility.DEFAULT_API_KEY_PREFIX;
    saltLength = saltLength || Utility.DEFAULT_SALT_LENGTH;
    let m = key.match(KEY_REGEX);
    let plain = null;

    if (m) {
      extracted.status = m[1];
      const encrypted = m[2];
      plain = this.decrypt(encrypted, password);
      extracted.user = plain.substr(0, plain.length - saltLength);
    }

    return extracted;
  }

  digestPassword(password) {
    const salt = this.makeRandomHex(Utility.SALT_LENGTH);
    const hash = crypto.createHash('sha256');
    const digest = hash.update(password + salt).digest('hex');
    const offset = parseInt(digest[0], 16) + 1;
    return digest.substr(0, offset) + salt +
      digest.substr(offset, digest.length - offset);
  }

  verifyPassword(password, source) {
    const offset = parseInt(source[0], 16) + 1;
    const salt = source.substr(offset, Utility.SALT_BYTE * 2);
    const srcPassHash = source.substr(0, offset) +
      source.substr(offset + salt.length, source.length - offset - salt.length);
    const hash = crypto.createHash('sha256');
    const passHash = hash.update(password + salt).digest('hex');
    return passHash == srcPassHash;
  }

  makeQRCode(text, options) {
    const self = this;
    return new Promise(function(resolve, reject) {
      options = options || {};
      QRCode.toDataURL(
        text,
        options,
        function(err, url) {
          if (err) {
            reject(err);
          }
          resolve(url);
        }
      );
    });
  }

  makeRandomHex(bytes) {
    if (bytes) {
      switch (typeof(bytes)) {
        case 'string':
          return crypto.randomBytes(parseInt(bytes)).toString('hex');
        case 'number':
          return crypto.randomBytes(bytes).toString('hex');
        default:
          return crypto.randomBytes(Utility.DEFAULT_RANDOM_BYTES).toString('hex');
      }
    }
    return crypto.randomBytes(Utility.DEFAULT_RANDOM_BYTES).toString('hex');
  }

  makeRandomCode(length) {
    length = length || 6;
    return _.chain(_.fill(Array(length), 0))
      .map(_.random.bind(null, 9, false))
      .join('')
      .value();
  }

  makeRandomNumber(min, max, options) {
    min = (min == 0) ? 0 :
      Math.ceil(min ? parseInt(min) : Utility.DEFAULT_RANDOM_MIN);
    max = Math.floor(max ? parseInt(max) : Utility.DEFAULT_RANDOM_MAX);
    let range = max - min;
    let pad = 0;
    const seed = Math.random();
    let rand = Math.floor(seed * (range + 1)) + min;
    if (options) {
      if (options.minExclusive && rand == min) {
        rand = min + 1;
      }
      if (options.maxExclusive && rand == max) {
        rand = max - 1;
      }
      if (options.padding) {
        pad = parseInt(options.padding);
      }
    }
    return pad ? _.padStart(rand, pad, '0') : rand;
  }

  centToYuan(amount) {
    return (parseFloat(amount) / 100).toFixed(2);
  }

  yuanToCent(amount) {
    return parseInt(amount * 100);
  }

  getOffset(page, pageSize) {
    if (page && pageSize) {
      return page * pageSize;
    } else if (page && !pageSize) {
      return page * Constant.DEFAULT.PAGE_SIZE;
    } else {
      return Constant.DEFAULT.OFFSET;
    }
  }

  getHostIpAddresses(protocol) {
    protocol = protocol || Utility.DEFAULT_IP_PROTOCOL;
    const ipAddrs = {};
    const network = os.networkInterfaces();
    for (let devName in network) {
      network[devName].forEach(function(iface) {
        if (iface.family == protocol) {
          ipAddrs[devName] = iface.address;
        }
      });
    }
    return ipAddrs;
  }

  getHostIpAddress(protocol) {
    const ipAddrs = this.getHostIpAddresses(protocol);
    const REGEX_NET_DEVICE = /^(eth|enp|wl)/;
    let ip = ipAddrs.lo;
    Object.keys(ipAddrs).some(function(key) {
      if (REGEX_NET_DEVICE.test(key)) {
        ip = ipAddrs[key];
        return true;
      } else {
        return false;
      }
    });
    return ip;
  }

  getHostMacAddresses(protocol) {
    protocol = protocol || Utility.DEFAULT_IP_PROTOCOL;
    const addrs = {};
    const network = os.networkInterfaces();
    for (let devName in network) {
      network[devName].forEach(function(iface) {
        if (iface.family == protocol) {
          addrs[devName] = iface.mac;
        }
      });
    }
    return addrs;
  }

  getHostMacAddress(protocol) {
    const addrs = this.getHostMacAddresses(protocol);
    const REGEX_NET_DEVICE = /^(eth|enp|wl)/;
    let mac = addrs.lo;
    Object.keys(addrs).some(function(key) {
      if (REGEX_NET_DEVICE.test(key)) {
        mac = addrs[key];
        return true;
      } else {
        return false;
      }
    });
    return mac;
  }

  renderCDATA(data) {
    switch (typeof data) {
      case 'object':
        return '<![CDATA[' + JSON.stringify(data) + ']]>';
      case 'function':
        return '<![CDATA[' + data.toString() + ']]>';
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
      default:
        return '<![CDATA[' + data + ']]>';
    }
  }


  base64Encode(str) {
    return new Buffer(str).toString('base64');
  }

  base64Decode(str) {
    return new Buffer(str, 'base64').toString();
  }

  encrypt(data, password, algorithm, encoding) {
    password = password || '';
    algorithm = algorithm || Utility.DEFAULT_CRYPTOR_ALGORITHM;
    encoding = encoding || Utility.DEFAULT_CRYPTOR_ENCODING;
    const cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(data, 'utf8', encoding);
    encrypted += cipher.final(encoding);
    return encrypted;
  }

  decrypt(data, password, algorithm, encoding) {
    password = password || '';
    algorithm = algorithm || Utility.DEFAULT_CRYPTOR_ALGORITHM;
    encoding = encoding || Utility.DEFAULT_CRYPTOR_ENCODING;
    const decipher = crypto.createDecipher(algorithm, password);
    let decrypted = decipher.update(data, encoding, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  md5(data) {
    return crypto.createHash('md5')
      .update(data, 'utf8')
      .digest('hex');
  }

  signWithMD5(data, secret, withKey, uppercase) {
    let toSign = '';
    if (secret && withKey) {
      toSign = data + '&key=' + secret;
    } else if (secret) {
      toSign = data + secret;
    } else {
      toSign = data;
    }

    const signature = crypto.createHash('md5')
      .update(toSign, 'utf8')
      .digest('hex');
    return uppercase ? signature.toUpperCase() : signature;
  }

  verifyWithMD5(signed, data, secret, withKey, uppercase) {
    const signature = this.signWithMD5(data, secret, withKey, uppercase);
    return signature == signed;
  }

  signSHA1WithRSA(data, privateKey) {
    const sign = crypto.createSign('RSA-SHA1').update(data, 'utf8');
    return sign.sign(privateKey, 'base64');
  }

  verifySHA1WithRSA(signed, signature, publicKey) {
    const verify = crypto.createVerify('RSA-SHA1').update(signed);
    return verify.verify(publicKey, signature, 'base64');
  }

  signSHA256WithRSA(data, privateKey) {
    const sign = crypto.createSign('RSA-SHA256').update(data, 'utf8');
    return sign.sign(privateKey, 'base64');
  }

  verifySHA256WithRSA(signed, signature, publicKey) {
    const verify = crypto.createVerify('RSA-SHA256').update(signed);
    return verify.verify(publicKey, signature, 'base64');
  }

  /**
   * 最好不要使用 >> ，推荐使用 >>> 因为最左边一位会被解析成符号位，当数字溢出>时，会被解析成负数
   */
  convertIpIntegerToString(ip) {
    const PART1 = 0xFF000000;
    const PART2 = 0xFF0000;
    const PART3 = 0xFF00;
    const PART4 = 0xFF;

    let strIp = '';
    strIp += (ip & PART1) >>> 24;
    strIp += '.' + ((ip & PART2) >>> 16);
    strIp += '.' + ((ip & PART3) >>> 8);
    strIp += '.' + (ip & PART4);

    return strIp;
  }

  /**
   *  unsigned = signed>>>0;
   *  通过使用无符号右移运算符，位动位数为0，可以将32位有符号整数，转化为32位无符号整数。
   *  signed = unsigned << 0;
   *  通过使用左移运算符，位动位数为0，可以将32位无符号整数，转化为32位有符号整数。
   */
  convertIpStringToInteger(ip, bytes, reverse) {
    const parts = reverse ? ip.split('.').reverse() : ip.split('.');
    let intIp = 0;

    for (let i = 0; i < bytes; i++) {
      let part = parseInt(parts[i]);
      let shifted = (bytes - i - 1) * 8;
      intIp = (shifted > 0) ? (intIp | (part << shifted)) : (intIp | part);
    }
    intIp = intIp >>> 0;
    return intIp;
  }



  _checkBit(num) {
    let cumsum = 0;
    for (let i = 0; i < num.length; ++i) {
      let weight = (i % 2 == 0) ? 1 : 2;
      let code = _.isNumber(num[i]) ? num[i] : num[i].charCodeAt();
      cumsum += weight * code;
    }
    return cumsum % 10;
  }

  _makeOrderNo(transId) {
    let orderNo = null;

    let parts = transId.replace(/[A-Z]/g, ',').split(',');

    const machineCode = parts[0];
    const transCode = parts[1];

    const machinePart = parseInt(machineCode, 36).toString(10);
    const transPart = parseInt(transCode, 36).toString(10);

    let ipPart = parseInt(machinePart.substr(0, machineCode.length));
    const ip = this.convertIpIntegerToString(ipPart);
    ipPart = _.padStart(this.convertIpStringToInteger(ip, 2), 5, '0');
    const pidPart = machinePart.substr(machineCode.length, 5);

    const timestamp = parseInt(transPart.substr(0, 10));
    const typeCode = transPart.substr(10, 2);
    const sn = transPart.substr(12, 3);

    const datetime = new Date(timestamp * 1000);
    const dateStr = datetime.toDateString();
    const dateBegin = new Date(dateStr);
    const beginstamp = Math.round(dateBegin.getTime() / 1000);

    const datePart = dateBegin.format('yyyyMMdd');
    const secPart = timestamp - beginstamp;

    orderNo = typeCode + datePart + ipPart + pidPart + secPart + sn;

    return orderNo;
  }

  /**
   * 交易ID由2个数值类型叠加组成
   * Part1: 机器识别码 =  IP的整数表示 + 进程号PID
   * Part2: 交易序列码 = 时间戳 + 交易类型码 + 序列号
   * 分别将两个数值转换成36位字符串再拼接
   */
  _makeTransactionId(transType, sn) {
    const UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let typeCode = null;
    switch (transType) {
      case 'PAYMENT':
        typeCode = Utility.TRANSACTION_TYPE.PAYMENT;
        break;
      case 'TRANSFER':
        typeCode = Utility.TRANSACTION_TYPE.TRANSFER;
        break;
      case 'DIRECTDEBIT':
        typeCode = Utility.TRANSACTION_TYPE.DIRECTDEBIT;
        break;
      case 'REDPACK':
        typeCode = Utility.TRANSACTION_TYPE.REDPACK;
        break;
      case 'REFUND':
        typeCode = Utility.TRANSACTION_TYPE.REFUND;
        break;
      default:
        typeCode = Utility.TRANSACTION_TYPE.OTHER;
        break;
    }
    const ip = this.getHostIpAddress();
    const ipPart = this.convertIpStringToInteger(ip, 4, true);
    const pidPart = _.padStart(process.pid, 5, '0');

    const machinePart = '' + ipPart + pidPart;
    const machineCode = parseInt(machinePart, 10).toString(36);

    const timestamp = Math.round((new Date()).getTime() / 1000);
    const snPart = _.padStart(sn, 3, '0');
    const transPart = '' + timestamp + typeCode + snPart;
    const transCode = parseInt(transPart, 10).toString(36);

    const rand = this.makeRandomNumber(0, 25);
    const orderNo = machineCode + UC[rand] + transCode;

    return orderNo;
  }


  // makeAccountId(type) {
  //   let settingName = null;
  //   if (type) {
  //     switch (type.toLowerCase()) {
  //       case 'user':
  //         settingName = 'last_user_sn';
  //         break;
  //       case 'merchant':
  //         settingName = 'last_merchant_sn';
  //         break;
  //       case 'agent':
  //         settingName = 'last_agent_sn';
  //         break;
  //       default:
  //         return null;
  //     }
  //   } else {
  //     return null;
  //   }

  //   return this._makeAccountId(settingName);
  // }

  // async _makeAccountId(settingName) {
  //   const self = this;

  //   try {
  //     let accountId = null;
  //     const ret = await models.SystemSetting.select({
  //       columns: ['id', 'value'],
  //       criteria: {
  //         name: settingName
  //       }
  //     });
  //     if (ret && ret[0]) {
  //       const lastSn = ret[0];
  //       const accountSn = parseInt(lastSn.value) + 1;
  //       await models.SystemSetting.update({
  //           fields: {
  //             value: accountSn
  //           },
  //           criteria: {
  //             id: lastSn.id
  //           }
  //         })
  //         .catch(function(err) {
  //           Logger.logException('tools._makeAccountId', err);
  //         });

  //       const partSn = accountSn % Utility.ACCOUNT_PARTITION_SIZE;
  //       const partId = Math.round(accountSn / Utility.ACCOUNT_PARTITION_SIZE) + 1;
  //       accountId = '' + partId + _.padStart(partSn, Utility.ACCOUNT_PARTITION_LENGTH, '0');
  //       accountId += self._checkBit(accountId);
  //     }

  //     // console.log('accountId:',accountId);
  //     if (accountId) {
  //       resolve(accountId);
  //     } else {
  //       reject(new error.ReedpayError({
  //         code: 'SYSTEM_ERROR',
  //         message: 'Failed to make account ID'
  //       }));
  //     }
  //   } catch (err) {
  //     Logger.logException('tools._makeAccountId: ', err);
  //     reject(err);
  //   }
  // }

}

Utility.DEFAULT_RANDOM_BYTES = 8;
Utility.DEFAULT_RANDOM_MIN = 1;
Utility.DEFAULT_RANDOM_MAX = 999999;
Utility.DEFAULT_RANDOM_LENGTH = 6;
Utility.DEFAULT_RANDOM_STRING = true;
Utility.DEFAULT_LOOP = 1000;
Utility.DEFAULT_IP_BYTES = 2;
Utility.DEFAULT_SERIAL_NUMBER_LENGTH = 6;
Utility.DEFAULT_IP_PROTOCOL = 'IPv4';
Utility.DEFAULT_SN_PREFIX = 'FP';
Utility.DEFAULT_API_KEY_PREFIX = 'ak';
Utility.DEFAULT_CRYPTOR_ALGORITHM = 'aes128';
Utility.DEFAULT_CRYPTOR_ENCODING = 'hex';
Utility.DEFAULT_SALT_LENGTH = 3;

Utility.DEFAULT_API_SECRET = 'Secret!';
Utility.YEAR_MILLISECOND = 31536000000;
Utility.SALT_BYTE = 8;
Utility.IP_PAD_START = 'Z';
Utility.ACCOUNT_PARTITION_SIZE = 1000000;
Utility.ACCOUNT_PARTITION_LENGTH = 6;

Utility.TRANSACTION_TYPE = {
  PAYMENT: '20',
  TRANSFER: '30',
  DIRECTDEBIT: '10',
  REFUND: '40',
  OTHER: '99'
};

module.exports = Utility;