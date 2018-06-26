/**
 * lib/module/channel/wechantpay/wechatpay-resource.js
 */

'use strict';

const _ = require('lodash');
const superagent = require('superagent');
// const path = require('path');
const moment = require('moment');
const xmlify = require('xmlify');
const xmlparser = require('xml2json');

const FusepayError = require('../../../common/error');
const ChannelResource = require('../channel-resource');
const utils = require('./wechatpay-utils');

const DEFAULT_TIME_EXPIRE = 3600 * 1000 * 2; // two hours
const OPTIONAL_REGEX = /^optional!/;
const EITHER_REGEX = /^either!/;
const LENGTH_REGEX = /:\d+$/;
const OPTIONAL_PARAM_REGEX = /^optional!(\w[\w\_]+)(?:\:(\d+))?/;
const EITHER_PARAM_REGEX = /^either!\[(\w[\w\_\:]+(?:\|\w[\w\_\:]+)*)\]/;
const MANDATORY_PARAM_REGEX = /^(\w[\w\_]+)(?:\:(\d+))?/;

class WechatPayResource extends ChannelResource {
  constructor(client) {
    super(client);
  }

  async request(data, cert) {
    const self = this;
    const reqData = await this._validateRequestData(data, this.parameters, this.commonData);
    reqData.sign = utils.sign(reqData, this.client.getSecureKey());

    const serializedData = this._serializeRequest(reqData);
    // console.log('serializedData: ', serializedData);

    const url = this.client.getHost() + '/' + this.path;

    const reqAgent = superagent.post(url)
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(serializedData);

    let response = null;
    await reqAgent
      .then(function(res) {
        const raw = self._handleResponse(res);
        response = self._transformResponse(raw);
      })
      .catch(function(err) {
        self._handleException(err);
      });

    return response;
  }

  async _validateRequestData(data, parameters, commonData) {
    const reqData = {};

    for (let i = 0; i < parameters.length; ++i) {
      let param = parameters[i];
      let isOptional = OPTIONAL_REGEX.test(param);
      let isEither = EITHER_REGEX.test(param);
      let isExtraParam = !LENGTH_REGEX.test(param);
      let m;

      if (isOptional) {
        m = param.match(OPTIONAL_PARAM_REGEX);
      } else if (isEither) {
        m = param.match(EITHER_PARAM_REGEX);
      } else {
        m = param.match(MANDATORY_PARAM_REGEX);
      }

      if (m && isEither == false) {
        let paramName = m[1];
        let maxLength = isExtraParam ? null : parseInt(m[2]);

        if (commonData.hasOwnProperty(paramName)) {
          reqData[paramName] = isExtraParam ? JSON.stringify(commonData[paramName]) :
            commonData[paramName];
        } else if (paramName.search(/time\_/i) == 0) {
          switch (paramName) {
            case 'time_start':
              reqData[paramName] = data[paramName] || utils.getCurrentTimestamp();
              break;
            case 'time_expire':
              reqData[paramName] = data[paramName] || utils.getFutureTimestamp(DEFAULT_TIME_EXPIRE);
              break;
          }
        } else if (paramName.search(/nonce\_str/i) == 0) {
          reqData[paramName] = data[paramName] || utils.generateRandomString();
        } else if (data.hasOwnProperty(paramName)) {
          reqData[paramName] = isExtraParam ? JSON.stringify(data[paramName]) :
            data[paramName];
        } else if (paramName != 'sign' && !isOptional &&
          !commonData.hasOwnProperty(paramName) &&
          !data.hasOwnProperty(paramName)) {
          throw new FusepayError.BadChannelRequestError({
            message: 'WechatPay: Missing mandatory parameter "' + paramName + '"'
          });
        }
      } else if (m && isEither) {
        let isAssigned = false;
        let paramName = null;
        let pars = m[1].split('|');
        for (let i = 0; i < pars.length; ++i) {
          let subm = pars[i].match(MANDATORY_PARAM_REGEX);
          if (subm) {
            paramName = subm[1];
            let maxLength = subm[2] ? parseInt(subm[2]) : 0;
            if (data[paramName]) {
              reqData[paramName] = data[paramName];
              isAssigned = true;
            }
          }
        }
        if (isAssigned == false) {
          throw new FusepayError.BadChannelRequestError({
            message: 'WechatPay: Missing either-or parameter "' + paramName + '"'
          });
        }
      } else {
        throw new FusepayError.BadChannelRequestError({
          message: 'WechatPay: Invalid specification "' + param + '"'
        });
      }
    }
    return reqData;
  }

  _serializeRequest(data) {
    let requestData = (this.method == 'POST') ? xmlify(data, 'xml', {
        xmlDeclaration: false
      }) :
      utils.stringifyRequestData(data || {});
    return requestData;
  }

  _handleResponse(response) {
    try {
      const res = JSON.parse(xmlparser.toJson(response.text)).xml;
      if (res.return_code == 'SUCCESS') {
        if (res.result_code == 'SUCCESS') {
          const isVerified = utils.verifySign(
            res,
            res.sign,
            this.client.getSecureKey());

          if (isVerified) {
            return res;
          } else {
            throw new FusepayError.ChannelApiError({
              message: 'Sign could not be verified'
            });
          }
        } else {
          throw new FusepayError.ChannelApiError({
            code: res.err_code,
            message: res.err_code_des
          });
        }
      } else {
        throw new FusepayError.ChannelApiError({
          message: res.return_msg
        });
      }

    } catch (err) {
      throw new FusepayError.ChannelApiError({
        message: err.message || 'Invalid XML received from WechatPay API'
      });
    }
  }

  _handleException(error) {
    console.log(error);
  }

  _transformResponse(res) {
    return res;
  }
}

module.exports = WechatPayResource;