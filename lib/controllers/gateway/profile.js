/**
 * lib/controllers/secapi/profile-controller.js
 */

'use strict';

const _ = require('lodash');

const Handler = module.exports = {};

module.exports = {

  listChannels: async function(ctx, next) {
    try {
      await next();
      ctx.body = await PropertiesHandler.listChannels(
        ctx.request.header,
        ctx.request.query
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
  },

  listProducts: async function(ctx, next) {
    try {
      await next();
      ctx.body = await PropertiesHandler.listProducts(
        ctx.request.header,
        ctx.request.query
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
  },

  getBalance: async function(ctx, next) {
    try {
      await next();
      ctx.body = await PropertiesHandler.getBalance(
        ctx.request.header,
        ctx.request.query
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
  }
};