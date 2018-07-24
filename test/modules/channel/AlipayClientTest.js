/**
 * test/modules/channel/AlipayClientTest.js
 */

'use strict';

const AlipayClient = require('../../../lib/modules/channel/alipay-client');

const alipay = new AlipayClient(AlipayClient.TEST_HOST);

const app_id = '2016091000476232';
const seller_id = '2088102174925672';
const buyer_logon_id = 'qqkjcu6789@sandbox.com';
const subject = '支付宝交易测试';
const notify_url = 'http://localhost/webhooks/alipay';

const now = new Date();
const order_no = Date.parse(now);
// const order_no = '1476712712000';

alipay.setPrivateKeyByPath(__dirname + '/cert/aliwap_rsa_private_key.pem');
alipay.setPublicKeyByPath(__dirname + '/cert/alipay_rsa_public_key.pem');

console.log('order_no: ', order_no);


TestTradePrecreate(order_no.toString());
// TestTradeCreate(order_no.toString());
// TestTradePay(order_no.toString());
// TestTradeWapPay(order_no.toString());
// TestTradePagePay(order_no.toString());
// TestTradeAppPay(order_no.toString());
// TestTradeQuery(order_no);
// TestTradeClose(order_no);
// TestTradeRefund();
// TestTradeCancel();
// TestFastpayRefundQuery();
// TestBillDownloadQuery();


async function TestTradePrecreate(order_no) {
  try {
    const res = await alipay.TradePrecreate.request({
      app_id: app_id,
      notify_url: notify_url,
      biz_content: {
        out_trade_no: order_no,
        total_amount: 1,
        subject: subject,
        // seller_id: '2088102174925672'
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeCreate(order_no) {
  try {
    const res = await alipay.TradeCreate.request({
      app_id: app_id,
      notify_url: notify_url,
      biz_content: {
        out_trade_no: order_no,
        total_amount: '1.25',
        subject: subject,
        seller_id: seller_id,
        buyer_logon_id: buyer_logon_id
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradePay(order_no) {
  try {
    const code = '';
    const res = await alipay.TradePay.request({
      app_id: app_id,
      notify_url: notify_url,
      biz_content: {
        out_trade_no: order_no,
        scene: 'bar_code',
        auth_code: code,
        total_amount: 1,
        subject: subject,
        seller_id: seller_id
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeWapPay(order_no) {
  try {
    const res = await alipay.TradeWapPay.request({
      app_id: app_id,
      biz_content: {
        out_trade_no: order_no,
        total_amount: 1,
        subject: subject,
        timeout_express: '90m',
        seller_id: seller_id,
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradePagePay() {
  try {
    const res = await alipay.TradePagePay.request({

    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeAppPay() {
  try {
    const res = await alipay.TradeAppPay.request({

    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeQuery(order_no) {
  try {
    const res = await alipay.TradeQuery.request({
      app_id: app_id,
      biz_content: {
        out_trade_no: order_no,
        // trade_no: '2016101721001004080200050760'
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeClose(order_no) {
  try {
    const res = await alipay.TradeClose.request({
      app_id: app_id,
      biz_content: {
        out_trade_no: order_no,
        // trade_no: '2016101721001004080200050760'
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeRefund(order_no) {
  try {
    const res = await alipay.TradeRefund.request({
      app_id: app_id,
      biz_content: {
        out_trade_no: order_no,
        // trade_no: '2016101721001004080200050759',
        // trade_no: code,
        refund_amount: 1
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeCancel(order_no) {
  try {
    const res = await alipay.TradeCancel.request({
      app_id: app_id,
      biz_content: {
        out_trade_no: order_no,
        // trade_no: '2016101721001004080200050760'
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestTradeFastpayRefundQuery() {
  try {
    const res = await alipay.TradeFastpayRefundQuery.request({

    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

async function TestBillDownloadQuery() {
  try {
    const res = await alipay.BillDownloadQuery.request({
      app_id: app_id,
      biz_content: {
        bill_type: 'trade',
        bill_date: '2016-10-16'
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}