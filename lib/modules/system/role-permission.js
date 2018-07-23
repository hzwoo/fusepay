/**
 * lib/modules/system/role-permission.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class RolePermission extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    RolePermission.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemRolePermission) {
      this._model = model.SystemRolePermission || null;
    }
  }

  getId() {
    return this.role_id + this.permission_id;
  }

  getRoleId() {
    return this.role_id;
  }

  getPermissionId() {
    return this.permission_id;
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(RolePermission.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, RolePermission.Fields)
    );
    return this;
  }

  async save(fields) {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .update(
          _.omit(this.getFields(fields), [
            'id', 'role_id', 'permission_id'
          ]))
        .where({
          role_id: this.getRoleId(),
          permission_id: this.getPermissionId()
        })
        .execute();
    }
    return this;
  }

  async remove() {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .where({
          role_id: this.getRoleId(),
          permission_id: this.getPermissionId()
        })
        .del()
        .execute();
    }
    return this;
  }

  async findById(role_id, permission_id, columns) {
    let data = null;
    if (this.getModel() && user_id && role_id) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          role_id: role_id,
          permission_id: permission_id
        })
        .execute();
      if (row && row[0]) {
        _.assign(this, row[0]);
        data = _.assign({}, row[0]);
      }
    }
    return data;
  }
}

RolePermission.Fields = [
  'role_id',
  'rolename',
  'permission_id',
  'hash'
];


module.exports = RolePermission;