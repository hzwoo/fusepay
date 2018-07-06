/**
 * lib/modules/system/role.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Role extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Role.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemRole) {
      this._model = model.SystemRole || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, Role.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, Role.Fields)
    );
    return this;
  }

}


Role.Fields = [
  'id',
  'name',
  'group_id',
  'domain',
  'inherited'
];


module.exports = Role;