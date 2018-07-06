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

  getData() {
    return _.assign({},
      _.pick(this, DelegateConfig.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, DelegateConfig.Fields)
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