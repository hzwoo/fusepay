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

  async createRole() {

  }

  async modifyRole() {

  }

  async removeRole() {

  }

  async retrieveRolePermissions() {

  }

  async hasRolePermission() {

  }

  async addRolePermission() {

  }

  async removeRolePermission() {

  }
}

module.exports = RoleHandler;