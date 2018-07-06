/**
 * lib/modules/static-data/currency.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Currency extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Currency.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.StaticCurrency) {
      this._model = model.StaticCurrency || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, Currency.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, Currency.Fields)
    );
  }

}

Currency.Fields = [
  'id',
  'currency',
  'name',
  'cname',
  'code',
  'minor_unit'
];

module.exports = Currency;