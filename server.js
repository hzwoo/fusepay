/**
 * server.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const setup = global.setup = require('./lib/setup');

/*******************************************
 * logger
 ******************************************/
const bunyan = require('bunyan');

const logDir = process.env.npm_package_config_logdir;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = global.logger = bunyan.createLogger({
  name: 'fusepay-server',
  streams: [{
    level: 'debug',
    stream: process.stdout
  }, {
    level: 'error',
    path: path.join(logDir, 'fusepay-error.log')
  }, {
    level: 'info',
    path: path.join(logDir, 'fusepay-info.log')
  }]
});


/*******************************************
 * init koa
 ******************************************/
const Koa = require('koa');

const app = new Koa();

app.keys = ['Secret0ffusepay'];
app.proxy = true;

/*******************************************
 * cors
 ******************************************/
const KoaCors = require('@koa/cors');

const corsOptions = {
  origin: '*',
  allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: [
    'Accept',
    'Content-Type',
    'Authorization',
    'Access-Control-Request-Origin',
    'X-Requested-With',
    'X-Stream'
  ]
};

/*******************************************
 * request/query
 ******************************************/
const bodyParser = require('koa-bodyparser');
const xmlParser = require('koa-xml-body');

app.use(xmlParser());
app.use(bodyParser());

/*******************************************
 * helmet
 ******************************************/
const helmet = require('koa-helmet');

app.use(helmet());


/***************************************************************
 * passport for authentication
 ***************************************************************/
const passport = require('koa-passport');
app.use(passport.initialize());

/*******************************************
 * router
 ******************************************/
const Router = require('koa-router');
const compose = require('koa-compose');

const router = new Router();
const services = [];

if (!!process.env.npm_package_config_services_installer &&
  JSON.parse(process.env.npm_package_config_services_installer)) {
  router.all('/install*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/installer/route.js').middleware
    )(ctx, next);
  });
  services.push('installer');
}

if (!!process.env.npm_package_config_services_api &&
  JSON.parse(process.env.npm_package_config_services_api)) {
  router.all('/api*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/api/route.js').middleware
    )(ctx, next);
  });
  services.push('api');
}

if (!!process.env.npm_package_config_services_secapi &&
  JSON.parse(process.env.npm_package_config_services_secapi)) {
  router.all('/secapi*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/secapi/route.js').middleware
    )(ctx, next);
  });
  services.push('secapi');
}

if (!!process.env.npm_package_config_services_admin &&
  JSON.parse(process.env.npm_package_config_services_admin)) {
  router.all('/admin*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/admin/route.js').middleware
    )(ctx, next);
  });
  services.push('admin');
}

if (!!process.env.npm_package_config_services_merchant &&
  JSON.parse(process.env.npm_package_config_services_merchant)) {
  router.all('/merchant*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/merchant/route.js').middleware
    )(ctx, next);
  });
  services.push('merchant');
}

if (!!process.env.npm_package_config_services_agent &&
  JSON.parse(process.env.npm_package_config_services_agent)) {
  router.all('/agent*', async function(ctx, next) {
    await compose(
      require('./lib/controllers/agent/route.js').middleware
    )(ctx, next);
  });
  services.push('agent');
}

app.use(router.routes());
app.use(router.allowedMethods());

/*******************************************
 * start server
 ******************************************/

if (!module.parent) {
  const http = require('http');
  const server = global.server = http.createServer(app.callback());
  const host = process.env.npm_package_config_host || process.env.HOST || '127.0.0.1';
  const port = process.env.npm_package_config_port || process.env.PORT || 3000;
  server.listen(port, host);

  logger.info('Node ' + process.version +
    ' listening on ' + host + ':' + port +
    ', with services: [' +
    services.join() +
    ']');
}