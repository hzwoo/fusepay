/**
 * lib/services/admin/system-management.js
 */

'use strict';

const AdminRequest = require('./admin-request');

class CheckUserNameConflict extends AdminRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'check.conflict.username';
    this._reqSchema = [
      'username:string(11)',
      'optional!timestamp:timestamp',
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'service:string(128)',
      'timestamp:timestamp',
      'optional!conflict:boolean',
      'optional!errcode:string(20)',
      'optional!errmsg:string(128)'
    ];
    this._respExtendSchema = {};
  }
}

class SystemUserQuery extends AdminRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'sys.user.query';
    this._reqSchema = [
      'user_id:string(11)',
      'optional!timestamp:timestamp',
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'service:string(128)',
      'timestamp:timestamp',
      'optional!user_id:string(11)',
      'optional!username:string(128)',
      'optional!group_id:string(32)',
      'optional!email:string(128)',
      'optional!mobile:string(11)',
      'optional!is_enabled:boolean',
      'optional!status:string(32)',
      'optional!errcode:string(20)',
      'optional!errmsg:string(128)'
    ];
    this._respExtendSchema = {};
  }
}

class SystemUserList extends AdminRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'sys.user.list';
    this._reqSchema = [
      'group_id:string(32)',
      'optional!page:int',
      'optional!page_size:int',
      'optional!is_enabled:boolean',
      'optional!status:string(32)',
      'optional!timestamp:timestamp'
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'service:string(128)',
      'timestamp:timestamp',
      'optional!page:int',
      'optional!page_size:int',
      'optional!count:int',
      'optional!data:array',
    ];
    this._respExtendSchema = {
      data: [
        'user_id:string(11)',
        'username:string(128)',
        'time_created:datetime',
        'last_login:datetime',
        'is_enabled:boolean',
        'status:string(32)'
      ]
    };
  }
}

class SystemUserCreate extends AdminRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'sys.user.create';
    this._reqSchema = [
      'username:string(128)',
      'password:password',
      'optional!email',
      'optional!mobile',
      'optional!timestamp:timestamp'
    ];
    this._reqExtendSchema = {
      extra: [
        'client_ip:string(16)',
        'optional!auth_token:string(256)',
        'optional!auth_code:string(128)',
        'optional!notify_url:string(256)'
      ],
    };
    this._respSchema = [
      'service:string(128)',
      'timestamp:timestamp',
      'optional!user_id:string(11)',
      'optional!username:string(128)',
      'optional!group_id:string(32)',
      'optional!email:string(128)',
      'optional!mobile:string(11)',
      'optional!is_enabled:boolean',
      'optional!status:string(32)',
      'optional!errcode:string(20)',
      'optional!errmsg:string(128)'
    ];
    this._respExtendSchema = {};
  }
}

module.exports = {
  CheckUserNameConflict: CheckUserNameConflict,
  SystemUserQuery: SystemUserQuery,
  SystemUserList: SystemUserList,
  SystemUserCreate: SystemUserCreate,
};