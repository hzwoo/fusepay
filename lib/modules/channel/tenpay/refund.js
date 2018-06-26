/**
 * lib/modules/channel/tenpay/refund.js
 */

'use strict';

const TenpayResource = require('./tenpay-resource');

class Refund extends TenpayResource {
  constructor(client) {
    super(client);
    this.path = 'cgi-bin/pay/qpay_refund.cgi';
    this.method = 'POST';
    this.parameters = [
      'mch_id:32',
      'nonce_str:32',
      'sign:128',
      'either![transaction_id:32|out_trade_no:32]',
      'out_refund_no:32',
      'refund_fee:11',
      'op_user_id:32',
      'op_user_passwd:32',
      'optional!appid:32',
      'optional!sub_mch_id:32',
      'optional!sub_appid:32',
      'optional!refund_account:30' // REFUND_SOURCE_UNSETTLED_FUNDS - 未结算资金退款（默认使用未结算资金退款）
      // REFUND_SOURCE_RECHARGE_FUNDS - 可用现金账户资金退款
    ];
  }
}

module.exports = Refund;