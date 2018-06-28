/**
 * lib/models/sql/gateway-channel-delegate.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayChannelDelegate extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_channel_delegate';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayChannelDelegate;