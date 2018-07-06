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
    Channel.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannelParameter) {
      this._model = model.GatewayChannelParameter || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, ChannelParameter.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, ChannelParameter.Fields)
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