/**
 * lib/modules/system/user-handler.js
 */

'use strict';

const _ = require('lodash');

const setup = require('../../setup');
const SqlModel = require('../../models/sql-model');
const FusepayError = require('../../common/error');
const User = require('./user');

class UserHandler {
  constructor(model) {
    this.setModel(model);
  }

  setModel(model) {
    if (model instanceof SqlModel) {
      this._model = model;
    }
  }

  getModel() {
    return this._model;
  }

  register(payload) {

  }

  deregister(identity, password) {

  }

  checkUsername(username) {

  }

  checkEmail(email) {

  }

  checkMobile(mobile) {

  }

  resetPassword(identity, newPassword) {

  }

  verifyPassword(identity, password) {

  }



}

module.exports = UserHandler;