/**
 * lib/modules/gateway/merchant-application.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class MerchantApplication extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    MerchantApplication.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayMerchantApplication) {
      this._model = model.GatewayMerchantApplication || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(MerchantApplication.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, MerchantApplication.Fields)
    );
    return this;
  }

}


MerchantApplication.Fields = [
  'id',
  'app_name',
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