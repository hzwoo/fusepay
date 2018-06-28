/**
 * lib/models/sql/static-bankbranch.js
 */

'use strict';

const SqlTable = require('../sql-table');

class StaticBankBranch extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_static_bankbranch';
    this.sql = this.db(this.name);
  }
}

module.exports = StaticBankBranch;