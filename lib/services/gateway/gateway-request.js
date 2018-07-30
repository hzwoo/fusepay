/**
 * lib/services/gateway/gateway-request.js
 */

'use strict';

const moment = require('moment');

const Exception = require('../../common/exception');
const Request = require('../request');

const Utility = require('../../common/utils');
const utils = new Utility();

class GatewayRequest extends Request {
  constructor(header, payload, extra) {
    super(header, payload, extra);
  }

  preprocess() {

  }

  verify() {
    super.verify(this._schema, this._extendSchema);
  }

  transformRequestHeaders(headers) {
    const clientUserAgent = headers['X-Fusepay-Client-User-Agent'] ?
      JSON.parse(headers['X-Fuespay-Client-User-Agent']) : null;
    const transformed = {
      authorization: null,
      apiVersion: headers['Fusepay-Version'] || null,
      sdkVersion: headers['Fusepay-Sdk-Version'] || null,
      userAgent: headers['User-Agent'] || null,
      clientUserAgent: clientUserAgent
    };
    if (headers['Authorization']) {
      let m = headers['Authorization'].match(BASIC_AUTH_REGEX);
      if (m) {
        const auth = utils.base64Decode(m[1]);
        const apiKey = auth.substr(0, auth.length - 1);
        try {
          transformed.authorization = utils.extractApiKey(apiKey, this.getSecretKey());
        } catch (err) {
          throw new Exception.Unauthorized({
            message: 'Not authorized',
          });
        }
      }
    } else {
      throw new Exception.Unauthorized({
        message: 'No authorization',
      });
    }

    return transformed;
  }
}

module.exports = GatewayRequest;