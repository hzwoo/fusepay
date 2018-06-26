/**
 * test/modules/channel/TenpayClientTest.js
 */

'use strict';

const crypto = require('crypto');
const TenpayClient = require('../../../lib/modules/channel/tenpay-client');

const tenpay = new TenpayClient();

const secret = '8934e7d15453e97507ef794cf7b0519d';
const qpay_mchid = '1900005911';
const qpay_sub_mchid = '1900000109';
// const qpay_mchid = '1900000109';

const now = new Date();
// const order_no = Date.parse(now);
// const order_no = '1501750071000';
const order_no = '1529938976000';
//const sbj = '第三方手机浏览器|H5支付|三维度-IPhone7 128G|三维度商城-收银台';
const subject = '支付测试';
const trade_type = 'NATIVE';
const client_ip = '127.0.0.1';

tenpay.setSecureKey(secret);

console.log('order_no: ', order_no);

// TestUnifiedOrder();
TestMicroPay();
// TestOrderQuery(order_no);
// TestCloseOrder(order_no);
// TestRefund();
// TestRefundQuery();
// TestReverse();
// TestStatement();

async function TestUnifiedOrder() {
  try {
    const res = await tenpay.UnifiedOrder.request({
      mch_id: qpay_mchid,
      // sub_mch_id: qpay_sub_mchid,
      body: subject,
      out_trade_no: order_no,
      total_fee: 1,
      fee_type: 'CNY',
      spbill_create_ip: client_ip,
      notify_url: 'http://localhost/webhooks/tenpay',
      trade_type: trade_type,
      // scene_info: scene_info
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestMicroPay() {
  try {
    const deviceInfo = 'WP00000001';
    const authCode = '910190579580560885';
    const res = await tenpay.MicroPay.request({
      mch_id: qpay_mchid,
      // sub_mch_id: qpay_sub_mchid,
      body: subject,
      out_trade_no: order_no,
      total_fee: 1,
      fee_type: 'CNY',
      spbill_create_ip: client_ip,
      notify_url: 'http://localhost/webhooks/tenpay',
      auth_code: authCode,
      device_info: deviceInfo,
      attach: 'attach',
      limit_pay: 'no_credit',
      appid: '1007033799'
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}


async function TestOrderQuery(order_no) {
  try {
    const res = await tenpay.OrderQuery.request({
      // appid: qpay_appid,
      mch_id: qpay_mchid,
      // sub_mch_id: qpay_sub_mchid,
      out_trade_no: order_no,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestCloseOrder(order_no) {
  try {
    const res = await tenpay.CloseOrder.request({
      mch_id: qpay_mchid,
      out_trade_no: order_no,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestRefund() {
  try {
    const keyPath = __dirname + '/files/qpay/1900000109_532398_new.pem';
    const certPath = __dirname + '/files/qpay/1900000109_532398_new.pem';
    // const pfxPath = __dirname + '/files/qpay/1900000109_532398_new.pfx';
    const caPath = __dirname + '/files/qpay/cacert_new.pem';
    const cert = {
      // key: fs.readFileSync(keyPath),
      pass: '532398',
      cert: fs.readFileSync(certPath),
      ca: fs.readFileSync(caPath)
    };

    const refund_no = Date.parse(now);
    const op_user_id = '1900000109';
    const passwd = crypto.createHash('md5').update('111111', 'utf8').digest('hex');

    const res = await tenpay.Refund.request({
      mch_id: qpay_mchid,
      // sub_mch_id: qpay_sub_mchid,
      out_trade_no: order_no,
      out_refund_no: refund_no,
      refund_fee: 1,
      op_user_id: op_user_id,
      op_user_passwd: passwd
    }, cert);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestRefundQuery() {
  try {
    const res = await tenpay.RefundQuery.request({
      mch_id: qpay_mchid,
      out_refund_no: order_no
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestReverse() {
  try {
    const op_user_id = '1900000109';
    const res = await tenpay.Reverse.request({
      mch_id: qpay_mchid,
      out_trade_no: order_no,
      op_user_id: op_user_id
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestStatement() {
  try {
    const res = await tenpay.Statement.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      long_url: long_url,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}