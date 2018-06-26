/**
 * lib/controllers/agent/route.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

router.prefix('/agent');



/**
 * use routes
 */
app.use(router.middleware());