/**
 * lib/modules/gateway/channel-parameter.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class ChannelParameter extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    ChannelParameter.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannelParameter) {
      this._model = model.GatewayChannelParameter || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(ChannelParameter.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, ChannelParameter.Fields)
    );
    return this;
  }

}


ChannelParameter.Fields = [
  'id',
  'channel_id',
  'channel_name',
  'param_name',
  'param_desc',
  'sp_enabled',
  'sp_mandatory',
  'merchant_enabled',
  'merchant_mandatory'
];


module.exports = ChannelParameter;