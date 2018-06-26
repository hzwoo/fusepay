/**
 * lib/modules/channel/tenpay-client.js
 */

'use strict';

const ChannelClient = require('./channel-client');

const resources = {
  UnifiedOrder: require('./tenpay/unified-order'),
  MicroPay: require('./tenpay/micro-pay'),
  OrderQuery: require('./tenpay/order-query'),
  Refund: require('./tenpay/refund'),
  RefundQuery: require('./tenpay/refund-query'),
  CloseOrder: require('./tenpay/close-order'),
  Reverse: require('./tenpay/reverse'),
  Statement: require('./tenpay/statement'),
  Notification: require('./tenpay/notification')
};

class TenpayClient extends ChannelClient {
  constructor(host, port) {
    super(host || TenpayClient.DEFAULT_HOST,
      port || TenpayClient.DEFAULT_PORT);

    this.api.base = TenpayClient.DEFAULT_BASE;
    this.api.version = TenpayClient.DEFAULT_API_VERSION;

    this._prepareResources();
  }

  getConstant(c) {
    return TenpayClient[c];
  }

  _prepareResources() {
    for (let name in resources) {
      this[name] = new resources[name](this);
    }
  }
}



TenpayClient.DEFAULT_HOST = 'qpay.qq.com';
TenpayClient.DEFAULT_PORT = 443;
TenpayClient.DEFAULT_BASE = '/';
TenpayClient.DEFAULT_API_VERSION = '1.0';

module.exports = TenpayClient;