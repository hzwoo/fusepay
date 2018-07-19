/**
 * lib/models/sql/transaction-clearing-summary.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionClearingSummary extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_clearing_summary';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionClearingSummary;