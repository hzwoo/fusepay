/**
 * lib/modules/system/user.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');


class User extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    User.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.SystemUser) {
      this._model = model.SystemUser || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, User.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, User.Fields)
    );
    return this;
  }

  async findByKey(key, columns) {
    if (this.getModel() && key) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          username: key
        })
        .orWhere({
          email: key
        })
        .orWhere({
          mobile: key
        })
        .execute();
      if (row && row[0]) {
        _.assign(this, row[0]);
      }
    }
    return this;
  }

  async deactivate() {
    if (this.getModel()) {
      this.setData({
        status: 'SUSPENDED'
      });
      await this.getModel()
        .update(
          'status',
          'SUSPENDED'
        )
        .where({
          id: this.getId()
        })
        .execute();
    }
    return this;
  }

  async activate() {
    if (this.getModel()) {
      this.setData({
        status: 'NORMAL'
      });
      await this.getModel()
        .update(
          'status',
          'NORMAL')
        .where({
          id: this.getId()
        })
        .execute();
    }
    return this;
  }

}

User.Fields = [
  'id',
  'username',
  'password',
  'type',
  'email',
  'mobile',
  'fullname',
  'avatar',
  'group_id',
  'op_user_id',
  'is_staff',
  'is_super',
  'is_email_verified',
  'is_mobile_verified',
  'is_enabled',
  'time_created',
  'time_modified',
  'last_login',
  'status',
  'remark'
];

User.Status = {
  NORMAL: 'NORMAL',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED'
};

module.exports = User;