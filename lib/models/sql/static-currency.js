/**
 * lib/models/sql/static-currency.js
 */

'use strict';

const SqlTable = require('../sql-table');

class StaticCurrency extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_static_currency';
    this.sql = this.db(this.name);
  }
}

module.exports = StaticCurrency;