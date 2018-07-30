/**
 * lib/modules/system/role-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Exception = require('../../common/exception');
const Contant = require('../../common/constant');
const Result = require('../../common/result');

const Utility = require('../../common/utils');
const utils = new Utility();

const Role = require('./role');
const RolePermission = require('./role-permission');

class RoleHandler {
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
   * [queryRole description]
   * @param  {Object} args    [description]
   *  - role_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async queryRole(args, options) {
    const isMandatoryArgsOk = _.chain([
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    const roleData = await role.findById(args.role_id);

    if (roleData) {
      return new Result(true, roleData);
    } else {
      return new Result(
        false,
        null,
        Constant.EXCEPTION.NOT_FOUND,
        RoleHandler.MESSAGE.NOT_FOUND
      );
    }
  }

  /**
   * [retrieveRoles description]
   * @param  {Object} args    [description]
   *  - group_id
   * @param  {Object} options [description]
   *  - page
   *  - page_size
   * @return {Result}         [description]
   */
  async retrieveRoles(args, options) {
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    const columns = [
      'id',
      'name',
      'group_id',
      'domain'
    ];
    const opts = {
      offset: Constant.DEFAULT.PAGE,
      limit: Constant.DEFAULT.PAGE_SIZE
    };

    if (options) {
      opts.offset = utils.getOffset(options.page, options.page_size);
      opts.limit = options.page_size || Constant.DEFAULT.PAGE_SIZE;
    }

    const roleList = await role.find(columns, {
      group_id: args.group_id
    }, opts);

    if (roleList) {
      return new Result(true, roleList);
    } else {
      return new Result(false);
    }
  }

  /**
   * [createRole description]
   * @param  {Object} args    [description]
   *  - name      - 必填
   *  - gourp_id  - 必填
   *  - domain    - 必填
   *  - inherited - 选填
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async createRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        // 'name',
        'group_id',
        'domain'
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    role.setFields(args);
    return await role.create();
  }

  /**
   * [modifyRole description]
   * @param  {Object} args    [description]
   *  - role_id - 必填
   *  - name      - 选填
   *  - inherited - 选填
   *  ** 需至少一个选填参数
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async modifyRole(args, options) {
    const isMandatoryArgsOk = _.chain([
        'role_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    const editableFields = [
      'name',
      'inherited'
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    role.setFields(_.pick(args, editableFields));
    role.setField('id', args.role_id);
    return await role.save(editableFields);
  }

  /**
   * [removeRole description]
   * @param  {Object} args    [description]
   *  - role_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async removeRole(args, options) {
    const isMandatoryArgsOk = _.chain([
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const role = new Role(this.getModel());
    role.setField('id', args.role_id);
    return await role.remove();
  }

  /**
   * [retrieveRolePermissions description]
   * @param  {Object} args    [description]
   *  - role_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async retrieveRolePermissions(args, options) {
    const isMandatoryArgsOk = _.chain([
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const rolePermission = new RolePermission(this.getModel());
    const columns = [
      'role_id',
      'rolename',
      'permission_id',
      'hash'
    ];

    await rolePermission.find(columns, {
      role_id: args.role_id
    });

    if (rolePermission.getList()) {
      return new Result(true, rolePermission.getList());
    } else {
      return new Result(false);
    }
  }

  /**
   * [hasRolePermission description]
   * @param  {Object}  args    [description]
   *  - role_id,
   *  - permission_id
   * @param  {Object}  options [description]
   * @return {Result}         [description]
   */
  async hasRolePermission(args, options) {
    const isMandatoryArgsOk = _.chain([
        'role_id',
        'permission_id'
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const rolePermission = new RolePermission(this.getModel());
    const rolePermissionData = await rolePermission.findById(
      args.role_id, args.permission_id);

    if (rolePermissionData) {
      return new Result(true);
    } else {
      return new Result(false);
    }
  }

  /**
   * [addRolePermission description]
   * @param  {Object}  args    [description]
   *  - role_id,
   *  - rolename,
   *  - permission_id,
   *  - hash
   * @param  {Object}  options [description]
   * @return {Result}         [description]
   */
  async addRolePermission(args, options) {
    const isMandatoryArgsOk = _.chain([
        'role_id',
        'rolename',
        'permission_id',
        'hash'
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const rolePermission = new RolePermission(this.getModel());
    rolePermission.setFields(args);
    return await rolePermission.create();
  }

  /**
   * [removeRolePermission description]
   * @param  {Object}  args    [description]
   *  - role_id,
   *  - permission_id
   * @param  {Object}  options [description]
   * @return {Result}         [description]
   */
  async removeRolePermission(args, options) {
    const isMandatoryArgsOk = _.chain([
        'role_id',
        'permission_id'
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
        message: RoleHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const rolePermission = new RolePermission(this.getModel());
    rolePermission.setFields(args);
    return await rolePermission.remove();
  }
}

RoleHandler.MESSAGE = {
  NOT_FOUND: '无匹配角色(Could not find role)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = RoleHandler;