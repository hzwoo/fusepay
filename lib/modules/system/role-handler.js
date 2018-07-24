/**
 * lib/modules/system/role-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Exception = require('../../common/exception');
const Result = require('../../common/result');

const setup = require('../../setup');
const utils = setup.utils;

const Role = require('./role');
const RolePermission = require('./role-permission');

class RoleHandler {
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

  async createRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'username',
        'role_id',
        'rolename',
        'role_domain'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    role.setFields(args);
    const roleData = await role.create();

    if (roleData) {
      return new Result(true, roleData);
    } else {
      return new Result(false);
    }
  }

  async modifyRole(args, options) {

  }

  async removeRole(args, options) {

  }

  async retrieveRolePermissions(args, options) {

  }

  async hasRolePermission(args, options) {

  }

  async addRolePermission(args, options) {

  }

  async removeRolePermission(args, options) {

  }
}

RoleHandler.MESSAGE = {
  NOT_FOUND: '无匹配角色(Could not find role)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = RoleHandler;