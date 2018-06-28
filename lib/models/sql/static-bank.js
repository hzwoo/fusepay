/**
 * lib/models/sql/static-bank.js
 */

'use strict';

const SqlTable = require('../sql-table');

class StaticBank extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_static_bank';
    this.sql = this.db(this.name);
  }
}

module.exports = StaticBank;