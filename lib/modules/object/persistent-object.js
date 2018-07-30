/**
 * lib/modules/object/persistent-object.js
 */

'use strict';

const _ = require('lodash');
const Result = require('../../common/result');

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
    let result = null;
    if (this.getModel()) {
      result = await this.getModel()
        .insert(
          this.getFields()
        )
        .execute();
    }
    if (result) {
      return new Result(true, result);
    } else {
      return new Result(false);
    }
  }

  /**
   * [save description]
   * @param  {Object} options [description]
   *  - fields: {Array}, 保存的字段
   * @return {[type]}         [description]
   */
  async save(fields) {
    let result = null;
    if (this.getModel() && this.getId()) {
      result = await this.getModel()
        .update(
          _.omit(this.getFields(fields), 'id'))
        .where({
          id: this.getId()
        })
        .execute();
    }
    if (result > 0) {
      return new Result(true);
    } else {
      return new Result(false);
    }
  }

  async remove() {
    let result = null;
    if (this.getModel() && this.getId()) {
      result = await this.getModel()
        .where({
          id: this.getId()
        })
        .del()
        .execute();
    }
    if (result > 0) {
      return new Result(true);
    } else {
      return new Result(false);
    }
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
      const row = await this.getModel()
        .column(columns)
        .select()
        .find(conditions, options)
        .execute();
      if (row) {
        this._setList(row);
        data = row;
      }
    }
    return data;
  }
}


module.exports = PersistentObject;