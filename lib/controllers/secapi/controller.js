/**
 * lib/controllers/secapi/controller.js
 */

'use strict';

const _ = require('lodash');
const logger = global.logger;
const Constant = require('../../common/constant');

const PropertiesHandler = require('./properties-handler');
const PaymentHandler = require('./payment-handler');
const OathpayHandler = require('./oauthpay-handler');
const RefundHandler = require('./refund-handler');
const TransferHandler = require('./transfer-handler');

const Controller = module.exports = {};

Controller.listChannels = async function(ctx, next) {
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
};

Controller.listProducts = async function(ctx, next) {
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
};

Controller.getBalance = async function(ctx, next) {
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
};

Controller.createPayment = async function(ctx, next) {
  try {
    await next();
    ctx.body = await PaymentHandler.create(
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

Controller.getPayment = async function(ctx, next) {
  try {
    await next();
    ctx.request.query.payment_id = ctx.params.payment_id;
    ctx.body = await PaymentHandler.retrieve(
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
};

Controller.listPayments = async function(ctx, next) {
  try {
    await next();
    ctx.body = await PaymentHandler.list(
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
};

Controller.createOauthInfo = async function(ctx, next) {
  try {
    await next();
    ctx.body = await OauthpayHandler.createOauthInfo(
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

Controller.createOauthPay = async function(ctx, next) {
  try {
    await next();
    ctx.body = await OauthpayHandler.createOauthPay(
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

Controller.createRefund = async function(ctx, next) {
  try {
    await next();
    ctx.request.body.payment_id = ctx.params.payment_id;
    ctx.body = await RefundHandler.create(
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

Controller.getRefund = async function(ctx, next) {
  try {
    await next();
    ctx.request.query.payment_id = ctx.params.payment_id;
    ctx.request.query.refund_id = ctx.params.refund_id;
    ctx.body = await RefundHandler.retrieve(
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
};

Controller.listRefunds = async function(ctx, next) {
  try {
    await next();
    ctx.request.query.payment_id = ctx.params.payment_id;
    ctx.body = await RefundHandler.list(
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
};

Controller.createTransfer = async function(ctx, next) {
  try {
    await next();
    ctx.body = await TransferHandler.create(
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

Controller.getTransfer = async function(ctx, next) {
  try {
    await next();
    ctx.request.query.transfer_id = ctx.params.transfer_id;
    ctx.body = await TransferHandler.retrieve(
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
};

Controller.listTransfers = async function(ctx, next) {
  try {
    await next();
    ctx.body = await TransferHandler.list(
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
};