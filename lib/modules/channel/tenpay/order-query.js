/**
 * lib/modules/channel/tenpay/order-query.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class OrderQuery extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_order_query.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'optional!sub_mch_id:32',
      'nonce_str:32',
      'sign:128',
      'optional!appid:32',
      'optional!sub_appid:32',
      'either![transaction_id:32|out_trade_no:32]',
    ];
  }
}

module.exports = OrderQuery;