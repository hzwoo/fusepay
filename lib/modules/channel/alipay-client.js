/**
 * lib/modules/channel/alipay-client.js
 */

'use strict';

const ChannelClient = require('./channel-client');

const resources = {
  TradeAppPay: require('./alipay/trade-app-pay'),
  TradeCancel: require('./alipay/trade-cancel'),
  TradeClose: require('./alipay/trade-close'),
  TradeCreate: require('./alipay/trade-create'),
  TradeFastpayRefundQuery: require('./alipay/trade-fastpay-refund-query'),
  TradeOrderSettle: require('./alipay/trade-order-settle'),
  TradePagePay: require('./alipay/trade-page-pay'),
  TradePay: require('./alipay/trade-pay'),
  TradePrecreate: require('./alipay/trade-precreate'),
  TradeQuery: require('./alipay/trade-query'),
  TradeRefund: require('./alipay/trade-refund'),
  TradeWapPay: require('./alipay/trade-wap-pay'),
  UserinfoShare: require('./alipay/userinfo-share'),
  BillDownloadQuery: require('./alipay/bill-download-query'),
  Notification: require('./alipay/notification'),
  OauthToken: require('./alipay/oauth-token')
};

class AlipayClient extends ChannelClient {
  constructor(host, port) {
    super(host || AlipayClient.DEFAULT_HOST,
      port || AlipayClient.DEFAULT_PORT);

    this.api.base = AlipayClient.DEFAULT_BASE;
    this.api.version = AlipayClient.DEFAULT_API_VERSION;

    this._prepareResources();
  }

  getConstant(c) {
    return AlipayClient[c];
  }

  _prepareResources() {
    for (let name in resources) {
      this[name] = new resources[name](this);
    }
  }
}

AlipayClient.SUCCESS = '10000';
AlipayClient.DEFAULT_HOST = 'openapi.alipay.com';
AlipayClient.LIVE_HOST = 'openapi.alipay.com';
AlipayClient.TEST_HOST = 'openapi.alipaydev.com';
AlipayClient.DEFAULT_PORT = 443;
AlipayClient.DEFAULT_BASE = '/';
AlipayClient.DEFAULT_API_VERSION = '1.0';

module.exports = AlipayClient;