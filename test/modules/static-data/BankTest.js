/**
 * test/modules/static-data/BankTest.js
 */

'use strict';

const setup = require('../../../lib/setup');
const SqlModel = require('../../../lib/models/sql-model');
const sqlModel = new SqlModel(setup.mysql);

const Bank = require('../../../lib/modules/static-data/bank');
const bank = new Bank(sqlModel);


// findByIdTest();
findByBankCodeTest();

async function findByIdTest() {
  try {
    await bank.findById('102');
    console.log(bank.getData());
  } catch (err) {
    console.log(err);
  }
}

async function findByBankCodeTest() {
  try {
    await bank.findByBankCode('102');
    console.log(bank.getData());
  } catch (err) {
    console.log(err);
  }
}