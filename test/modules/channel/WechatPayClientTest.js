/**
 * test/modules/channel/wechatpay/WechatPayClientTest.js
 */

'use strict';

const WechatPayClient = require('../../../lib/modules/channel/wechatpay-client');

const wechatpay = new WechatPayClient();

// use your wechatpay accounts
// const secret = '';
// const wx_appid = '';
// const wx_mchid = '';
// const wx_sub_appid = '';
// const wx_sub_mchid = '';

const now = new Date();
// const order_no = Date.parse(now);
const order_no = '1529922139000';
const subject = '支付测试';
const trade_type = 'NATIVE';
//const trade_type = 'MWEB';

const scene_info = {
  "h5_info": {
    "type": "WAP",
    "wap_url": "m.example.com",
    "wap_name": "手机商城"
  }
};

const client_ip = '127.0.0.1';

wechatpay.setSecureKey(secret);

console.log('order_no: ', order_no);


// TestUnifiedOrder();
// TestMicroPay();
TestOrderQuery(order_no);
// TestCloseOrder(order_no);
// TestRefund();
// TestRefundQuery();
// TestReverse();
// TestShortUrl();

async function TestUnifiedOrder() {
  try {
    const res = await wechatpay.UnifiedOrder.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      // sub_appid: wx_sub_appid,
      // sub_mch_id: wx_sub_mchid,
      body: subject,
      out_trade_no: order_no,
      total_fee: 1,
      spbill_create_ip: client_ip,
      notify_url: 'http://localhost/webhooks/wechatpay',
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
    const res = await wechatpay.MicroPay.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      // sub_appid: wx_sub_appid,
      // sub_mch_id: wx_sub_mchid,
      body: subject,
      out_trade_no: order_no,
      total_fee: 1,
      auth_code: '135087496156993296',
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}


async function TestOrderQuery(order_no) {
  try {
    const res = await wechatpay.OrderQuery.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      // sub_appid: wx_sub_appid,
      // sub_mch_id: wx_sub_mchid,
      out_trade_no: order_no,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestCloseOrder(order_no) {
  try {
    const res = await wechatpay.CloseOrder.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      // sub_appid: wx_sub_appid,
      // sub_mch_id: wx_sub_mchid,
      out_trade_no: order_no,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestRefund() {
  try {
    const res = await wechatpay.Refund.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      transaction_id: transaction_id,
      total_fee: 2,
      refund_fee: 1,
      out_refund_no: refund_no,
      op_user_id: wx_mchid
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestRefundQuery() {
  try {
    const res = await wechatpay.RefundQuery.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      transaction_id: transaction_id,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestReverse() {
  try {
    const res = await wechatpay.Reverse.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      transaction_id: transaction_id,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestShortUrl() {
  try {
    const long_url = 'weixin://wxpay/bizpayurl?sign=7B8894853FB11CFE66777F747895446D&appid=' +
      wx_appid +
      '&mch_id=' +
      wx_mchid +
      '&product_id=1234&time_stamp=20161103111111&nonce_str=1234';

    const res = await wechatpay.ShortUrl.request({
      appid: wx_appid,
      mch_id: wx_mchid,
      long_url: long_url,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}