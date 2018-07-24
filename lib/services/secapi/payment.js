/**
 * lib/services/secapi/payment.js
 */

'use strict';

const _ = require('lodash');

const Request = require('./request');
const Response = require('./response');

class PaymentRequest extends Request {
  constructor() {
    super();
  }
}

class PaymentResponse extends Response {
  constructor() {
    super();
  }
}

class Payment {
  constructor() {
    this.transaction_id = null;
    this.app_id = null;
    this.order_no = null;
    this.mch_order_no = null;
    this.amount = null;
    this.subject = null;
    this.detail = null;
    this.trade_type = null;
    this.currency = null;
    this.channel_trade_no = null;
    this.trade_status = null;
    this.time_created = null;
    this.time_expire = null;
    this.time_success = null;
    this.amount_refunded = null;
    this.credential = null;
    this.extra = null;
    this.mch_extra = null;
    this.refunds = null;
    this.refunded = false;
    this.paid = false;
  }

  create(transId, orderNo) {
    this.transaction_id = transId;
    this.order_no = orderNo;
    this.time_created = new Date();
    this.trade_status = 'PENDING';
    this.amount_refunded = 0;
    return this;
  }

  assign(source, mapper, isExtra) {
    if (mapper) {
      if (isExtra) {
        this.extra = _.assign(this.extra || {}, _.omit(
          _.mapKeys(source, function(val, key) {
            return mapper[key];
          }), 'undefined'));
      } else {
        _.assign(this, _.pick(
          _.mapKeys(source, function(val, key) {
            return mapper[key];
          }),
          Sale.FILTER
        ));
      }
    } else {
      _.assign(this, _.pick(source, Sale.FILTER));
    }
    return this;
  }

  assignTo(destination, mapper, isExtra) {
    destination = destination || {};
    if (mapper) {
      if (isExtra) {
        _.assign(destination, _.mapKeys(_.pick(
            this.extra, Object.keys(mapper)),
          function(val, key) {
            return mapper[key];
          }));
      } else {
        _.assign(destination, _.mapKeys(_.pick(
            this, Object.keys(mapper)),
          function(val, key) {
            return mapper[key];
          }));
      }
    }
    return this;
  }

  normalize() {
    if (_.startsWith(this.app_id, 'app_')) {
      this.app_id = this.app_id.substr(4, this.app_id.length - 4);
    }
    if (this.currency) {
      this.currency = this.currency.toUpperCase();
    } else {
      this.currency = 'CNY';
    }
    if (!this.time_expire && this.time_created) {
      // 支付默认过期时间为24小时
      let expire = this.time_created.getTime() + 86400 * 1000;
      this.time_expire = new Date(expire);
    }
    if (this.trade_type) {
      this.trade_type = this.trade_type.toUpperCase();
    }
    if (typeof this.credential == 'string') {
      this.credentials = JSON.parse(this.credential);
    }
    if (typeof this.extra == 'string') {
      this.extra = JSON.parse(this.extra);
    }
    if (typeof this.mch_extra == 'string') {
      this.mch_extra = JSON.parse(this.mch_extra);
    }
    if (!this.paid || typeof this.paid == 'string') {
      this.setPaid();
    }
    if (!this.refunded || typeof this.refunded == 'string') {
      this.setRefunded();
    }
    return this;
  }

  transformToResponse() {
    if (!this.paid || typeof this.paid == 'string') {
      this.setPaid();
    }
    if (!this.refunded || typeof this.refunded == 'string') {
      this.setRefunded();
    }

    const data = _.assign({}, this);
    if (_.startsWith(data.app_id, 'app_') == false) {
      data.app_id = 'app_' + data.app_id;
    }
    if (_.startsWith(data.transaction_id, 'pay_') == false) {
      data.transaction_id = 'pay_' + data.transaction_id;
    }
    data.extra = this._trim(data.extra);
    return this._trim(data);
  }

  transformToList() {
    if (!this.paid || typeof this.paid == 'string') {
      this.setPaid();
    }
    if (!this.refunded || typeof this.refunded == 'string') {
      this.setRefunded();
    }

    const data = _.assign({}, this);
    if (_.startsWith(data.app_id, 'app_') == false) {
      data.app_id = 'app_' + data.app_id;
    }
    if (_.startsWith(data.transaction_id, 'pay_') == false) {
      data.transaction_id = 'pay_' + data.transaction_id;
    }
    if (data.time_created instanceof Date) {
      data.time_created = utility.formatDate(data.time_created);
    }
    if (data.time_expire instanceof Date) {
      data.time_expire = utility.formatDate(data.time_expire);
    }
    if (data.time_success instanceof Date) {
      data.time_success = utility.formatDate(data.time_success);
    }
    data.extra = this._trim(data.extra);
    return this._trim(data);
  }

  transformToNotification() {
    if (!this.paid || typeof this.paid == 'string') {
      this.setPaid();
    }
    if (!this.refunded || typeof this.refunded == 'string') {
      this.setRefunded();
    }

    const data = _.assign({}, this);
    if (_.startsWith(data.app_id, 'app_') == false) {
      data.app_id = 'app_' + data.app_id;
    }
    if (_.startsWith(data.transaction_id, 'pay_') == false) {
      data.transaction_id = 'pay_' + data.transaction_id;
    }
    if (data.time_created instanceof Date) {
      data.time_created = utility.formatDate(data.time_created);
    }
    if (data.time_expire instanceof Date) {
      data.time_expire = utility.formatDate(data.time_expire);
    }
    if (data.time_success instanceof Date) {
      data.time_success = utility.formatDate(data.time_success);
    }
    data.extra = this._trim(data.extra);
    return JSON.stringify(this._trim(data));
  }

  setPaid() {
    this.paid = (this.trade_status == Sale.TRADE_STATUS.PAID ||
      this.trade_status == Sale.TRADE_STATUS.REFUND ||
      this.trade_status == Sale.TRADE_STATUS.FINISH) ? true : false;
  }

  setRefunded() {
    this.refunded = (this.trade_status == Sale.TRADE_STATUS.REFUND ||
      this.trade_status == Sale.TRADE_STATUS.FINISH) ? true : false;
  }

  _trim(obj) {
    return _.pickBy(obj, function(item) {
      return _.isNumber(item) ||
        _.isBoolean(item) ||
        _.isDate(item) ||
        !_.isEmpty(item);
    });
  }
}

Payment.Fields = [
  'transaction_id',
  'app_id',
  'order_no',
  'mch_order_no',
  'amount',
  'description',
  'detail',
  'trade_type',
  'currency',
  'channel_trade_no',
  'trade_status',
  'time_created',
  'time_expire',
  'time_success',
  'amount_refunded',
  'credentials',
  'extra',
  'mch_extra',
  'refunds',
  'refunded',
  'paid'
];

module.exports = {
  Payment: Payment,
  PaymentRequest: PaymentRequest,
  PaymentResponse: PaymentResponse
};