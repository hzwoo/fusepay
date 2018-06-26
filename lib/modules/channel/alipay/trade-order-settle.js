/**
 * lib/modules/channel/alipay/trade-order-settle.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class TradeOrderSettle extends AlipayResource {
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
        'out_request_no:64',
        'trade_no:64',
        'royalty_parameters',
        'optional!operator_id:64'
      ],

      royalty_parameters: [
        'optional!trans_out:16',
        'optional!trans_in:16',
        'optional!amount:9',
        'optional!amount_percentage:3',
        'optional!desc:1000'
      ]
    };
    this.commonData = {
      method: 'alipay.trade.order.settle',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0'
    };
  }
}

module.exports = TradeOrderSettle;