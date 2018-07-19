/**
 * lib/models/sql-model.js
 */

'use strict';

const tables = {
  GatewayChannelAgent: require('./sql/gateway-channel-agent'),
  GatewayChannelDelegate: require('./sql/gateway-channel-delegate'),
  GatewayChannelMerchant: require('./sql/gateway-channel-merchant'),
  GatewayChannelParameter: require('./sql/gateway-channel-parameter'),
  GatewayChannel: require('./sql/gateway-channel'),
  GatewayDelegateConfig: require('./sql/gateway-delegate-config'),
  GatewayDelegateRate: require('./sql/gateway-delegate-rate'),
  GatewayMerchantConfig: require('./sql/gateway-merchant-config'),
  GatewayMerchantRoute: require('./sql/gateway-merchant-route'),
  GatewayProduct: require('./sql/gateway-product'),
  StaticBank: require('./sql/static-bank'),
  StaticBankBranch: require('./sql/static-bankbranch'),
  StaticBusiness: require('./sql/static-business'),
  StaticCurrency: require('./sql/static-currency'),
  StaticRegion: require('./sql/static-region'),
  SystemResource: require('./sql/system-resource'),
  SystemUser: require('./sql/system-user'),
  SystemUserRole: require('./sql/system-user-role'),
  SystemRole: require('./sql/system-role'),
  SystemPermission: require('./sql/system-permission'),
  SystemRolePermission: require('./sql/system-role-permission'),
  SystemSettings: require('./sql/system-settings'),
  TransactionClearingDetail: require('./sql/transaction-clearing-detail'),
  TransactionClearingSummary: require('./sql/transaction-clearing-summary'),
  TransactionCommissionDetail: require('./sql/transaction-commission-detail'),
  TransactionCommissionSummary: require('./sql/transaction-commission-summary'),
  TransactionOrder: require('./sql/transaction-order'),
  TransactionRebateBill: require('./sql/transaction-rebate-bill'),
};

class SqlModel {

  constructor(db) {
    this.db = db;
    this._prepareTables();
  }

  getDB() {
    return this.db;
  }

  setDB(db) {
    this.db = db;
  }

  _prepareTables() {
    for (let name in tables) {
      this[name] = new tables[name](this.db);
    }
  }

}


module.exports = SqlModel;