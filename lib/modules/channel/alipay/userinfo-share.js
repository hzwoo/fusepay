/**
 * lib/modules/channel/alipay/userinfo-share.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class UserinfoShare extends AlipayResource {
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
      'auth_token:128'
    ];
    this.extendParams = {};
    this.commonData = {
      method: 'alipay.user.userinfo.share',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0'
    };
  }
}

module.exports = UserinfoShare;