/**
 * lib/services/request.js
 */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const Exception = require('../common/exception');
const Result = require('../common/result');

const MANDATORY_REGEX = /(\w[\w\_]+)\:(string|int|float|boolean|password|timestamp|datetime|object|array)(?:\((\d+)\))?/;
const OPTIONAL_REGEX = /^optional!(\w[\w\_]+)\:(string|int|float|boolean|password|timestamp|datetime|object|array)(?:\((\d+)\))?/;
const EITHER_REGEX = /^either!\[(\w[\w\_\:\(\)]+(?:\|\w[\w\_\:\(\)]+)*)\]/;

class Request {
  constructor(header, payload, extra) {
    this.setContext(header, payload, extra);
    this._service = null;
    this._reqSchema = null;
    this._reqExtendSchema = null;
    this._respSchema = null;
    this._respExtendSchema = null;
  }

  setContext(header, payload, extra) {
    this._header = header || null;
    this._payload = payload || null;
    this._extra = extra || null;
    return this;
  }

  getService() {
    return this._service;
  }

  preprocess() {
    return this;
  }

  getPayload() {
    return this._payload;
  }

  verify(schema, extendSchema) {
    const manArgs = [];
    const ethArgs = [];
    const optArgs = [];

    for (let i = 0; i < schema.length; ++i) {
      if (OPTIONAL_REGEX.test(schema[i])) {
        optArgs.push(schema[i]);
      } else if (EITHER_REGEX.test(schema[i])) {
        ethArgs.push(schema[i]);
      } else {
        manArgs.push(schema[i]);
      }
    }

    this._verifyMandatoryArguments(this._payload, manArgs, extendSchema);
    this._verifyEitherArguments(this._payload, ethArgs, extendSchema);
    this._verifyOptionalArguments(this._payload, optArgs, extendSchema);

    // return true;
  }

  makeResponseBody(error, payload, schema, extendSchema, mapper) {
    const body = {
      service: this._service,
      timestamp: moment().format('X')
    };

    if (error) {
      body.errcode = error.code;
      body.errmsg = error.message;
    } else {
      if (payload) {
        if (mapper) {
          const mapped = _.assign(this,
            _.mapKeys(payload, function(val, key) {
              return mapper[key];
            })
          );
          _.assignIn(body, this._mapResponseBody(
            mapped,
            schema,
            extendSchema));
        } else {
          _.assignIn(body, this._mapResponseBody(
            payload,
            schema,
            extendSchema));
        }
      } else {
        body.errcode = 'SYSTEM_ERROR';
        body.errmsg = 'Null result';
      }
    }
    return body;
  }

  _mapResponseBody(payload, schema, extendSchema) {
    const body = {};
    for (let i = 0; i < schema.length; ++i) {
      let m = null;
      if (OPTIONAL_REGEX.test(schema[i])) {
        m = schema[i].match(OPTIONAL_REGEX);
      } else if (MANDATORY_REGEX.test(schema[i])) {
        m = schema[i].match(MANDATORY_REGEX);
      }

      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;
        if (_.has(payload, name)) {
          if (type == 'string' &&
            Buffer.byteLength(payload[name]) > length) {
            throw new Exception.ServerError({
              message: Request.MESSAGE.SERVER_ERROR +
                ': argument "' + name + '" exceeds length limit',
              detail: [name]
            });
          } else {
            body[name] = payload[name];
            this._transformToResponseData(body, name, type);
          }
        }
      }
    }
    return body;
  }

  _verifyMandatoryArguments(payload, schema, extendSchema) {
    for (let i = 0; i < schema.length; ++i) {
      let m = schema[i].match(MANDATORY_REGEX);
      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;
        if (!_.has(payload, name)) {
          throw new Exception.BadRequest({
            message: Request.MESSAGE.BAD_REQUEST +
              ': missing argument "' + name + '"',
            detail: [name]
          });
        } else if (type == 'string' &&
          Buffer.byteLength(payload[name]) > length) {
          throw new Exception.BadRequest({
            message: Request.MESSAGE.BAD_REQUEST +
              ': argument "' + name + '" exceeds length limit',
            detail: [name]
          });
        } else {
          this._transformToRequestData(payload, name, type, extendSchema);
        }
      }
    }
  }

  _verifyEitherArguments(payload, schema, extendSchema) {
    for (let i = 0; i < schema.length; ++i) {
      let m = schema[i].match(EITHER_REGEX);
      let parts = m[1].split('|');
      if (parts) {
        let valid = this._verifyEitherPart(data, parts, extendSchema);

        if (valid && result.valid == false) {
          throw new Exception.BadRequest({
            message: Request.MESSAGE.BAD_REQUEST +
              ': missing argument "' + result.args + '"',
            detail: result.args
          });
        }
      }
    }

  }

  _verifyEitherPart(payload, parts, extendSchema) {
    const self = this;
    const valid = {
      satisfied: false,
      args: []
    };
    valid.satisfied = parts.some(function(arg) {
      let m = arg.match(MANDATORY_REGEX);
      let matched = false;
      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;
        if (_.has(payload, name)) {
          if (type == 'string' &&
            Buffer.byteLength(payload[name]) > length) {
            throw new Exception.BadRequest({
              message: Request.MESSAGE.BAD_REQUEST +
                ': argument "' + name + '" exceeds length limit',
              detail: [name]
            });
          } else {
            self._transformToRequestData(payload, name, type, extendSchema);
            matched = true;
          }
        } else {
          valid.args.push(name);
        }
      }
      return matched;
    });
    return valid;
  }

  _verifyOptionalArguments(payload, schema, extendSchema) {
    for (let i = 0; i < schema.length; ++i) {
      let m = schema[i].match(OPTIONAL_REGEX);
      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;

        if (_.has(payload, name)) {
          if (type == 'string' &&
            Buffer.byteLength(payload[name]) > length) {
            throw new Exception.BadRequest({
              message: Request.MESSAGE.BAD_REQUEST +
                ': argument "' + name + '" exceeds length limit',
              detail: [name]
            });
          } else {
            this._transformToRequestData(payload, name, type, extendSchema);
          }
        }
      }
    }
  }

  _verifyExtendArguments(payload, schema) {
    for (let i = 0; i < schema.length; ++i) {
      let m = null;
      if (OPTIONAL_REGEX.test(schema[i])) {
        m = schema[i].match(OPTIONAL_REGEX);
      } else if (MANDATORY_REGEX.test(schema[i])) {
        m = schema[i].match(MANDATORY_REGEX);
      }

      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;
        if (_.has(payload, name)) {
          if (type == 'string' &&
            Buffer.byteLength(payload[name]) > length) {
            throw new Exception.BadRequest({
              message: Request.MESSAGE.BAD_REQUEST +
                ': argument "' + name + '" exceeds length limit',
              detail: [name]
            });
          } else {
            this._transformToRequestData(payload, name, type);
          }
        }
      }
    }
  }

  _transformToRequestData(payload, name, type, extendSchema) {
    switch (type) {
      case 'int':
        if (_.isNumber(payload[name]) == false) {
          payload[name] = parseInt(payload[name]);
        }
        break;
      case 'float':
        if (_.isNumber(payload[name]) == false) {
          payload[name] = parseFloat(payload[name]);
        }
        break;
      case 'boolean':
        payload[name] = (payload[name] == true ||
          payload[name] == 'true' ||
          payload[name] > 0) ? true : false;
        break;
      case 'password':
        payload[name] = utils.base64Decode(payload[name]);
        break;
      case 'timestamp':
        payload[name] = parseInt(payload[name]);
        break;
      case 'datetime':
        payload[name] = moment(payload[name], 'YYYYMMDDHHmmss');
        break;
      case 'object':
      case 'array':
        payload[name] = typeof payload[name] == 'string' ?
          JSON.parse(payload[name]) : payload[name];
        if (extendSchema[name]) {
          this._verifyExtendArguments(payload[name], extendSchema[name]);
        }
        break;
    }
  }

  _mapExpandableObject(payload, schema, extendSchema) {
    for (let i = 0; i < schema.length; ++i) {
      let m = null;
      if (OPTIONAL_REGEX.test(schema[i])) {
        m = schema[i].match(OPTIONAL_REGEX);
      } else if (MANDATORY_REGEX.test(schema[i])) {
        m = schema[i].match(MANDATORY_REGEX);
      }

      if (m) {
        let name = m[1];
        let type = m[2];
        let length = m[3] ? parseInt(m[3]) : 0;
        if (_.has(payload, name)) {
          if (type == 'string' &&
            Buffer.byteLength(payload[name]) > length) {
            throw new Exception.BadRequest({
              message: Request.MESSAGE.BAD_REQUEST +
                ': argument "' + name + '" exceeds length limit',
              detail: [name]
            });
          } else {
            this._transformToResponseData(payload, name, type, extendSchema);
          }
        }
      }
    }
  }

  _mapExpandableArray(payload, schema, extendSchema) {
    for (let i = 0; i < payload.length; ++i) {
      this._mapExpandableObject(payload[i], schema, extendSchema);
    }
  }

  _transformToResponseData(payload, name, type, extendSchema) {
    const self = this;
    switch (type) {
      case 'boolean':
        payload[name] = (payload[name] == true ||
          payload[name] > 0 ||
          payload[name] == 'true') ? true : false;
        break;
      case 'timestamp':
        payload[name] = _.isDate(payload[name]) ?
          moment(payload[name]).format('X') : null;
        break;
      case 'datetime':
        payload[name] = _.isDate(payload[name]) ?
          moment(payload[name]).format('YYYYMMDDHHmmss') : null;
        break;
      case 'object':
        if (extendSchema && extendSchema[name]) {
          this._mapExpandableObject(
            payload[name],
            extendSchema[name],
            extendSchema);
        }
        payload[name] = payload[name] ?
          JSON.stringify(payload[name]) : null;
        break;
      case 'array':
        if (extendSchema && extendSchema[name]) {
          this._mapExpandableArray(payload[name],
            extendSchema[name],
            extendSchema);
        }
        payload[name] = payload[name] ?
          JSON.stringify(payload[name]) : null;
        break;
    }
  }
}

Request.MESSAGE = {
  BAD_REQUEST: 'Bad Request'
};

module.exports = Request;