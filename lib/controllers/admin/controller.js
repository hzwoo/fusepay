/**
 * lib/controllers/admin/controller.js
 */

'use strict';

// const _ = require('lodash');
// const moment = require('moment');
// const logger = global.logger;
// const Constant = require('../../common/constant');

// const UserHandler = require('../../modules/system/user-handler');
// const userHandler = new UserHandler();


module.exports = {

  Authentication: require('./authentication')

  // checkUsername: async function(ctx, next) {
  //   try {
  //     const response = await userHandler.checkUsername(ctx.request.query.username);
  //     ctx.body = {
  //       timestamp: response.timestamp
  //     };
  //   } catch (err) {
  //     ctx.status = Constant.HTTP.UNAUTHORIZED.CODE;
  //     ctx.body = {
  //       timestamp: moment().format('X'),
  //       errcode: err.detail.errcode,
  //       errmsg: err.detail.errmsg
  //     };
  //   }
  // }

};