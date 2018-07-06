/**
 * lib/modules/gateway/delegate-rate.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class DelegateRate extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    DelegateRate.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayDelegateRate) {
      this._model = model.GatewayDelegateRate || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, DelegateRate.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, DelegateRate.Fields)
    );
    return this;
  }

}

DelegateRate.Fields = [
  'id',
  'ref_id',
  'name',
  'rate_mode',
  'rate_type',
  'min_fee',
  'max_fee',
  'rate',
  'min_applicable',
  'inherited',
  'is_inherited',
  'enabled'
];


module.exports = DelegateRate;