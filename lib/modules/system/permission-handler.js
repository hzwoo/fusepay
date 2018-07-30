/**
 * lib/modules/system/permission-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Exception = require('../../common/exception');
const Contant = require('../../common/constant');
const Result = require('../../common/result');

const Utility = require('../../common/utils');
const utils = new Utility();

const Permission = require('./permission');

class PermissionHandler {
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
   * [retrievePermissions description]
   * @param  {Object} args    [description]
   *  - domain
   * @param  {Object} options [description]
   *  - page
   *  - page_size
   * @return {Result}         [description]
   */
  async retrievePermissions(args, options) {
    const isMandatoryArgsOk = _.chain([
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
        message: PermissionHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const permission = new Permission(this.getModel());
    const columns = [
      'id',
      'domain_name',
      'resource_name',
      'resource',
      'action',
      'module_name',
      'enabled'
    ];
    const opts = {
      offset: Constant.DEFAULT.PAGE,
      limit: Constant.DEFAULT.PAGE_SIZE
    };

    if (options) {
      opts.offset = utils.getOffset(options.page, options.page_size);
      opts.limit = options.page_size || Constant.DEFAULT.PAGE_SIZE;
    }

    const permissionList = await permission.find(columns, {
      domain: args.domain
    }, opts);

    if (permissionList) {
      return new Result(true, permissionList);
    } else {
      return new Result(false);
    }
  }


  /**
   * [createPermission description]
   * @param  {Object} args    [description]
   *  - domain
   *  - domain_name
   *  - resource_id
   *  - resource_name
   *  - resource
   *  - action
   *  - context
   *  - module
   *  - module_name
   *  - hash
   *  - enabled
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async createPermission(args, options) {
    const isMandatoryArgsOk = _.chain([
        'domain',
        'domain_name',
        'resource_id',
        'resource_name',
        'resource',
        'action',
        'context',
        'module',
        'module_name',
        'hash',
        'enabled'
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
        message: PermissionHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const permission = new Permission(this.getModel());
    permission.setFields(args);
    return await permission.create();
  }

  /**
   * [modifyPermission description]
   * @param  {Object} args    [description]
   *  - permission_id
   *  - enabled
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async modifyPermission(args, options) {
    const isMandatoryArgsOk = _.chain([
        'permission_id'
      ])
      .map(function(item) {
        return _.has(args, item);
      })
      .reduce(function(m, n) {
        return m && n
      }, true)
      .value();

    const editableFields = [
      'enabled'
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
        message: PermissionHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const permission = new Permission(this.getModel());
    permission.setFields(_.pick(args, editableFields));
    permission.setField('id', args.permission_id);
    return await permission.save(editableFields);
  }

  /**
   * [removePermission description]
   * @param  {Object} args    [description]
   *  - permission_id
   * @param  {Object} options [description]
   * @return {Result}         [description]
   */
  async removePermission(args, options) {
    const isMandatoryArgsOk = _.chain([
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
        message: PermissionHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const permission = new Permission(this.getModel());
    permission.setField('id', args.permission_id);
    return await permission.remove();
  }
}

PermissionHandler.MESSAGE = {
  NOT_FOUND: '未找到所请求权限(Could not find permission)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = PermissionHandler;