/**
 * lib/common/result.js
 */

'use strict';

const _ = require('lodash');
const Constant = require('./constant');

class Result {
  constructor(status, data, code, message) {
    this.status = status || false;
    this.data = data || null;
    this.count = 0;
    this.code = code || null;
    this.message = message || null;
    this._setDataProperties();
  }

  /**
   * [setStatus description]
   * @param {[boolean]} status [description]
   */
  setStatus(status) {
    this.status = status || false;
    return this;
  }

  /**
   * [setData description]
   * @param {[MultiType]} data [description]
   */
  setData(data) {
    this.data = data || null;
    return this;
  }

  /**
   * [setCode description]
   * @param {[string]} code [description]
   */
  setCode(code) {
    this.code = code || null;
    return this;
  }

  /**
   * [setMessage description]
   * @param {[string]} message [description]
   */
  setMessage(message) {
    this.message = message || null;
    return this;
  }

  _setDataProperties() {
    if (this.data) {
      if (_.isPlainObject(this.data)) {
        this.data_type = Constant.DATA_TYPE.OBJECT;
        this.count = 1;
      } else if (_.isArray(this.data)) {
        this.data_type = Constant.DATA_TYPE.ARRAY;
        this.count = this.data.length;
      } else if (_.isNumber(this.data)) {
        this.data_type = Constant.DATA_TYPE.NUMBER;
        this.count = 1;
      } else if (_.isString(this.data)) {
        this.data_type = Constant.DATA_TYPE.STRING;
        this.count = 1;
      } else if (_.isBoolean(this.data)) {
        this.data_type = Constant.DATA_TYPE.BOOLEAN;
        this.count = 1;
      } else {
        this.data_type = Constant.DATA_TYPE.NULL;
      }
    } else {
      this.data_type = Constant.DATA_TYPE.NULL;
    }
    return this;
  }
}


module.exports = Result;