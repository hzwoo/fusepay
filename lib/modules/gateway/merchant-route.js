/**
 * lib/modules/gateway/merchant-route.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class MerchantRoute extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    MerchantRoute.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayMerchantRoute) {
      this._model = model.GatewayMerchantRoute || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(MerchantRoute.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, MerchantRoute.Fields)
    );
    return this;
  }

}


MerchantRoute.Fields = [
  'id',
  'merchant_config_id',
  'channel_merchant_id'
];


module.exports = MerchantRoute;