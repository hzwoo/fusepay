/**
 * lib/models/sql/gateway-delegate-config.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayDelegateConfig extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_delegate_config';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayDelegateConfig;