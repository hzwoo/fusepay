/**
 * lib/controllers/secapi/route.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const Controller = require('./controller');


router.prefix('/secapi');

// router.use(Auth.apiAuth);

/**
 * [查询支付配置]
 */
router.get('/v:ver/channels', Controller.listChannels);
router.get('/v:ver/products', Controller.listProducts);
router.get('/v:ver/balance', Controller.getBalance);

/**
 * [收款（消费/销售）]
 */
router.post('/v:ver/payment', Controller.createPayment);
router.get('/v:ver/payment/pay_:payment_id', Controller.getPayment);
router.get('/v:ver/payments', Controller.listPayments);

/**
 * [H5收款，含公众号/服务窗]
 */
router.post('/v:ver/oauthinfo', Controller.createOauthInfo);
router.post('/v:ver/oauthpay', Controller.createOauthPay);

/**
 * [退款（消费/销售）]
 */
router.post('/v:ver/payment/pay_:payment_id/refund', Controller.createRefund);
router.get('/v:ver/payment/pay_:payment_id/refund/rf_:refund_id', Controller.getRefund);
router.get('/v:ver/payment/pay_:payment_id/refunds', Controller.listRefunds);

/**
 * [代付]
 */
router.post('/v:ver/transfer', Controller.createTransfer);
router.get('/v:ver/transfer/tr_:transfer_id', Controller.getTransfer);
router.get('/v:ver/transfers', Controller.listTransfers);


/**
 * use route
 */
app.use(router.middleware());