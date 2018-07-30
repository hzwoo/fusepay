/**
 * lib/modules/system/user.js
 */

'use strict';

const _ = require('lodash');
const Result = require('../../common/result');
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

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(User.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, User.Fields)
    );
    return this;
  }

  isActivated() {
    if (this.getField('is_enabled') == true &&
      this.getField('status') == User.Status.ACTIVATED) {
      return true;
    } else {
      return false;
    }
  }

  async findByKey(key, columns) {
    let data = null;
    if (this.getModel() && key) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          id: key
        })
        .orWhere({
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
        data = _.assign({}, row[0]);
      }
    }
    return data;
  }

  async deactivate() {
    let result = null;
    if (this.getModel()) {
      this.setData({
        is_enabled: false,
        status: 'SUSPENDED'
      });
      result = await this.getModel()
        .update(_.pick(this, ['status']))
        .where({
          id: this.getId()
        })
        .execute();
    }
    if (result) {
      return new Result(true);
    } else {
      return new Result(false);
    }
  }

  async activate() {
    let result = null;
    if (this.getModel()) {
      this.setData({
        is_enabled: true,
        status: 'ACTIVATED'
      });
      result = await this.getModel()
        .update(_.pick(this, ['status']))
        .where({
          id: this.getId()
        })
        .execute();
    }
    if (result) {
      return new Result(true);
    } else {
      return new Result(false);
    }
  }

}

User.Fields = [
  'id',
  'username',
  'password',
  'type',
  'email',
  'mobile',
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
  'wx_oauth_id',
  'wx_username',
  'qq_oauth_id',
  'qq_username',
  'ali_oauth_id',
  'ali_username',
  'status',
  'remark'
];

User.Status = {
  ACTIVATED: 'ACTIVATED',
  SUSPENDED: 'SUSPENDED',
  REMOVED: 'REMOVED'
};

module.exports = User;