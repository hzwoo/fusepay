/**
 * lib/common/error.js
 */

'use strict';

class GenericError extends Error {
  constructor(raw) {
    super();
    this.type = 'GENERIC_ERROR';
    this.message = 'Unexpected Error';
    this.populate(raw || {});
  }

  populate(raw) {
    this.message = raw.message || this.message;
    this.type = raw.type || this.type;
    this.stack = (new Error(this.message)).stack;
    this.code = raw.code;
    this.status = raw.status;
    this.params = raw.params;
    this.raw = raw;
  }
}

class BadRequestError extends GenericError {
  constructor(raw) {
    super(raw);
    this.type = 'BAD_REQUEST';
    this.populate(raw || {});
  }
}

class BadChannelRequestError extends GenericError {
  constructor(raw) {
    super(raw);
    this.type = 'BAD_CHANNEL_REQUEST';
    this.populate(raw || {});
  }
}

class ChannelApiError extends GenericError {
  constructor(raw) {
    super(raw);
    this.type = 'CHANNEL_API_ERROR';
    this.populate(raw || {});
  }
}

class ServerError extends GenericError {
  constructor(raw) {
    super(raw);
    this.type = 'SERVER_ERROR';
    this.populate(raw || {});
  }
}

module.exports = {
  GenericError: GenericError,
  BadRequestError: BadRequestError,
  BadChannelRequestError: BadChannelRequestError,
  ChannelApiError: ChannelApiError,
  ServerError: ServerError
};