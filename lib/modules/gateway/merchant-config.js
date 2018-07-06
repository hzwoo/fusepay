/**
 * lib/modules/gateway/merchant-config.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class MerchantConfig extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    MerchantConfig.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayMerchantConfig) {
      this._model = model.GatewayMerchantConfig || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, MerchantConfig.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, MerchantConfig.Fields)
    );
    return this;
  }

}


MerchantConfig.Fields = [
  'id',
  'config_name',
  'merchant_id',
  'merchant_name',
  'test_webhook_enabled',
  'live_webhook_enabled',
  'seckey_enabled',
  'prikey_enabled',
  'pubkey_enabled',
  'merchant_pubkey_enabled',
  'test_apikey',
  'live_apikey',
  'test_webhook',
  'live_webhook',
  'seckey',
  'prikey',
  'pubkey',
  'merchant_pubkey',
  'time_created',
  'time_expire',
  'time_updated',
  'state',
  'enabled',
  'channel_routes'
];


module.exports = MerchantConfig;