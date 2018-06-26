/**
 * lib/modules/channel/alipay/OauthToken.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class OauthToken extends AlipayResource {
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
      'grant_type:40',
      'either![code:128|refresh_token:128]'
    ];
    this.extendParams = {};
    this.commonData = {
      method: 'alipay.system.oauth.token',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0'
    };
  }
}

module.exports = OauthToken;