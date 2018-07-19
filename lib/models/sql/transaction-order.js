/**
 * lib/models/sql/transaction-order.js
 */

'use strict';

const SqlTable = require('../sql-table');

class TransactionOrder extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_transaction_order';
    this.sql = this.db(this.name);
  }
}

module.exports = TransactionOrder;