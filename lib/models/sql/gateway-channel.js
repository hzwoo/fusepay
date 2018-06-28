/**
 * lib/models/sql/gateway-channel.js
 */

'use strict';

const SqlTable = require('../sql-table');

class GatewayChannel extends SqlTable {
  constructor(db) {
    super(db);
    this.name = 't_gateway_channel';
    this.sql = this.db(this.name);
  }
}

module.exports = GatewayChannel;