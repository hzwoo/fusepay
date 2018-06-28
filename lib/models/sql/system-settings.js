/**
 * lib/models/sql/system-settings.js
 */

'use strict';

const SqlTable = require('../sql-table');

class SystemSettings extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_system_settings';
    this.sql = this.db(this.name);
  }
}

module.exports = SystemSettings;