/**
 * lib/models/sql/system-role.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemRole extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_role';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemRole;