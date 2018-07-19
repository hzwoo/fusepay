/**
 * lib/models/sql/transaction-commission-summary.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionCommissionSummary extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_commission_summary';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionCommissionSummary;