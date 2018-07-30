/**
 * lib/modules/system/user-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Constant = require('../../common/constant');
const Exception = require('../../common/exception');
const Result = require('../../common/result');

const Utility = require('../../common/utils');
const utils = new Utility();

const User = require('./user');
const UserRole = require('./user-role');

class UserHandler {
  constructor(model) {
    this.setModel(model);
  }

  setModel(model) {
    if (model instanceof SqlModel) {
      this._model = model;
    }
  }

  getModel() {
    return this._model;
  }

  /**
   * [queryUser description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   *  - columns - 成功返回的字段
   * @return {Result}         [description]
   */
  async queryUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const columns = (options && options.columns) ?
      options.columns : null;

    const user = new User(this.getModel());
    let userData = null;
    if (options && options.fuzzy_user_id == true) {
      userData = await user.findByKey(args.user_id, columns);
    } else {
      userData = await user.findById(args.user_id, columns);
    }

    if (userData) {
      return new Result(true, _.omit(userData));
    } else {
      return new Result(
        false,
        null,
        Constant.EXCEPTION.NOT_FOUND,
        UserHandler.MESSAGE.NOT_FOUND
      );
    }
  }

  /**
   * [retrieveUsers description]
   * @param  {Object} args    [description]
   *  - group_id
   * @param  {Object} options [description]
   *  - page
   *  - page_size
   *  - columns
   * @return {Result}         [description]
   */
  async retrieveUsers(args, options) {
    const isMandatoryArgsOk = _.chain([
        'group_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    let columns = [
      'id',
      'username',
      'email',
      'mobile',
      'avatar',
      'group_id',
      'is_enabled',
      'time_created',
      'last_login',
      'status'
    ];
    const opts = {
      offset: Constant.DEFAULT.PAGE,
      limit: Constant.DEFAULT.PAGE_SIZE
    };

    if (options) {
      opts.offset = utils.getOffset(options.page, options.page_size);
      opts.limit = options.page_size || Constant.DEFAULT.PAGE_SIZE;
      if (options.columns) {
        columns = options.columns;
      }
    }

    const userList = await user.find(columns, {
      group_id: args.group_id
    }, opts);

    if (userList) {
      return new Result(true, userList);
    } else {
      return new Result(false);
    }
  }

  /**
   * [createUser description]
   * @param {Object} args    [description]
   *  - username
   *  - type
   *  - email
   *  - mobile
   *  - group_id
   *  - op_user_id
   *  - is_staff
   *  - is_email_verified
   *  - is_mobile_verified
   *  - is_enabled
   *  - wx_oauth_id
   *  - wx_username
   *  - qq_oauth_id
   *  - qq_username
   *  - ali_oauth_id
   *  - ali_username
   *  - status
   *  - remark
   * @param {Object} options [description]
   * @return {Result}         [description]
   */
  async createUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'username',
        'password',
        'type',
        'group_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    user.setFields(args);
    user.password = utils.digestPassword(args.password);
    return await user.create();
  }

  /**
   * [modifyUser description]
   * @param  {Object} args    [description]
   *  - user_id - 必填
   *  - email   - 选填
   *  - mobile  - 选填
   *  - avatar  - 选填
   *  - op_user_id - 选填
   *  - is_staff   - 选填
   *  - is_email_verified  - 选填
   *  - is_mobile_verified - 选填
   *  - is_enabled  - 选填
   *  - wx_oauth_id - 选填
   *  - wx_username - 选填
   *  - qq_oauth_id - 选填
   *  - qq_username - 选填
   *  - ali_oauth_id - 选填
   *  - ali_username - 选填
   *  - status - 选填
   *  - remark - 选填
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {Result}         [description]
   */
  async modifyUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    const editableFields = [
      'type',
      'avatar',
      'group_id',
      'op_user_id',
      'is_staff',
      'is_email_verified',
      'is_mobile_verified',
      'is_enabled',
      'wx_oauth_id',
      'wx_username',
      'qq_oauth_id',
      'qq_username',
      'ali_oauth_id',
      'ali_username',
      'last_login',
      'status',
      'remark'
    ];
    const isOptionalArgsOk = _.chain(editableFields)
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m || n;
      }, false)
      .value();

    if (!isMandatoryArgsOk || !isOptionalArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    const columns = [
      'id'
    ];

    let userData = null;
    if (options && options.fuzzy_user_id == true) {
      userData = await user.findByKey(args.user_id, columns);
    } else {
      userData = await user.findById(args.user_id, columns);
    }

    if (userData) {
      user.setFields(_.pick(args, editableFields));
      return await user.save(editableFields);
    } else {
      throw new Exception.NotFound({
        message: UserHandler.MESSAGE.NOT_FOUND
      });
    }
  }

  /**
   * [removeUser description]
   * @param  {Object} args    [description]
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async removeUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    user.setField('id', args.user_id);
    return await user.remove();
  }

  /**
   * [suspendUser description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async suspendUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    user.setField('id', args.user_id);
    return await user.deactivate();
  }

  /**
   * [unsuspendUser description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async unsuspendUser(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    user.setField('id', args.user_id);
    return await user.activate();
  }

  /**
   * [checkUserId description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {Result}         [description]
   */
  async checkUserId(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    const columns = [
      'id',
      'group_id',
      'is_enabled',
      'status'
    ];

    let userData = null;
    if (options && options.fuzzy_user_id == true) {
      userData = await user.findByKey(args.user_id, columns);
    } else {
      userData = await user.findById(args.user_id, columns);
    }

    if (userData) {
      return new Result(true, userData);
    } else {
      return new Result(false);
    }
  }

  /**
   * [resetPassword description]
   * @param  {Object} args    [description]
   *  - user_id: 
   *  - old_password
   *  - new_password
   * @param  {Object} options [description]
   *  - force - true|false，true时不校验old_password
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {Result}         [description]
   */
  async resetPassword(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'new_password'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const user = new User(this.getModel());
    const columns = [
      'id',
      'username',
      'password',
      'is_enabled',
      'status'
    ];

    let userData = null;
    if (options.fuzzy_user_id == true) {
      userData = await user.findByKey(args.user_id, columns);
    } else {
      userData = await user.findById(args.user_id, columns);
    }

    if (userData) {
      if ((options && options.force == true) ||
        utils.verifyPassword(args.old_password, user.getField('password'))) {
        user.setFields({
          password: utils.digestPassword(args.new_password)
        });
        await user.save(['password']);
        return new Result(true);
      } else {
        return new Result(false);
      }
    } else {
      throw new Exception.NotFound({
        message: UserHandler.MESSAGE.NOT_FOUND
      });
    }
  }

  /**
   * [retrieveUserRoles description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   *  - offset
   *  - limit
   * @return {Result}         [description]
   */
  async retrieveUserRoles(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const userRole = new UserRole(this.getModel());
    const columns = [
      'user_id',
      'username',
      'role_id',
      'rolename',
      'role_domain'
    ];

    await userRole.find(columns, {
      user_id: args.user_id
    });

    if (userRole.getList()) {
      return new Result(true, userRole.getList());
    } else {
      return new Result(false);
    }
  }

  /**
   * [hasUserRole description]
   * @param  {Object}  args    [description]
   *  - user_id
   *  - role_id
   * @param  {Object}  options [description]
   * @return {Result}         [description]
   */
  async hasUserRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'role_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const userRole = new UserRole(this.getModel());
    const userRoleData = await userRole.findById(
      args.user_id, args.role_id);

    if (userRoleData) {
      return new Result(true);
    } else {
      return new Result(false);
    }
  }

  /**
   * [addUserRole description]
   * @param {Object} args    [description]
   *  - user_id
   *  - username
   *  - role_id
   *  - rolename
   *  - role_domain
   * @param {Object} options [description]
   * @return {Result}         [description]
   */
  async addUserRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'username',
        'role_id',
        'rolename',
        'role_domain'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const userRole = new UserRole(this.getModel());
    userRole.setFields(args);
    return await userRole.create();
  }

  /**
   * [removeUserRole description]
   * @param  {Object} args    [description]
   *  - user_id
   *  - role_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async removeUserRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'role_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    if (!isMandatoryArgsOk) {
      throw new Exception.MissingArguments({
        message: UserHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const userRole = new UserRole(this.getModel());
    userRole.setFields(args);
    return await userRole.remove();
  }
}


UserHandler.MESSAGE = {
  NOT_FOUND: '无匹配用户(Could not find user)',
  UNAUTHORIZED: '用户名或密码错误(Incorrect username or password)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = UserHandler;