/**
 * passport-handler.js
 */

'use strict';

const _ = require('lodash');
const co = require('co');
const passport = require('koa-passport');

const Exception = require('../common/exception');
const Result = require('../common/result');
const Constant = require('../common/constant');

const setup = global.setup;
const redisCache = setup.cache;
const utils = setup.utils;

const SqlModel = require('../models/sql-model');
const sqlModel = new SqlModel(setup.mysql);

const UserHandler = require('../modules/system/user-handler');
const userHandler = new UserHandler(sqlModel);



/*************************************************************************************
 * passport Local
 *************************************************************************************/

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    co(function* wrap() {
      /**
       * co里不支持.then().catch()写法
       */
      try {
        const result = yield userHandler.queryUser({
          user_id: username
        }, {
          fuzzy_user_id: true
        });
        if (result && result.status == true) {
          if (utils.verifyPassword(password, result.data.password)) {
            const userinfo = _.pick(result.data, [
              'username',
              'email',
              'group_id'
            ]);
            userinfo.user_id = result.data.id;
            done(null, userinfo);
          } else {
            done(new Exception.BadRequest({
              status: Constant.HTTP.UNAUTHORIZED.CODE,
              code: Constant.HTTP.UNAUTHORIZED.MESSAGE,
              message: '用户名或密码错误(Incorrect username or password)',
              detail: {
                username: username
              }
            }), null);
          }
        } else {
          done(new Exception.BadRequest({
            status: Constant.HTTP.UNAUTHORIZED.CODE,
            code: Constant.HTTP.UNAUTHORIZED.MESSAGE,
            message: '用户名或密码错误(Incorrect username or password)',
            detail: {
              username: username,
              errcode: 'NOT_FOUND',
              errmsg: 'Could not find user'
            }
          }), null);
        }
      } catch (err) {
        done(new Exception.BadRequest({
          status: Constant.HTTP.INTERNAL_SERVER_ERROR.CODE,
          code: Constant.HTTP.INTERNAL_SERVER_ERROR.MESSAGE,
          message: '系统错误(System error)',
          detail: {
            errcode: err.code,
            errmsg: err.message
          }
        }), null);
      }
    });
  }
));


/*************************************************************************************
 * passport JWT
 *************************************************************************************/

const jwtSettings = {
  secret_key: 'fusepay',
  issuer: 'fusepay',
  expires_in: 3600
};

// const jwtSettings = setup.jwt;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: jwtSettings.secret_key,
  issuer: jwtSettings.issuer
};

passport.use(new JwtStrategy(
  options,
  function(payload, done) {
    co(function* wrap() {
      try {
        let key = utils.md5(payload.user_id + payload.nonce);
        let user = yield redisCache.get(key);
        if (user) {
          user = JSON.parse(user);
          done(null, user);
        } else {
          done(new Exception.Unauthorized({
            status: Constant.HTTP.UNAUTHORIZED.CODE,
            code: 'UNAUTHORIZED',
            message: '用户未登录(Invalid credentials)',
            detail: {
              user_id: payload.user_id,
              username: payload.username
            }
          }), false)
        }
      } catch (err) {
        done(new Exception.BadRequest({
          status: Constant.HTTP.INTERNAL_SERVER_ERROR.CODE,
          code: Constant.HTTP.INTERNAL_SERVER_ERROR.MESSAGE,
          message: '系统错误(System error)',
          detail: {
            errcode: err.code,
            errmsg: err.message
          }
        }), null);
      }
    });
  }
));