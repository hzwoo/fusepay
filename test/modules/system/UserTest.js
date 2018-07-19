/**
 * test/modules/system/UserTest.js
 */

'use strict';

const _ = require('lodash');
const setup = require('../../../lib/setup');
const SqlModel = require('../../../lib/models/sql-model');
const sqlModel = new SqlModel(setup.mysql);
const utils = setup.utils;

const User = require('../../../lib/modules/system/user');
const user = new User(sqlModel);

const adminUser = require('../../../etc/scripts/system_user');

createTest();
// saveTest();
// findByIdTest();
// findByKeyTest();
// removeTest();
// findTest();

async function createTest() {
  try {
    console.log(adminUser);
    const admin = _.assign({}, adminUser[0]);
    admin.password = utils.digestPassword(admin.password);

    await user.setData(admin)
      .create();
    console.log(user.getData());
  } catch (err) {
    console.log(err);
  }
}

async function saveTest() {
  try {
    await user.setData({
        email: 'cshzwoo@163.com'
      })
      .save();
    console.log(user.getData());
  } catch (err) {
    console.log(err);
  }
}

async function findByIdTest() {
  try {
    await user.findById('10000');
    console.log(user.getData());
  } catch (err) {
    console.log(err);
  }
}

async function findByKeyTest() {
  try {
    await user.findByKey('root');
    console.log(user.getData());
  } catch (err) {
    console.log(err);
  }
}

async function removeTest() {
  try {
    await user.setData({
        id: '10000'
      })
      .remove();
    console.log(user.getData());
  } catch (err) {
    console.log(err);
  }
}

async function findTest() {
  try {
    await user.find([
      'id',
      'username',
      'email',
      'mobile'
    ], {
      username: 'root'
    }, {
      limit: 10
    });
    console.log(user.getList());
  } catch (err) {
    console.log(err);
  }
}