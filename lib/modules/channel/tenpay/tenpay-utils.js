/**
 * lib/modules/channel/tenpay/tenpay-utils.js
 */

'use strict';

const moment = require('moment');
const qs = require('qs');
const crypto = require('crypto');

const DEFAULT_RANDOM_BYTES = 8;

class TenpayUtils {

  constructor() {}

  getCurrentTimestamp() {
    return moment().format('YYYYMMDDHHmmss')
  }

  getFutureTimestamp(milliseconds) {
    return moment(moment() + milliseconds).format('YYYYMMDDHHmmss');
  }

  stringifyRequestData(data) {
    if (data.expand) {
      data = _.cloneDeep(data);
      data['expand[]'] = data.expand;
      delete data.expand;
    }
    return qs.stringify(data, {
      indices: false
    });
  }

  generateRandomString(bytes) {
    if (bytes) {
      switch (typeof(bytes)) {
        case 'string':
          return crypto.randomBytes(parseInt(bytes)).toString('hex');
        case 'number':
          return crypto.randomBytes(bytes).toString('hex');
        default:
          return crypto.randomBytes(DEFAULT_RANDOM_BYTES).toString('hex');
      }
    }
    return crypto.randomBytes(DEFAULT_RANDOM_BYTES).toString('hex');
  }

  sign(data, secret) {
    const sortedData = this._sortDataByKey(data);
    const signedStr = this._generateSignedString(sortedData, secret);

    const signature = crypto.createHash('md5')
      .update(signedStr, 'utf8')
      .digest('hex');
    return signature.toUpperCase();
  }

  verifySign(data, sign, secret) {
    const signature = this.sign(data, secret);
    return signature == sign;
  }

  renderCDATA(data) {
    switch (typeof(data)) {
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

  _sortDataByKey(data) {
    const sorted = {};
    Object.keys(data).sort().forEach(function(key) {
      if (key != 'sign' && data[key] && data[key] != '') {
        sorted[key] = data[key];
      }
    });
    return sorted;
  }

  _generateSignedString(data, secret) {
    let signedString = '';
    const total_count = Object.keys(data).length;
    Object.keys(data).forEach(function(key) {
      if (typeof(data[key]) == 'string' ||
        typeof(data[key]) == 'number' ||
        typeof(data[key]) == 'boolean') {
        signedString += key + '=' + data[key] + '&';
      }
    });
    if (secret) {
      signedString += 'key=' + secret;
    } else {
      signedString = signedString.substr(0, signedString.length - 1);
    }

    return signedString;
  }

}

module.exports = new TenpayUtils;