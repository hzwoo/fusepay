/**
 * lib/controllers/cron/route.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const logger = global.logger;
const Constant = require('../../common/constant');

const Controller = require('./controller');


router.prefix('/cron');


/**
 * use routes
 */
app.use(router.middleware());