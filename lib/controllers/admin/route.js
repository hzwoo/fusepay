/**
 * lib/controllers/admin/route.js
 */

'use strict';

const Koa = require('koa');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

router.prefix('/admin');



/**
 * use route
 */
app.use(router.middleware());