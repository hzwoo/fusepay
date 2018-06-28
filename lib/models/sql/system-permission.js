/**
 * lib/models/sql/system-permission.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemPermission extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_permission';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemPermission;