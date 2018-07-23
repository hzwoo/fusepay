/**
 * lib/modules/static-data/business.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Business extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Business.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.StaticBusiness) {
      this._model = model.StaticBusiness || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(Business.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, Business.Fields)
    );
  }

}


Business.Fields = [
  'id',
  'cat_code',
  'cat_name',
  'sub_code',
  'sub_name',
  'applicable',
  'description',
  'permit'
];

module.exports = Business;