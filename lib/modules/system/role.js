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

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(Role.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, Role.Fields)
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