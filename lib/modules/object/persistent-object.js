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

  getData() {
    return _.assign({}, this);
  }

  setData(data) {
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
          this.getData()
        )
        .execute();
    }
    return this;
  }

  async save() {
    if (this.getModel() && this.getId()) {
      const result = await this.getModel()
        .update(
          _.omit(this.getData(), 'id')
        )
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
      }
    }
    return this;
  }

  async find(columns, conditions, options) {
    if (this.getModel()) {
      const list = await this.getModel()
        .column(columns)
        .select()
        .find(conditions, options)
        .execute();

      this._setList(list);
    }
    return this;
  }
}


module.exports = PersistentObject;