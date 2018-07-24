/**
 * lib/modules/channel/wechatpay-client.js
 */

'use strict';

const ChannelClient = require('./channel-client');
const Payment = require('../../services/secapi/payment');
const OauthInfo = require('../../services/secapi/oauthinfo');
const Refund = require('../../services/secapi/refund');
const Notification = require('../../services/api/notification');

const resources = {
  UnifiedOrder: require('./wechatpay/unified-order'),
  MicroPay: require('./wechatpay/micro-pay'),
  OrderQuery: require('./wechatpay/order-query'),
  Refund: require('./wechatpay/refund'),
  RefundQuery: require('./wechatpay/refund-query'),
  CloseOrder: require('./wechatpay/close-order'),
  Reverse: require('./wechatpay/reverse'),
  ShortUrl: require('./wechatpay/short-url'),
  DownloadBill: require('./wechatpay/download-bill'),
  Notification: require('./wechatpay/notification')
};

class WechatPayClient extends ChannelClient {
  constructor(host, port) {
    super(host || WechatPayClient.DEFAULT_HOST,
      port || WechatPayClient.DEFAULT_PORT);

    this.api.base = WechatPayClient.DEFAULT_BASE;
    this.api.version = WechatPayClient.DEFAULT_API_VERSION;

    this._prepareResources();
  }

  _prepareResources() {
    for (let name in resources) {
      this[name] = new resources[name](this);
    }
  }
}

WechatPayClient.DEFAULT_HOST = 'api.mch.weixin.qq.com';
WechatPayClient.DEFAULT_PORT = 443;
WechatPayClient.DEFAULT_BASE = '/';
WechatPayClient.DEFAULT_API_VERSION = '1.0';



module.exports = WechatPayClient;