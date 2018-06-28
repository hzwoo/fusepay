/**
 * lib/models/sql/system-user.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemUser extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_user';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemUser;