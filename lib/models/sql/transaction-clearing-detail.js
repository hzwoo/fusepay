/**
 * lib/models/sql/transaction-clearing-detail.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionClearingDetail extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_clearing_detail';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionClearingDetail;