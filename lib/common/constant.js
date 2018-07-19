/**
 * lib/common/constant.js
 */

const Constant = module.exports = {};


Constant.STATUS = {
  OK: 'OK',
  FAIL: 'FAIL'
};


Constant.HTTP = {
  CONTINUE: {
    CODE: 100,
    MESSAGE: 'continue'
  },
  SWITCHING_PROTOCOLS: {
    CODE: 101,
    MESSAGE: 'switching protocols'
  },
  PROCESSING: {
    CODE: 102,
    MESSAGE: 'processing'
  },
  OK: {
    CODE: 200,
    MESSAGE: 'ok'
  },
  CREATED: {
    CODE: 201,
    MESSAGE: 'created'
  },
  ACCEPTED: {
    CODE: 202,
    MESSAGE: 'accepted'
  },
  NON_AUTHORITATIVE_INFORMATION: {
    CODE: 203,
    MESSAGE: 'non-authoritative information'
  },
  NO_CONTENT: {
    CODE: 204,
    MESSAGE: 'no content'
  },
  RESET_CONTENT: {
    CODE: 205,
    MESSAGE: 'reset content'
  },
  PARTIAL_CONTENT: {
    CODE: 206,
    MESSAGE: 'partial content'
  },
  MULTI_STATUS: {
    CODE: 207,
    MESSAGE: 'multi-status'
  },
  ALREADY_REPORTED: {
    CODE: 208,
    MESSAGE: 'already reported'
  },
  IM_USED: {
    CODE: 209,
    MESSAGE: 'im used'
  },
  MULTIPLE_CHOICES: {
    CODE: 300,
    MESSAGE: 'multiple choices'
  },
  MOVED_PERMANENTLY: {
    CODE: 301,
    MESSAGE: 'moved permanently'
  },
  FOUND: {
    CODE: 302,
    MESSAGE: 'found'
  },
  SEE_OTHER: {
    CODE: 303,
    MESSAGE: 'see other'
  },
  NOT_MODIFIED: {
    CODE: 304,
    MESSAGE: 'not modified'
  },
  USE_PROXY: {
    CODE: 305,
    MESSAGE: 'use proxy'
  },
  TEMPORARY_REDIRECT: {
    CODE: 307,
    MESSAGE: 'temporary redirect'
  },
  PERMANENT_REDIRECT: {
    CODE: 308,
    MESSAGE: 'permanent redirect'
  },
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: 'bad request'
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: 'unauthorized'
  },
  PAYMENT_REQUIRED: {
    CODE: 402,
    MESSAGE: 'payment required'
  },
  FORBIDDEN: {
    CODE: 403,
    MESSAGE: 'forbidden'
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: 'not found'
  },
  METHOD_NOT_ALLOWED: {
    CODE: 405,
    MESSAGE: 'method not allowed'
  },
  NOT_ACCEPTABLE: {
    CODE: 406,
    MESSAGE: 'not acceptable'
  },
  PROXY_AUTHORIZATION_REQUIRED: {
    CODE: 407,
    MESSAGE: 'proxy authentication required'
  },
  REQUEST_TIMEOUT: {
    CODE: 408,
    MESSAGE: 'request timeout'
  },
  CONFLICT: {
    CODE: 409,
    MESSAGE: 'conflict'
  },
  GONE: {
    CODE: 410,
    MESSAGE: 'gone'
  },
  LENGTH_REQUIRED: {
    CODE: 411,
    MESSAGE: 'length required'
  },
  PRECONDITION_FAILED: {
    CODE: 412,
    MESSAGE: 'precondition failed'
  },
  PAYLOAD_TOO_LARGE: {
    CODE: 413,
    MESSAGE: 'payload too large'
  },
  URI_TOO_LONG: {
    CODE: 414,
    MESSAGE: 'uri too long'
  },
  UNSUPPORTED_MEDIA_TYPE: {
    CODE: 415,
    MESSAGE: 'unsupported media type'
  },
  RANGE_NOT_SATISFIABLE: {
    CODE: 416,
    MESSAGE: 'range not satisfiable'
  },
  EXPECTATION_FAILED: {
    CODE: 417,
    MESSAGE: 'expectation failed'
  },
  IM_A_TEAPOT: {
    CODE: 418,
    MESSAGE: "I'm a teapot"
  },
  UNPROCESSABLE_ENTITY: {
    CODE: 422,
    MESSAGE: 'unprocessable entity'
  },
  LOCKED: {
    CODE: 423,
    MESSAGE: 'locked'
  },
  FAILED_DEPENDENCY: {
    CODE: 424,
    MESSAGE: 'failed dependency'
  },
  UPGRADE_REQUIRED: {
    CODE: 426,
    MESSAGE: 'upgrade required'
  },
  PRECONDITION_REQUIRED: {
    CODE: 428,
    MESSAGE: 'precondition required'
  },
  TOO_MANY_REQUESTS: {
    CODE: 429,
    MESSAGE: 'too many requests'
  },
  REQUEST_HEADER_FILEDS_TOO_LARGE: {
    CODE: 431,
    MESSAGE: 'request header fields too large'
  },
  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: 'internal server error'
  },
  NOT_IMPLEMENTED: {
    CODE: 501,
    MESSAGE: 'not implemented'
  },
  BAD_GATEWAY: {
    CODE: 502,
    MESSAGE: 'bad gateway'
  },
  SERVICE_UNAVAILABLE: {
    CODE: 503,
    MESSAGE: 'service unavailable'
  },
  GATEWAY_TIMEOUT: {
    CODE: 504,
    MESSAGE: 'gateway timeout'
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    CODE: 505,
    MESSAGE: 'http version not supported'
  },
  VARIANT_ALSO_NEGOTIATES: {
    CODE: 506,
    MESSAGE: 'variant also negotiates'
  },
  INSUFFICIENT_STORAGE: {
    CODE: 507,
    MESSAGE: 'insufficient storage'
  },
  LOOP_DETECTED: {
    CODE: 508,
    MESSAGE: 'loop detected'
  },
  NOT_EXTENDED: {
    CODE: 510,
    MESSAGE: 'not extended'
  },
  NETWORK_AUTHENTICATION_REQUIRED: {
    CODE: 511,
    MESSAGE: 'network authentication required'
  }
};