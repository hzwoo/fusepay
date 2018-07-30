/**
 * lib/modules/system/permission.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Permission extends PersistentObject {
  constructor(model) {
    super(model)
    this.setModel(model);
    const self = this;
    Permission.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemPermission) {
      this._model = model.SystemPermission || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(Permission.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, Permission.Fields)
    );
    return this;
  }

}


Permission.Fields = [
  'id',
  'domain',
  'domain_name',
  'resource_id',
  'resource_name',
  'resource',
  'action',
  'context',
  'module',
  'module_name',
  'hash',
  'enabled'
];


module.exports = Permission;