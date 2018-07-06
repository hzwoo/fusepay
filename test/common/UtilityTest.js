/**
 * test/common/UtilityTest.js
 */

'use strict';

const Utility = require('../../lib/common/utils');
const utility = new Utility();

const userId = '10000';
const secret = 'secret';

// ApiKeyTest();
// DigestPasswordTest();
// RandomTest();
// QRCodeTest();
// CentYuanTest();
// NetInfoTest();
TransactionIdTest();

function ApiKeyTest() {
  const testKey = utility.makeTestApiKey(userId, secret);
  console.log('Test Api Key', testKey);
  console.log('test key extracted', utility.extractApiKey(testKey, secret));

  const liveKey = utility.makeLiveApiKey(userId, secret);
  console.log('Live Api Key', liveKey);
  console.log('live key extracted', utility.extractApiKey(liveKey, secret));
}


function DigestPasswordTest() {
  const password = utility.digestPassword(secret);
  console.log('digested password', password);
  console.log('verify password', secret, utility.verifyPassword(secret, password));
}


function RandomTest() {
  console.log('random hex', utility.makeRandomHex());
  console.log('random code', utility.makeRandomCode());
}

async function QRCodeTest() {
  const qrCode = await utility.makeQRCode('http://fusepay.com/pay/10000');
  console.log('qrcode', qrCode);
}

function CentYuanTest() {
  const cent = 123;
  const yuan = 5.67;
  console.log('Cent to Yuan', cent, utility.centToYuan(cent));
  console.log('Yuan to Cent', yuan, utility.yuanToCent(yuan));
}

function NetInfoTest() {
  console.log('Host IP', utility.getHostIpAddress());
  console.log('All IPs', utility.getHostIpAddresses());
  console.log('Host MAC', utility.getHostMacAddress());
  console.log('All MACs', utility.getHostMacAddresses());
}

async function TransactionIdTest() {
  for (let i = 0; i < 20; ++i) {
    const transId = await utility.makeTransactionId('PAYMENT');
    const orderNo = utility.makeOrderNo(transId);
    console.log('' + i, transId, orderNo);
  }

  for (let i = 0; i < 10; ++i) {
    const transId = await utility.makeTransactionId('REFUND');
    const orderNo = utility.makeOrderNo(transId);
    console.log('' + i, transId, orderNo);
  }

  for (let i = 0; i < 10; ++i) {
    const transId = await utility.makeTransactionId('TRANSFER');
    const orderNo = utility.makeOrderNo(transId);
    console.log('' + i, transId, orderNo);
  }
}