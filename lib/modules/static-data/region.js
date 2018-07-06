/**
 * lib/modules/static-data/region.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Region extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Region.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.StaticRegion) {
      this._model = model.StaticRegion || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, Region.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, Region.Fields)
    );
  }

}


Region.Fields = [
  'id',
  'region_name',
  'region_code',
  'parent_id',
  'parent_name',
  'region_level'
];

module.exports = Region;