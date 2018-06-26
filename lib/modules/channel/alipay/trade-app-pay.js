/**
 * lib/modules/channel/alipay/trade-app-pay.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class TradeAppPay extends AlipayResource {
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
      'optional!notify_url:256',
      'biz_content'
    ];
    this.extendParams = {
      biz_content: [
        'subject:256',
        'out_trade_no:64',
        'total_amount:9',
        'product_code:64',
        'optional!body:128',
        'optional!timeout_express:6',
        'optional!seller_id:28',
        'optional!auth_token:40',
        'optional!goods_type:2',
        'optional!passback_params:512',
        'optional!promo_params:512',
        'optional!extend_params',
        'optional!enable_pay_channels:128',
        'optional!diable_pay_channels:128',
        'optional!store_id:32'
      ],

      extend_params: [
        'optional!sys_service_provider_id:64',
        'optional!needBuyerRealnamed:1',
        'optional!TRANS_MEMO:128'
      ],
    };
    this.commonData = {
      method: 'alipay.trade.app.pay',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0',
      product_code: 'QUICK_MSECURITY_PAY'
    };
  }
}

module.exports = TradeAppPay;