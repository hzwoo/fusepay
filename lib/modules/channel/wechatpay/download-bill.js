/**
 * lib/modules/channel/wechatpay/download-bill.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class DownloadBill extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'pay/downloadbill';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'bill_date:8',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'optional!device_info:32',
      'optional!bill_type:8',
      'optional!tar_type:8'
    ];
  }
}

module.exports = DownloadBill;