/**
 * lib/module/channel/alipay/alipay-resource.js
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
const utils = require('./alipay-utils');

const DEFAULT_TIME_EXPIRE = 3600 * 1000 * 2; // two hours
const OPTIONAL_REGEX = /^optional!/;
const EITHER_REGEX = /^either!/;
const LENGTH_REGEX = /:\d+$/;
const OPTIONAL_PARAM_REGEX = /^optional!(\w[\w\_]+)(?:\:(\d+))?/;
const EITHER_PARAM_REGEX = /^either!\[(\w[\w\_\:]+(?:\|\w[\w\_\:]+)*)\]/;
const MANDATORY_PARAM_REGEX = /^(\w[\w\_]+)(?:\:(\d+))?/;
const RESPONSE_REGEX = /\"(?:[\w\_]+)\"\:(\{.+\}),\"sign\"\:\"(.+)\"/;

class AlipayResource extends ChannelResource {
  constructor(client) {
    super(client);
  }

  async request(data, cert) {
    const self = this;
    let reqData = _.assign({}, data);

    if (this.extendParams.biz_content && data.biz_content) {
      const bizContent = await this._makeBusinessContent(
        data.biz_content,
        this.extendParams.biz_content,
        this.commonData);
      reqData.biz_content = bizContent;
    }
    reqData = await this._validateRequestData(
      reqData,
      this.parameters,
      this.commonData);
    reqData.sign = utils.sign(reqData, this.client.getPrivateKey());

    const serializedData = this._serializeRequest(reqData);

    const url = this.client.getHost() + '/' + this.path;

    let responseType = 'JSON';
    if (reqData && reqData.method) {
      responseType = this._getResponseType(reqData.method);
    }

    const reqAgent = superagent.post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
      .send(serializedData)
      .redirects(0);

    let response = null;
    await reqAgent
      .then(function(res) {
        let raw = self._handleResponse(res);
        response = self._transformResponse(raw);
      })
      .catch(function(err) {
        if (responseType == 'REDIRECT') {
          let raw = self._handleRedirectResponse(err.response);
          response = self._transformRedirectResponse(raw);
        } else {
          self._handleException(err);
        }
      });

    return response;
  }

  async _validateRequestData(data, parameters, commonData) {
    const reqData = {};

    for (let i = 0; i < parameters.length; ++i) {
      let param = parameters[i];
      let isOptional = OPTIONAL_REGEX.test(param);
      let isEither = EITHER_REGEX.test(param);
      let isExtendParam = !LENGTH_REGEX.test(param);
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
        let maxLength = isExtendParam ? null : parseInt(m[2]);

        if (commonData.hasOwnProperty(paramName)) {
          reqData[paramName] = isExtendParam ? JSON.stringify(commonData[paramName]) :
            commonData[paramName];
        } else if (data.hasOwnProperty(paramName)) {
          reqData[paramName] = isExtendParam ? JSON.stringify(data[paramName]) :
            data[paramName];
        } else if (paramName.search(/timestamp/i) == 0) {
          reqData[paramName] = data[paramName] || utils.getCurrentTimestamp();
        } else if (paramName != 'sign' && !isOptional &&
          !commonData.hasOwnProperty(paramName) &&
          !data.hasOwnProperty(paramName)) {
          throw new FusepayError.BadChannelRequestError({
            message: 'Alipay: Missing mandatory parameter "' + paramName + '"'
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
            message: 'Alipay: Missing either-or parameter "' + paramName + '"'
          });
        }
      } else {
        throw new FusepayError.BadChannelRequestError({
          message: 'Alipay: Invalid specification "' + param + '"'
        });
      }

    }
    return reqData;
  }

  async _makeBusinessContent(data, extendParams, commonData) {
    const bizContent = {};

    for (let i = 0; i < extendParams.length; ++i) {
      let param = extendParams[i];
      let isOptional = OPTIONAL_REGEX.test(param);
      let isEither = EITHER_REGEX.test(param);
      let isExtendParam = !LENGTH_REGEX.test(param);
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
        let maxLength = isExtendParam ? null : parseInt(m[2]);

        if (commonData.hasOwnProperty(paramName)) {
          bizContent[paramName] = commonData[paramName];
        } else if (data.hasOwnProperty(paramName)) {
          if (paramName.search(/\_amount/i) > 0) {
            bizContent[paramName] = utils.centToYuan(data[paramName]);
          } else {
            bizContent[paramName] = data[paramName];
          }
        } else if (!isOptional &&
          !commonData.hasOwnProperty(paramName) &&
          !data.hasOwnProperty(paramName)) {
          throw new FusepayError.BadChannelRequestError({
            message: 'Alipay: Missing mandatory parameter "' + paramName + '"'
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
              bizContent[paramName] = data[paramName];
              isAssigned = true;
            }
          }
        }
        if (isAssigned == false) {
          throw new FusepayError.BadChannelRequestError({
            message: 'Alipay: Missing either-or parameter "' + paramName + '"'
          });
        }
      } else {
        throw new FusepayError.BadChannelRequestError({
          message: 'Alipay: Invalid specification "' + param + '"'
        });
      }

    }
    return bizContent;
  }

  _serializeRequest(data) {
    return utils.stringifyRequestData(data || {})
  }

  _handleResponse(response) {
    try {
      const m = response.text.match(RESPONSE_REGEX);
      if (m && m.length == 3) {
        // 验签
        const isVerified = utils.verifySign(m[1], m[2], this.client.getPublicKey());

        if (isVerified) {
          let resBody = JSON.parse(response.text);
          const key = _.findKey(resBody, function(obj, key) {
            return /\_response/.test(key);
          });

          if (resBody[key].code != this.client.getConstant('SUCCESS')) {
            if (key == 'alipay_system_oauth_token_response') {
              return resBody[key];
            } else {
              throw new FusepayError.ChannelApiError({
                code: resBody[key].code + ': ' + resBody[key].sub_code,
                message: resBody[key].msg + ': ' + resBody[key].sub_msg,
                response: resBody,
              });
            }
          } else {
            return resBody[key];
          }
        } else {
          throw new FusepayError.ChannelApiError({
            message: 'Alipay: Invalid JSON received, sign could not be verified',
            response: response.text,
          });
        }
      } else {
        let resBody = JSON.parse(response.text);
        const key = _.findKey(resBody, function(obj, key) {
          return /\_response/.test(key);
        });
        if (resBody[key]) {
          throw new FusepayError.ChannelApiError({
            code: resBody[key].code + ': ' + resBody[key].sub_code,
            message: resBody[key].msg + ': ' + resBody[key].sub_msg,
            response: resBody,
          });
        } else {
          throw new FusepayError.ChannelApiError({
            message: 'Alipay: ' + response.text,
            response: response.text,
          });
        }
      }
    } catch (err) {
      throw new FusepayError.ChannelApiError({
        code: err.code,
        message: err.message,
        response: response.text,
        exception: err
      });
    }
  }

  _handleRedirectResponse(response) {
    try {
      // response = iconv.decode(Buffer.concat(chunks), 'gb2312');
      // console.log('res header: ', response.headers);
      const redirect_uri = response.headers.location || null;
      // console.log('redirect: ', redirect_uri);
      if (redirect_uri) {
        return {
          code: this.client.getConstant('SUCCESS'),
          msg: 'Success',
          pay_url: redirect_uri
        };
      } else {
        throw new FusepayError.ChannelApiError({
          message: 'Alipay: Invalid response received from Alipay API',
          response: response.headers,
        });
      }
      // return response;
    } catch (err) {
      throw new FusepayError.ChannelApiError({
        code: err.code,
        message: err.message,
        response: response.headers,
        exception: err
      });
    }
  }

  _getResponseType(method) {
    switch (method) {
      case 'alipay.trade.page.pay':
      case 'alipay.trade.wap.pay':
        return 'REDIRECT';
      default:
        return 'JSON';
    }
  }

  _handleException(error) {
    console.log(error);
  }

  _transformResponse(res) {
    return res;
  }

  _transformRedirectResponse(res) {
    return res;
  }
}

module.exports = AlipayResource;