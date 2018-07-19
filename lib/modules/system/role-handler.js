/**
 * lib/modules/system/role-handler.js
 */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const SqlModel = require('../../models/sql-model');
const FusepayError = require('../../common/error');
const Result = require('../../common/result');

const setup = require('../../setup');
const utils = setup.utils;

const Role = require('./role');
const Permission = require('./permission');

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

  async updateRole() {

  }

  async removeRole() {

  }

  async listPermissions() {

  }

  async hasPermission() {

  }

  async assignPermission() {

  }

  async deassignPermission() {

  }
}

module.exports = RoleHandler;