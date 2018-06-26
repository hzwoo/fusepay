/**
 * lib/modules/channel/alipay/alipay-utils.js
 */

'use strict';

const moment = require('moment');
const qs = require('qs');
const crypto = require('crypto');

const DEFAULT_RANDOM_BYTES = 8;

class AlipayUtils {

  constructor() {}

  getCurrentTimestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  getFutureTimestamp(milliseconds) {
    return moment(moment() + milliseconds).format('YYYY-MM-DD HH:mm:ss');
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

  sign(data, privateKey) {
    const sortedData = this._sortDataByKey(data);
    let signedStr = this._generateSignedString(sortedData);

    const signature = crypto.createSign('RSA-SHA1').update(signedStr, 'utf8');
    return signature.sign(privateKey, 'base64');
  }

  verifySign(signedStr, signature, publicKey) {
    const verify = crypto.createVerify('RSA-SHA1').update(signedStr, 'utf8');
    return verify.verify(publicKey, signature, 'base64');
  }

  centToYuan(amount) {
    return (parseFloat(amount) / 100).toFixed(2);
  }

  yuanToCent(amount) {
    return parseInt(amount * 100);
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

  _generateSignedString(data) {
    let queryStr = '';
    const total_count = Object.keys(data).length;
    Object.keys(data).forEach(function(key) {
      queryStr += key + '=' + data[key] + '&';
    });
    queryStr = queryStr.substr(0, queryStr.length - 1);
    return queryStr;
  }

}

module.exports = new AlipayUtils;