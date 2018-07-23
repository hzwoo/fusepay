/**
 * lib/common/exception.js
 */

'use strict';

class GenericException extends Error {
  constructor(raw) {
    super();
    this.type = 'GENERIC_EXCEPTION';
    this.message = 'Exception';
    this.populate(raw || {});
  }

  populate(raw) {
    this.message = raw.message || this.message;
    this.type = raw.type || this.type;
    this.stack = (new Error(this.message)).stack;
    this.code = raw.code;
    this.status = raw.status;
    this.detail = raw.detail;
    // this.raw = raw;
  }
}

class Unauthorized extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'UNAUTHORIZED';
    this.populate(raw || {});
  }
}

class BadRequest extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'BAD_REQUEST';
    this.populate(raw || {});
  }
}

class BadChannelRequest extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'BAD_CHANNEL_REQUEST';
    this.populate(raw || {});
  }
}

class ChannelApiError extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'CHANNEL_API_ERROR';
    this.populate(raw || {});
  }
}

class ServerError extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'SERVER_ERROR';
    this.populate(raw || {});
  }
}

class InvalidApiKey extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'INVALID_API_KEY';
    this.populate(raw || {});
  }
}

class TokenExpires extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'TOKEN_EXPIRES';
    this.populate(raw || {});
  }
}

class ServiceUnavailable extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'SERVICE_UNAVAILABLE';
    this.populate(raw || {});
  }
}

class UserDeactive extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'USER_DEACTIVE';
    this.populate(raw || {});
  }
}

class MissingArguments extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'MISSING_ARGUMENTS';
    this.populate(raw || {});
  }
}

class InvalidArgument extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'INVALID_ARGUMENT';
    this.populate(raw || {});
  }
}

class TimeoutError extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'TIMEOUT_ERROR';
    this.populate(raw || {});
  }
}

class DatabaseError extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'DATABASE_ERROR';
    this.populate(raw || {});
  }
}

class ConflictError extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'CONFLICT_ERROR';
    this.populate(raw || {});
  }
}

class NotFound extends GenericException {
  constructor(raw) {
    super(raw);
    this.type = 'NOT_FOUND';
    this.populate(raw || {});
  }
}



module.exports = {
  GenericException: GenericException,
  BadRequest: BadRequest,
  BadChannelRequest: BadChannelRequest,
  ChannelApiError: ChannelApiError,
  ServerError: ServerError,
  Unauthorized: Unauthorized,
  InvalidApiKey: InvalidApiKey,
  TokenExpires: TokenExpires,
  ServiceUnavailable: ServiceUnavailable,
  UserDeactive: UserDeactive,
  MissingArguments: MissingArguments,
  InvalidArgument: InvalidArgument,
  TimeoutError: TimeoutError,
  DatabaseError: DatabaseError,
  ConflictError: ConflictError,
  NotFound: NotFound
};