/**
 * lib/models/sql/gateway-channel-parameter.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayChannelParameter extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_channel_parameter';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayChannelParameter;