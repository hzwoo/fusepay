/**
 * lib/models/sql/system-resource.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemResource extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_resource';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemResource;