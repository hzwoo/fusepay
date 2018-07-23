/**
 * lib/modules/gateway/product.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Product extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Product.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.GatewayProduct) {
      this._model = model.GatewayProduct || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(Product.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, Product.Fields)
    );
    return this;
  }

}


Product.Fields = [
  'id',
  'cat_id',
  'cat_name',
  'cat_desc',
  'sub_id',
  'sub_name',
  'sub_desc',
  'scene_info',
  'logo',
  'channel_excluded',
  'enabled'
];


module.exports = Product;