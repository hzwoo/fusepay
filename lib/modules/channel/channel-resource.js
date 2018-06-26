/**
 * channel-resource.js
 */

'use strict';

class ChannelResource {
  constructor(client) {
    this.client = client;
    this.path = null;
    this.method = null;
    this.parameters = null;
    this.extendParams = null;
    this.commonData = {};
    this.header = null;
    this.retry = 3;
    this.ca = null;
    this.cert = null;
    this.key = null;
    this.pfx = null;
    this.timeout = null;
    this.auth = null;
    this.response = null;
    this.error = null;
  }

  async request(data, cert) {
    return this;
  }

  async _makeRequestData(data) {
    return data;
  }

  _handleResponse(response) {
    return response;
  }

  _handleError(error) {
    console.log(error);
  }
}

module.exports = ChannelResource;