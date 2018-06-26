/**
 * lib/modules/channel/tenpay/micro-pay.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class MicroPay extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_micro_pay.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'body:128',
      'out_trade_no:32',
      'fee_type:16',
      'total_fee:11',
      'spbill_create_ip:16',
      'notify_url:256',
      'device_info:32',
      'auth_code:32',
      'trade_type:16',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32',
      'optional!attach:128',
      'optional!limit_pay:32',
      'optional!promotion_tag:128'
    ];

    this.commonData = {
      trade_type: 'MICROPAY'
    };
  }
}

module.exports = MicroPay;