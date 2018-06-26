/**
 * lib/modules/channel/wechatpay/refund.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class Refund extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'secapi/pay/refund';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'out_refund_no:32',
      'total_fee:9',
      'refund_fee:9',
      'op_user_id:32',
      'optional!device_info:32',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'optional!refund_fee_type:8',
      'either![transaction_id:32|out_trade_no:32]',
      'optional!refund_account:30'
    ];
  }
}

module.exports = Refund;