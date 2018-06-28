/**
 * lib/models/sql/system-user-role.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemUserRole extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_user_role';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemUserRole;