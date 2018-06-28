/**
 * lib/models/sql/admission-application.js
 */

'use strict';

const SqlTable = require('../sql-table');

class AdmissionApplication extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_admission_application';
    this.sql = this.db(this.name);
  }
}

module.exports = AdmissionApplication;