/**
 * lib/modules/channel/channel-client.js
 */

'use strict';

const fs = require('fs');

class ChannelClient {
  constructor(host, port, protocol) {
    this.api = {
      host: null,
      port: null,
      protocol: null,
      timeout: null,
      seckey: null,
      prikey: null,
      pubkey: null
    };
    this.setHost(host, port, protocol);
    this.setTimeout();
  }

  _setApiField(key, value) {
    this.api[key] = value;
  }

  getApiField(key) {
    return this.api[key];
  }

  setHost(host, port, protocol) {
    if (port) {
      this.setPort(port);
      if (port && !!protocol == false) {
        switch (port) {
          case 443:
            protocol = 'https';
            break;
          default:
            protocol = 'http';
            break;
        }
      }
    }

    if (protocol) {
      this.setProtocol(protocol);
    }

    this._setApiField('host',
      this.getApiField('protocol') + '://' + host + ':' + this.getApiField('port'));
  }

  getHost() {
    return this.getApiField('host');
  }

  setPort(port) {
    this._setApiField(
      'port', port || ChannelClient.DEFAULT_PORT);
  }

  setProtocol(protocol) {
    this._setApiField(
      'protocol', protocol || ChannelClient.DEFAULT_PROTOCOL);
  }

  setTimeout(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? ChannelClient.DEFAULT_TIMEOUT : timeout
    );
  }

  setSecureKey(secKey) {
    this._setApiField('seckey', secKey);
  }

  getSecureKey() {
    return this.getApiField('seckey');
  }

  setPrivateKey(priKey) {
    this._setApiField('prikey', priKey);
  }

  setPrivateKeyByPath(path) {
    const priKey = fs.readFileSync(path, 'utf8');
    this._setApiField('prikey', priKey);
  }

  getPrivateKey() {
    return this.getApiField('prikey');
  }

  setPublicKey(pubKey) {
    this._setApiField('pubkey', pubKey);
  }

  setPublicKeyByPath(path) {
    const pubKey = fs.readFileSync(path, 'utf8');
    this._setApiField('pubkey', pubKey);
  }

  getPublicKey() {
    return this.getApiField('pubkey');
  }

}

ChannelClient.DEFAULT_TIMEOUT = require('http').createServer().timeout;
ChannelClient.DEFAULT_PROTOCOL = 'http';
ChannelClient.DEFAULT_PORT = 80;

module.exports = ChannelClient;