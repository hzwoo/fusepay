/**
 * test/models/sql/SqlModelTest.js
 */

'use strict';

const setup = require('../../../lib/setup');
const SqlModel = require('../../../lib/models/sql-model');

const sqlModel = new SqlModel(setup.mysql);

// CountTest();
// CountDistinctTest();
SelectTest();

async function CountTest() {
  try {
    const res = await sqlModel.StaticBank
      .count({
        count: ['id']
      })
      .execute();

    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function CountDistinctTest() {
  try {
    const res = await sqlModel.StaticBank
      .countDistinct({
        count: ['bank_code']
      })
      .execute();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function SelectTest() {
  try {
    const res = await sqlModel.StaticBankBranch
      .select(['bank_code', 'bank_name'])
      .whereIn('bank_code', ['101', '102'])
      .limit(5)
      .execute();

    console.log(res);
  } catch (err) {
    console.log(err);
  }
}