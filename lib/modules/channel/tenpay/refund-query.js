/**
 * lib/modules/channel/tenpay/refund-query.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class RefundQuery extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_refund_query.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'either![refund_id:32|out_refund_no:32|transaction_id:32|out_trade_no:32]',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32'
    ];
  }
}

module.exports = RefundQuery;