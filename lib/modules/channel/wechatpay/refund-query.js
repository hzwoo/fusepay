/**
 * lib/modules/channel/wechatpay/refund-query.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class RefundQuery extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'pay/refundquery';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'either![transaction_id:32|out_trade_no:32|out_refund_no:32|refund_id:28]',
      'optional!device_info:32'
    ];
  }
}

module.exports = RefundQuery;