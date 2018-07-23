/**
 * lib/modules/gateway/channel-agent.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class ChannelAgent extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Channel.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannelAgent) {
      this._model = model.GatewayChannelAgent || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(ChannelAgent.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, ChannelAgent.Fields)
    );
    return this;
  }

}

ChannelAgent.Fields = [
  'id',
  'agent_id',
  'delegate_id',
  'delegate_name',
  'inherited_rate_enabled',
  'inherited_rate_id',
  'agent_rate_enabled',
  'agent_rate_id',
  'enabled'
];


module.exports = ChannelAgent;