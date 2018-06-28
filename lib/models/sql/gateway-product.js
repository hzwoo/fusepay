/**
 * lib/models/sql/gateway-product.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayProduct extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_product';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayProduct;