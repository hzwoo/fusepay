/**
 * lib/services/admin/admin-request.js
 */

'use strict';

const moment = require('moment');

const Exception = require('../../common/exception');
const Request = require('../request');

class AdminRequest extends Request {
  constructor(header, payload, extra) {
    super(header, payload, extra);
  }

  preprocess() {

  }

  verify() {
    return super.verify(
      this._reqSchema,
      this._reqExtendSchema);
  }

  makeResponseBody(error, payload, mapper) {
    return super.makeResponseBody(
      error,
      payload,
      this._respSchema,
      this._respExtendSchema,
      mapper);
  }
}

module.exports = AdminRequest;