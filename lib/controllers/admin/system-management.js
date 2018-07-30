/**
 * lib/controllers/admin/system-management.js
 */

const _ = require('lodash');

const logger = global.logger;

const Constant = require('../../common/constant');
const Exception = require('../../common/exception');
const Result = require('../../common/result');

const setup = require('../../../lib/setup');
const utils = setup.utils;

const SqlModel = require('../../models/sql-model');
const sqlModel = new SqlModel(setup.mysql);

const AdminRequest = require('../../services/admin/admin-request');
const Request = require('../../services/admin/system-management');

const UserHandler = require('../../modules/system/user-handler');
const RoleHandler = require('../../modules/system/role-handler');
const PermissionHandler = require('../../modules/system/permission-handler');


module.exports = {

  checkUserNameConflict: async function(ctx, next) {
    let request = new Request.CheckUserNameConflict(
      ctx.header, ctx.request.query);
    try {
      request.verify();

      const userHandler = new UserHandler(sqlModel);
      const result = await userHandler.checkUserId({
        user_id: request.getPayload().username
      }, {
        fuzzy_user_id: true
      });

      if (result.status) {
        ctx.body = request.makeResponseBody(null, {
          conflict: true
        });
      } else {
        ctx.body = request.makeResponseBody(null, {
          conflict: false
        });
      }

    } catch (err) {
      // console.log(err);
      logger.error(err.message);
      if (err.type) {
        ctx.status = Constant.HTTP[err.type].CODE;
      } else {
        ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      }
      const body = request.makeResponseBody(err);
      ctx.body = body;
    }
  },

  checkEmailConflict: async function(ctx, next) {
    let request = new Request.CheckEmailConflict(
      ctx.header, ctx.request.query);
    try {
      request.verify();

      const userHandler = new UserHandler(sqlModel);
      const result = await userHandler.checkUserId({
        user_id: request.getPayload().email
      }, {
        fuzzy_user_id: true
      });

      if (result.status) {
        ctx.body = request.makeResponseBody(null, {
          conflict: true
        });
      } else {
        ctx.body = request.makeResponseBody(null, {
          conflict: false
        });
      }

    } catch (err) {
      // console.log(err);
      logger.error(err.message);
      if (err.type) {
        ctx.status = Constant.HTTP[err.type].CODE;
      } else {
        ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      }
      const body = request.makeResponseBody(err);
      ctx.body = body;
    }
  },

  checkMobileConflict: async function(ctx, next) {
    let request = new Request.CheckMobileConflict(
      ctx.header, ctx.request.query);
    try {
      request.verify();

      const userHandler = new UserHandler(sqlModel);
      const result = await userHandler.checkUserId({
        user_id: request.getPayload().mobile
      }, {
        fuzzy_user_id: true
      });

      if (result.status) {
        ctx.body = request.makeResponseBody(null, {
          conflict: true
        });
      } else {
        ctx.body = request.makeResponseBody(null, {
          conflict: false
        });
      }

    } catch (err) {
      // console.log(err);
      logger.error(err.message);
      if (err.type) {
        ctx.status = Constant.HTTP[err.type].CODE;
      } else {
        ctx.status = Constant.HTTP.INTERNAL_SERVER_ERROR.CODE;
      }
      const body = request.makeResponseBody(err);
      ctx.body = body;
    }
  },

  listUsers: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryUser: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  postUser: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryUserPermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listRoles: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryRole: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  postRole: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listPermissions: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryPermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  postPermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listRolePermissions: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryPermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  postPermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listRolePermissions: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  queryRolePermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  postRolePermission: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listResources: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  getResource: async function(ctx, next) {
    try {

    } catch (err) {

    }
  },

  listResourceTypes: async function(ctx, next) {
    try {

    } catch (err) {

    }
  }
};