/**
 * lib/modules/channel/wechatpay/short-url.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class ShortUrl extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'tools/shorturl';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'long_url:512',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32'
    ];
  }
}

module.exports = ShortUrl;