/**
 * lib/models/sql/gateway-delegate-rate.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayDelegateRate extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_delegate_rate';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayDelegateRate;