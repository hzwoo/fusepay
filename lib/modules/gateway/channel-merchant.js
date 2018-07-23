/**
 * lib/modules/gateway/channel-merchant.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class ChannelMerchant extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Channel.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannelMerchant) {
      this._model = model.GatewayChannelMerchant || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(ChannelMerchant.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, ChannelMerchant.Fields)
    );
    return this;
  }

}


ChannelMerchant.Fields = [
  'id',
  'merchant_id',
  'delegate_id',
  'delegate_name',
  'delegate_config_enabled',
  'delegate_config_id',
  'inherited_enabled',
  'inherited_id',
  'merchant_rate_enabled',
  'merchant_rate_id',
  'priority',
  'enabled'
];


module.exports = ChannelMerchant;