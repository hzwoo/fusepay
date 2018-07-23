/**
 * lib/modules/gateway/delegate-config.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class DelegateConfig extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    DelegateConfig.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayDelegateConfig) {
      this._model = model.GatewayDelegateConfig || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(DelegateConfig.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, DelegateConfig.Fields)
    );
    return this;
  }

}

DelegateConfig.Fields = [
  'id',
  'type',
  'delegate_id',
  'delegate_name',
  'settings'
];


module.exports = DelegateConfig;