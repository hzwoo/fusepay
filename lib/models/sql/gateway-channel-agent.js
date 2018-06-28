/**
 * lib/models/sql/gateway-channel-agent.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayChannelAgent extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_channel_agent';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayChannelAgent;