/**
 * lib/models/sql/gateway-channel-merchant.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayChannelMerchant extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_channel_merchant';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayChannelMerchant;