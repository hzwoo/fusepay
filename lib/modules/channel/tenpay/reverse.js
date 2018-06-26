/**
 * lib/modules/channel/tenpay/reverse.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class Reverse extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_reverse.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'either![transaction_id:32|out_trade_no:32]',
      'op_user_id:32',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32',
      'optional!op_user_passwd:32'
    ];
  }
}

module.exports = Reverse;