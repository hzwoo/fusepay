/**
 * lib/modules/static-data/bank.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class Bank extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    Bank.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.StaticBank) {
      this._model = model.StaticBank || null;
    }
  }

  getFields(options) {
    if (options && options.with_null == true) {
      return super.getFields(Bank.Fields);
    } else {
      return super.getFields();
    }
  }

  setFields(fields) {
    _.assign(
      this,
      _.pick(fields, Bank.Fields)
    );
  }

  async findByBankCode(bankCode, columns) {
    if (this.getModel() && bankCode) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          bank_code: bankCode
        })
        .execute();
      if (row && row[0]) {
        _.assign(this, row[0]);
      }
    }
    return this;
  }


}

Bank.Fields = [
  'id',
  'bank_code',
  'bank_name',
  'bank_type',
  'type_name'
];

module.exports = Bank;