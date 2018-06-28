/**
 * lib/models/sql/static-business.js
 */

'use strict';

const SqlTable = require('../sql-table');

class StaticBusiness extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_static_business';
    this.sql = this.db(this.name);
  }
}

module.exports = StaticBusiness;