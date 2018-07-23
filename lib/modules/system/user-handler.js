/**
 * lib/modules/system/user-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Cosntant = require('../../common/constant');
const Exception = require('../../common/exception');
const Result = require('../../common/result');

const setup = require('../../setup');
const utils = setup.utils;

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
    const userData = await user.create();
    return new Result(true, userData);
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
        'user_id',
        'group_id'
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
      await user.save();
      return new Result(true);
    } else {
      throw new Exception.NotFound({
        message: UserHandler.MESSAGE.NOT_FOUND
      });
    }
  }


  /**
   * [checkUserId description]
   * @param  {Object} args    [description]
   *  - user_id
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {[type]}         [description]
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
      'username',
      'email',
      'mobile',
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
   * [verifyPassword 验证用户和密码, 验证成功返回true, 验证失败返回false]
   * @param  {Object} args    [description]
   *  - user_id: 可为用户id, username, email, mobile任何一个
   *  - password
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {Result}         [description]
   *  - status: true|false
   *  - data: 验证成功返回用户名和状态，验证失败返回null
   */
  async verifyPassword(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'password'
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
    if (options && options.fuzzy_user_id == true) {
      userData = await user.findByKey(args.user_id, columns);
    } else {
      userData = await user.findById(args.user_id, columns);
    }

    if (userData) {
      if (utils.verifyPassword(
          args.password, user.getField('password'))) {
        return new Result(
          true,
          _.omit(userData, ['password'])
        );
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
   * [verifyLogin 用户登录验证，成功返回用户信息，失败抛出验证异常]
   * @param  {Object} args    [description]
   *  - user_id
   *  - password
   * @param  {Object} options [description]
   *  - fuzzy_user_id - true|false, 为true时user_id可以为id|username|email|mobile, 
   *                    默认为false
   * @return {Result}         [返回用户信息]
   */
  async verifyLogin(args, options) {
    const isMandatoryArgsOk = _.chain([
        'user_id',
        'password'
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
      'type',
      'username',
      'password',
      'email',
      'mobile',
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

    if (userData && utils.verifyPassword(
        args.password, user.getField('password'))) {
      if (user.isActivated()) {
        return new Result(
          true,
          _.omit(userData, [
            'password'
          ])
        );
      } else {
        throw new Exception.Unauthorized({
          message: UserHandler.MESSAGE.UNAUTHORIZED
        });

      }
    } else {
      throw new Exception.Unauthorized({
        message: UserHandler.MESSAGE.UNAUTHORIZED
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
    await userRole.findById(args.user_id, columns);
  }
}


UserHandler.MESSAGE = {
  NOT_FOUND: '无匹配用户(Could not find user)',
  UNAUTHORIZED: '用户名或密码错误(Incorrect username or password)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = UserHandler;