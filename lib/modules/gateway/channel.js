/**
 * lib/modules/gateway/channel.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Channel extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Channel.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayChannel) {
      this._model = model.GatewayChannel || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, Channel.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, Channel.Fields)
    );
    return this;
  }

}


Channel.Fields = [
  'id',
  'name',
  'description',
  'type',
  'type_desc',
  'webhook_path',
  'prod_sub_name',
  'contact_name',
  'contact_email',
  'contact_phone',
  'tech_contact_name',
  'tech_contact_email',
  'tech_contact_phone',
  'state',
  'province',
  'city',
  'address',
  'enabled'
];


module.exports = Channel;