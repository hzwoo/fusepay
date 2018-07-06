/**
 * lib/modules/static-data/bankbranch.js
 */

'use strict';

const _ = require('lodash');

const PersistentObject = require('../object/persistent-object');

class BankBranch extends PersistentObject {
  constructor(model) {
    super(model);
    this.setModel(model);
    const self = this;
    BankBranch.Fields.forEach(function(field) {
      self[field] = null;
    });
  }

  setModel(model) {
    if (model && model.StaticBankBranch) {
      this._model = model.StaticBankBranch || null;
    }
  }

  getData() {
    return _.assign({},
      _.pick(this, BankBranch.Fields)
    );
  }

  setData(data) {
    _.assign(
      this,
      _.pick(data, BankBranch.Fields)
    );
  }

  async findByBranchCode(branchCode, columns) {
    if (this.getModel() && branchCode) {
      const row = await this.getModel()
        .column(columns)
        .select()
        .where({
          branch_code: branchCode
        })
        .execute();
      if (row && row[0]) {
        _.assign(this, row[0]);
      }
    }
    return this;
  }

}

BankBranch.Fields = [
  'id',
  'bank_code',
  'bank_name',
  'branch_code',
  'branch_name',
  'region_code'
];

module.exports = BankBranch;