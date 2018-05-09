/**
 * lib/controllers/api/routes.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const logger = global.logger;
const Constant = require('../../common/constant');

const Webhooks = require('./webhooks');

const Controller = {};

router.prefix('/api');

router.post('/v:ver/webhooks/inloop', Controller.inloop);
router.post('/v:ver/webhooks/alipay', Controller.alipay);
router.post('/v:ver/webhooks/wxpay', Controller.wxpay);
router.post('/v:ver/webhooks/tenpay', Controller.tenpay);


/**
 * use routes
 */
app.use(router.middleware());


Controller.inloop = async function(header, payload) {
  try {
    await next();
    ctx.body = await Webhooks.inloop(ctx);
  } catch (err) {
    logger.error(err);
    ctx.body = {
      status: err.status || Constant.STATUS.FAIL,
      error: {
        code: err.code,
        message: err.message
      }
    };
  }
};

Controller.alipay = async function(header, payload) {
  try {
    await next();
    ctx.body = await Webhooks.alipay(ctx);
  } catch (err) {
    logger.error(err);
    ctx.body = {
      status: err.status || Constant.STATUS.FAIL,
      error: {
        code: err.code,
        message: err.message
      }
    };
  }
};

Controller.wxpay = async function(header, payload) {
  try {
    await next();
    ctx.body = await Webhooks.wxpay(ctx);
  } catch (err) {
    logger.error(err);
    ctx.body = {
      status: err.status || Constant.STATUS.FAIL,
      error: {
        code: err.code,
        message: err.message
      }
    };
  }
};

Controller.tenpay = async function(header, payload) {
  try {
    await next();
    ctx.body = await Webhooks.tenpay(ctx);
  } catch (err) {
    logger.error(err);
    ctx.body = {
      status: err.status || Constant.STATUS.FAIL,
      error: {
        code: err.code,
        message: err.message
      }
    };
  }
};