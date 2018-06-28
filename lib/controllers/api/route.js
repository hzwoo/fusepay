/**
 * lib/controllers/api/route.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const logger = global.logger;
const Constant = require('../../common/constant');

const Controller = require('./controller');


router.prefix('/api');

router.post('/v:ver/webhooks/fusepay', Controller.fusepay);
router.post('/v:ver/webhooks/alipay', Controller.alipay);
router.post('/v:ver/webhooks/wechatpay', Controller.wechatpay);
router.post('/v:ver/webhooks/tenpay', Controller.tenpay);


/**
 * use route
 */
app.use(router.middleware());