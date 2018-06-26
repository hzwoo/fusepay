/**
 * lib/modules/channel/tenpay/close-order.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class CloseOrder extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_close_order.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'out_trade_no:32',
      'optional!total_fee:11',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32'
    ];
  }
}

module.exports = CloseOrder;