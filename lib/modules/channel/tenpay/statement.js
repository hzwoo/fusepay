/**
 * lib/modules/channel/tenpay/reverse.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class Statement extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_mch_statement_down.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'bill_date:32',
      'optional!bill_type:32', // ALL，返回当日所有交易账单 
      // SUCCESS，返回当日支付账单 
      // REFUND，返回当日退款账单 
      // RECHAR，返回当日现金账户退款账单
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32',
      'optional!tar_type:8'
    ];
  }
}

module.exports = Statement;