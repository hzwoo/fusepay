/**
 * lib/modules/system/resource-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const FusepayError = require('../../common/error');
const Result = require('../../common/result');

const setup = require('../../setup');
const utils = setup.utils;

const Resource = require('./resource');

class ResourceHandler {
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


  async listResources() {

  }
}

module.exports = ResourceHandler;