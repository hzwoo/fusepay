/**
 * lib/models/sql/gateway-merchant-route.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayMerchantRoute extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_merchant_route';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayMerchantRoute;