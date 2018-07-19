/**
 * lib/modules/system/user-handler.js
 */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const SqlModel = require('../../models/sql-model');
const FusepayError = require('../../common/error');
const Result = require('../../common/result');

const setup = require('../../setup');
const utils = setup.utils;

const User = require('./user');
const Role = require('./role');

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

  async register(userinfo) {
    const user = new User(this.getModel());
    user.setData(userinfo);
    user.password = utils.digestPassword(userinfo.password);
    await user.create();

    return user.getData();
  }

  async deregister(identity) {

  }

  async listRoles(identity) {

  }

  async hasRole(identity, role) {

  }

  async assignRole(identity, role) {

  }

  async deassignRole(identity, role) {

  }

  async checkUsername(username) {

    return {
      timestamp: moment().format('X')
    };
  }

  async checkEmail(email) {

  }

  async checkMobile(mobile) {}

  async resetPassword(identity, newPassword) {

  }

  async verifyPassword(identity, password) {

  }

  async verifyLogin(identity, password) {
    const user = new User(this.getModel());
    const data = await user.findByKey(identity, [
      'id',
      'type',
      'username',
      'password',
      'email',
      'mobile',
      'group_id',
      'status'
    ]);

    let result = null;
    if (data) {
      if (utils.verifyPassword(password, user.getData().password)) {
        result = new Result(
          Result.STATUS.OK,
          data
        );
      } else {
        result = new Result(
          Result.STATUS.FAIL,
          null,
          UserHandler.ERRCODE.UNAUTHORIZED,
          UserHandler.ERRMSG.UNAUTHORIZED
        );
      }
    } else {
      result = new Result(
        Result.STATUS.FAIL,
        null,
        UserHandler.ERRCODE.NOT_FOUND,
        UserHandler.ERRMSG.NOT_FOUND);
    }
    return result.get();
  }

}

UserHandler.ERRCODE = {
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED'
};

UserHandler.ERRMSG = {
  NOT_FOUND: '无匹配用户(Could not find user)',
  UNAUTHORIZED: '用户名或密码错误(Incorrect username or password)'
};

module.exports = UserHandler;