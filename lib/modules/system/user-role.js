/**
 * lib/modules/system/user-role.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class UserRole extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    UserRole.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemUserRole) {
      this._model = model.SystemUserRole || null;
    }
  }

  getId() {
    return this.user_id + this.role_id;
  }

  getUserId() {
    return this.user_id;
  }

  getRoleId() {
    return this.role_id;
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(UserRole.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, UserRole.Fields)
    );
    return this;
  }

  async save(fields) {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .update(
          _.omit(this.getFields(fields), [
            'id', 'user_id', 'role_id'
          ]))
        .where({
          user_id: this.getUserId(),
          role_id: this.getRoleId()
        })
        .execute();
    }
    return this;
  }

  async remove() {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .where({
          user_id: this.getUserId(),
          role_id: this.getRoleId()
        })
        .del()
        .execute();
    }
    return this;
  }

  async findById(user_id, role_id, columns) {
    let data = null;
    if (this.getModel() && user_id && role_id) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          user_id: user_id,
          role_id: role_id
        })
        .execute();
      if (row && row[0]) {
        data = row[0];
        _.assign(this, row[0]);
      }
    }
    return data;
  }
}


UserRole.Fields = [
  'user_id',
  'username',
  'role_id',
  'rolename',
  'role_domain'
];


module.exports = UserRole;