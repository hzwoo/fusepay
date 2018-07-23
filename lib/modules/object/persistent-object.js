/**
 * lib/modules/object/persistent-object.js
 */

'use strict';

const _ = require('lodash');

class PersistentObject {
  constructor(model) {
    this._list = null;
    this._model = null;
    this.id = null;
  }

  setModel(model) {}

  getModel() {
    return this._model;
  }

  getField(field) {
    return this[field];
  }

  getFields(fields) {
    if (fields) {
      return _.assgin({}, _.pick(
        _.omit(this, ['_list', '_model']),
        fields));
    } else {
      return _.assign({}, _.omitBy(
        _.omit(this, ['_list', '_model']),
        _.isNil));
    }
  }

  setField(field, value) {
    this[field] = value;
  }

  setFields(fields) {
    _.assign(this, fields);
    return this;
  }

  getId() {
    return this.id;
  }

  getList() {
    return this._list;
  }

  _setList(list) {
    this._list = list;
  }

  async create() {
    if (this.getModel()) {
      const result = await this.getModel()
        .insert(
          this.getFields()
        )
        .execute();
    }
    return this;
  }

  /**
   * [save description]
   * @param  {Object} options [description]
   *  - fields: {Array}, 保存的字段
   * @return {[type]}         [description]
   */
  async save(fields) {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .update(
          _.omit(this.getFields(fields), 'id'))
        .where({
          id: this.getId()
        })
        .execute();
    }
    return this;
  }

  async remove() {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .where({
          id: this.getId()
        })
        .del()
        .execute();
    }
    return this;
  }

  async findById(id, columns) {
    let data = null;
    if (this.getModel() && id) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          id: id
        })
        .execute();
      if (row && row[0]) {
        _.assign(this, row[0]);
        data = _.assign({}, row[0]);
      }
    }
    return data;
  }

  async find(columns, conditions, options) {
    let data = null;
    if (this.getModel()) {
      const list = await this.getModel()
        .column(columns)
        .select()
        .find(conditions, options)
        .execute();

      this._setList(list);
      data = list;
    }
    return data;
  }
}


module.exports = PersistentObject;