/**
 * lib/models/sql/transaction-rebate-bill.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionRebateBill extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_rebate_bill';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionRebateBill;