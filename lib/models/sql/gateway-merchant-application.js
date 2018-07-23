/**
 * lib/models/sql/gateway-merchant-application.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayMerchantApplication extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_merchant_application';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayMerchantApplication;