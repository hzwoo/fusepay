/**
 * lib/modules/system/resource.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Resource extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Resource.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemResource) {
      this._model = model.SystemResource || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, Resource.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, Resource.Fields)
    );
    return this;
  }

}


Resource.Fields = [
  'id',
  'domain',
  'domain_name',
  'resource',
  'resource_name',
  'module',
  'module_name',
  'permission'
];


module.exports = Resource;