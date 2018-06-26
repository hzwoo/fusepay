/**
 * lib/modules/channel/tenpay/unified-order.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class UnifiedOrder extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_unified_order.cgi';
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
      'trade_type:16',
      'notify_url:256',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32',
      'optional!time_start:14',
      'optional!time_expire:14',
      'optional!limit_pay:32',
      'optional!contract_code:128',
      'optional!promotion_tag:128',
      'optional!device_info:32',
      'optional!attach:128'
    ];
  }
}

module.exports = UnifiedOrder;