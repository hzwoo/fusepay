/**
 * lib/models/sql/gateway-merchant-config.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayMerchantConfig extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_merchant_config';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayMerchantConfig;