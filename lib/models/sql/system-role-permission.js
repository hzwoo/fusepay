/**
 * lib/models/sql/system-role-permission.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemRolePermission extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_role_permission';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemRolePermission;