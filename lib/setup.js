/**
 * lib/setup.js
 */

'use strict';

/***************************************************************
 * Config settings
 ***************************************************************/
const config = require('../config.json');

/***************************************************************
 * Global utility
 ***************************************************************/
const Utility = require('./common/utils');
const utils = new Utility();

/***************************************************************
 * connect mysql
 ***************************************************************/
const mysql = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
  },
  pool: {
    min: 0,
    max: 10
  }
});

/***************************************************************
 * Setup mongoDB
 ***************************************************************/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let mongoUri = 'mongodb://';
mongoUri += config.mongodb.user + '@' + config.mongodb.password;
mongoUri += config.mongodb.host + ':' + config.mongodb.port;
mongoUri += '/' + config.mongodb.database;
mongoose.connect(mongoUri, {});
const mongo = require('./models/nosql-model');

/***************************************************************
 * Setup Redis
 ***************************************************************/
const Redis = require('ioredis');
const DEFAULT_REDIS_HOST = 'localhost';
const DEFAULT_REDIS_PORT = 6379;
const DEFAULT_REDIS_DB = 0;
const DEFAULT_REDIS_PASSWORD = '';
const redisOptions = {
  host: config.redis.host || DEFAULT_REDIS_HOST,
  port: config.redis.port || DEFAULT_REDIS_PORT,
  db: config.redis.db || DEFAULT_REDIS_DB,
  password: config.redis.password || DEFAULT_REDIS_PASSWORD,
};

const redis = new Redis(redisOptions);

/***************************************************************
 * Export configs
 ***************************************************************/
module.exports = {
  config: config,
  utils: utils,
  mysql: mysql,
  mongo: mongo,
  cache: redis,
  redis: {
    newInstance: function() {
      return new Redis(redisOptions);
    }
  }
};