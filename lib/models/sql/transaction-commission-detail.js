/**
 * lib/models/sql/transaction-commission-detail.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionCommissionDetail extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_commission_detail';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionCommissionDetail;