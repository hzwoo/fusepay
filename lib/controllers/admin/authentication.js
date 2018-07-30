/**
 * lib/controllers/admin/authentication.js
 */

'use strict';

const _ = require('lodash');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const setup = global.setup;
const utils = setup.utils;
const redisCache = setup.cache;

const logger = global.logger;

const Constant = require('../../common/constant');
// const FusepayError = require('../../common/error');


// const AccessHandler = require('../../security/access-handler');

require('../../middleware/passport-handler');

const JWT_REGEX = /^[Jj][Ww][Tt]\s+(.+)/
const jwtSettings = {
  secret_key: 'fusepay',
  issuer: 'fusepay',
  expires_in: 3600
};

module.exports = {

  login: async function(ctx, next) {
    try {
      await passport.authenticate(
        'local',
        function(err, user, info) {
          let response = null;
          if (err) {
            ctx.status = err.status;
            ctx.body = {
              timestamp: moment().format('X'),
              errcode: err.detail.errcode || err.code,
              errmsg: err.detail.errmsg || err.message
            };
          } else {
            if (user) {
              user.nonce = utils.makeRandomHex();
              const token = jwt.sign({
                  user_id: user.user_id,
                  username: user.username,
                  group_id: user.group_id,
                  nonce: user.nonce
                },
                jwtSettings.secret_key, {
                  expiresIn: jwtSettings.expires_in,
                  issuer: jwtSettings.issuer
                });

              const key = utils.md5(user.user_id + user.nonce);
              redisCache.set(key, JSON.stringify(user));

              ctx.body = {
                timestamp: moment().format('X'),
                user_id: user.user_id,
                username: user.username,
                group_id: user.group_id,
                token: token
              };

              logger.info('LOGGED IN: username(' + user.username + ')');
            } else {
              ctx.status = Constant.HTTP.UNAUTHORIZED.CODE;
              ctx.message = '用户名或密码错误(Incorrect username or password)';
              ctx.body = {
                timestamp: moment().format('X'),
                errmsg: info && info.message ? info.message : 'Invalid credentials'
              };
            }
          }
        }
      )(ctx, next);
    } catch (err) {
      let errMsg = 'admin.authentication: [' + err.code + '] ' + err.message;
      if (err.detail) {
        errMsg += ', detail(' + JSON.stringify(err.detail) + ')';
      }
      logger.error(errMsg);
      ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      ctx.body = {
        timestamp: moment().format('X'),
        errcode: err && err.code ? err.code : null,
        errmsg: err && err.message ? err.message : null
      };
    }
  },


  logout: async function(ctx, next) {
    try {
      const auth = ctx.request.get('authorization').match(JWT_REGEX);
      const token = auth ? auth[1] : null;
      const payload = token ? jwt.verify(token, jwtSettings.secret_key) : null;

      if (payload) {
        ctx.logout();

        if (redisCache) {
          const key = utils.md5(payload.user_id + payload.nonce);
          redisCache.del(key);
        }

        logger.info('LOGGED OUT: username(' + payload.username + '), IP(' + ctx.ip + ')');
        ctx.body = {
          timestamp: moment().format('X')
        }
      } else {
        ctx.status = Constant.HTTP.NON_AUTHORITATIVE_INFORMATION.CODE;
      }
    } catch (err) {
      let errMsg = 'admin.authenticate: [' + err.code + '] ' + err.message;
      if (err.detail) {
        errMsg += ', detail(' + JSON.stringify(err.detail) + ')';
      }
      logger.error(errMsg);
      ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      ctx.body = {
        timestamp: moment().format('X'),
        errcode: err && err.code ? err.code : null,
        errmsg: err && err.message ? err.message : null
      };
    }

  },

  useJwtAuthenticate: async function(ctx, next) {
    try {
      await passport.authenticate(
        'jwt', {
          session: false
        },
        function(err, res, info, status) {
          if (err) {
            let message = 'AUTHENTICATION: [' + err.code + '] ' + err.message + ', IP(' + ctx.ip + ')';
            if (err.detail) {
              message += ', detail(' + JSON.stringify(err.detail) + ')';
            }
            logger.error(message);

            ctx.status = Constant.HTTP.UNAUTHORIZED.CODE;
            ctx.body = {
              timestamp: moment().format('X'),
              errcode: err.code,
              errmsg: err.message
            };
          }
          if (res == false) {
            logger.error('AUTHENTICATION: ' + info.toString() + ', IP(' + ctx.ip + ')');
            if (info && info.name == 'TokenExpiredError') {
              ctx.status = Constant.HTTP.UNAUTHORIZED.CODE;
              ctx.body = {
                timestamp: moment().format('X'),
                errcode: 'UNAUTHORIZED',
                errmsg: 'Token expired'
              };
            } else {
              ctx.status = Constant.HTTP.UNAUTHORIZED.CODE;
              ctx.body = {
                timestamp: moment().format('X'),
                errcode: 'UNAUTHORIZED',
                errmsg: info.toString()
              };
            }
          } else {
            ctx.params.user = res;
          }
        }
      )(ctx, next);

      if (ctx.params.user) {
        await next();
      } else {
        return;
      }
    } catch (err) {
      let errMsg = 'admin.authentication: [' + err.code + '] ' + err.message;
      if (err.detail) {
        errMsg += ', detail(' + JSON.stringify(err.detail) + ')';
      }
      logger.error(errMsg);
      ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      ctx.body = {
        timestamp: moment().format('X'),
        errcode: err && err.code ? err.code : null,
        errmsg: err && err.message ? err.message : null
      };
    }
  },

  /*
    useAccessControl: async function(ctx, next) {
      try {
        const user = ctx.params.user;
        const reqPaths = _.trim(ctx.request.url, '/')
          .split('/');
        const domain = reqPaths[0];
        const paramPaths = _.trim(ctx.params['0'], '/')
          .split('/');
        let resource = null;
        let action = null;


        switch (ctx.request.method) {
          case 'GET':
            if (ctx.params.hasOwnProperty('id')) {
              action = 'view';
              resource = _.dropRight(paramPaths).join('/');
            } else {
              action = 'list';
              resource = paramPaths.join('/');
            }
            break;
          case 'POST':
            if (ctx.params.hasOwnProperty('action')) {
              resource = _.dropRight(paramPaths).join('/');
              switch (ctx.params.action) {
                case 'create':
                case 'import':
                  action = 'create';
                  break;
                case 'update':
                case 'save':
                case 'submit':
                case 'setting':
                case 'account':
                case 'suspend':
                case 'verifypass':
                case 'modifypass':
                case 'resetpass':
                  action = 'edit';
                  break;
                case 'delete':
                case 'remove':
                case 'erase':
                case 'drop':
                  action = 'drop';
                  break;
                default:
                  break;
              }
            }
          default:
            break;
        }

        const permission = {
          domain: domain,
          resource: resource,
          action: action
        };

        let userAcl = user.acl || null;

        if (!userAcl) {
          userAcl = yield AccessHandler.initialize({
            user: user
          });

          if (redis) {
            let key = utils.md5(user.user_id + user.nonce);
            user.acl = userAcl;
            redisCache.set(key, JSON.stringify(user));
          }
        }

        if (!userAcl) {
          throw new payError.ReedpayError({
            status: 401,
            code: 'NOAUTH',
            message: '无资源访问权限(Insufficient privilege)'
          });
        }

        const hasPrivilege = yield AccessHandler.can({
          user: user,
          permission: permission,
          acl: userAcl
        });

        if (!hasPrivilege) {
          throw new payError.ReedpayError({
            status: 401,
            code: 'NOAUTH',
            message: '无资源访问权限(Insufficient privilege)'
          });
        }


        await next();
      } catch (err) {
        ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
        ctx.body = {
          timestamp: moment().format('X'),
          errcode: err && err.code ? err.code : null,
          errmsg: err && err.message ? err.message : null
        };
      }
    },
  */

};