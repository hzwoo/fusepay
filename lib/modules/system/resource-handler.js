/**
 * lib/modules/system/resource-handler.js
 */

'use strict';

const _ = require('lodash');

const SqlModel = require('../../models/sql-model');
const Exception = require('../../common/exception');
const Contant = require('../../common/constant');
const Result = require('../../common/result');

const Utility = require('../../common/utils');
const utils = new Utility();

const Resource = require('./resource');

class ResourceHandler {
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
   * [retrieveResources description]
   * @param  {Object} args    [description]
   *  - domain
   * @param  {Object} options [description]
   *  - page
   *  - page_size
   * @return {Result}         [description]
   */
  async retrieveResources(args, options) {
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
        message: ResourceHandler.MESSAGE.MISSING_ARGUMENTS
      });
    }

    const resource = new Resource(this.getModel());
    const columns = [
      'id',
      'domain',
      'domain_name',
      'resource',
      'resource_name',
      'module',
      'module_name',
      'permission'
    ];
    const opts = {
      offset: Constant.DEFAULT.PAGE,
      limit: Constant.DEFAULT.PAGE_SIZE
    };

    if (options) {
      opts.offset = utils.getOffset(options.page, options.page_size);
      opts.limit = options.page_size || Constant.DEFAULT.PAGE_SIZE;
    }

    const resourceList = await resource.find(columns, {
      domain: args.domain
    }, opts);

    if (resourceList) {
      return new Result(true, resourceList);
    } else {
      return new Result(false);
    }
  }
}

ResourceHandler.MESSAGE = {
  NOT_FOUND: '未找到所请求资源(Could not find resource)',
  MISSING_ARGUMENTS: '缺少必要参数(Missing mandatory arguments)'
};

module.exports = ResourceHandler;