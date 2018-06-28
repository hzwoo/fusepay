/**
 * lib/models/sql/static-region.js
 */

'use strict';

const SqlTable = require('../sql-table');

class StaticRegion extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_static_region';
    this.sql = this.db(this.name);
  }
}

module.exports = StaticRegion;