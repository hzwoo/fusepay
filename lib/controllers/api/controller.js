/**
 * lib/controllers/api/controller.js
 */

'use strict';

const _ = require('lodash');
const logger = global.logger;

const WebhooksHandler = require('./webhooks-handler');

const Controller = module.exports = {};

Controller.inloop = async function(ctx, next) {
  try {
    await next();
    ctx.body = await WebhooksHandler.inloop(
      ctx.request.header,
      ctx.request.body
    );
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

Controller.alipay = async function(ctx, next) {
  try {
    await next();
    ctx.body = await WebhooksHandler.alipay(
      ctx.request.header,
      ctx.request.body
    );
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

Controller.wxpay = async function(ctx, next) {
  try {
    await next();
    ctx.body = await WebhooksHandler.wxpay(
      ctx.request.header,
      ctx.request.body
    );
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

Controller.tenpay = async function(ctx, next) {
  try {
    await next();
    ctx.body = await WebhooksHandler.tenpay(
      ctx.request.header,
      ctx.request.body
    );
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