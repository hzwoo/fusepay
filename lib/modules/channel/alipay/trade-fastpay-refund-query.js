/**
 * lib/modules/channel/alipay/trade-fastpay-refund-query.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class TradeFastPayRefundQuery extends AlipayResource {
  constructor(client) {
    super(client);
    this.path = 'gateway.do';
    this.method = 'POST';
    this.parameters = [
      'app_id:32',
      'method:128',
      'optional!format:40',
      'charset:10',
      'sign_type:10',
      'sign:256',
      'timestamp:19',
      'version:3',
      'optional!app_auth_token:40',
      'biz_content'
    ];
    this.extendParams = {
      biz_content: [
        'optional!trade_no:64',
        'optional!out_trade_no:64',
        'out_request_no:64'
      ]
    };
    this.commonData = {
      method: 'alipay.trade.fastpay.refund.query',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0'
    };
  }
}

module.exports = TradeFastPayRefundQuery;