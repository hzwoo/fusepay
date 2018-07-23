/**
 * lib/modules/gateway/channel-delegate.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class ChannelDelegate extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Channel.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannelDelegate) {
      this._model = model.GatewayChannelDelegate || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(ChannelDelegate.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, ChannelDelegate.Fields)
    );
    return this;
  }

}


ChannelDelegate.Fields = [
  'id',
  'name',
  'description',
  'type',
  'type_desc',
  'channel_id',
  'channel_name',
  'channel_desc',
  'product_id',
  'cat_id',
  'cat_name',
  'cat_desc',
  'sub_id',
  'sub_name',
  'sub_desc',
  'rate_enabled',
  'rate_id',
  'sp_config_enabled',
  'sp_config_id',
  'enabled'
];


module.exports = ChannelDelegate;