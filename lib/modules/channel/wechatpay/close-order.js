/**
 * lib/modules/channel/wechatpay/close-order.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class CloseOrder extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'pay/closeorder';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'out_trade_no:32',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32'
    ];
  }
}

module.exports = CloseOrder;