/**
 * lib/modules/channel/wechatpay/reverse.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class Reverse extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'secapi/pay/reverse';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'either![transaction_id:32|out_trade_no:32]'
    ];
  }
}

module.exports = Reverse;