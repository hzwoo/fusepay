/**
 * lib/services/gateway/payment.js
 */

'use strict';

const _ = require('lodash');

const GatewayRequest = require('./gateway-request');

class PaymentCreate extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.payment.create';
    this._reqSchema = [
      'app_id:string(32)',
      'mch_order_no:string(32)',
      'amount:int',
      'trade_type:string(40)',
      'description:string(256)',
      'extra:object',
      'sign_type:string(10)',
      'sign:string(1024)',
      'optional!timestamp:timestamp',
      'optional!branch_id:string(40)',
      'optional!currency:string(3)',
      'optional!detail:string(1024)',
      'optional!time_expire:datetime',
      'optional!mch_extra:object'
    ];
    this._reqExtendSchema = {
      extra: [
        'client_ip:string(16)',
        'optional!auth_token:string(256)',
        'optional!auth_code:string(128)',
        'optional!notify_url:string(256)',

        /**
         * Alipay
         */
        'optional!show_url:string(256)',
        'optional!buyer_id:string(32)',

        /**
         * Wxpay
         */
        'optional!limit_pay:string(32)',
        'optional!openid:string(128)',
        'optional!sub_openid:string(128)'
      ],
    };
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!app_id:string(32)',
      'optional!transaction_id:string(32)',
      'optional!order_no:string(32)',
      'optional!mch_order_no:string(32)',
      'optional!amount:int',
      'optional!subject:string(256)',
      'optional!trade_type:string(40)',
      'optional!currency:string(3)',
      'optional!time_created:datetime',
      'optional!time_expire:datetime',
      'optional!time_success:datetime',
      'optional!trade_status:string(40)',
      'optional!channel_trade_no:string(32)',
      'optional!credentials:object',
      'optional!extra:object',
      'optional!mch_extra:object',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {
      credentials: [
        'optional!pay_url:string(1024)',
        'optional!prepay_id:string(64)',
        'optional!appId:string(128)',
        'optional!timeStamp:string(14)',
        'optional!nonceStr:string(32)',
        'optional!package:string(1024)',
        'optional!signType:string(10)',
        'optional!partnerId:string(128)',
        'optional!prepayId:string(128)'
      ],

      extra: [
        'optional!client_ip:string(16)',
        'optional!auth_token:string(256)',
        'optional!auth_code:string(128)',
        'optional!notify_url:string(256)',

        /**
         * Alipay
         */
        'optional!show_url:string(256)',
        'optional!buyer_id:string(32)',

        /**
         * Wxpay
         */
        'optional!limit_pay:string(32)',
        'optional!openid:string(128)',
        'optional!sub_openid:string(128)'
      ]
    };
  }
}

class PaymentQuery extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.payment.query';
    this._reqSchema = [
      'transaction_id:string(32)',
      'optional!timestamp:timestamp'
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!app_id:string(32)',
      'optional!transaction_id:string(32)',
      'optional!order_no:string(32)',
      'optional!mch_order_no:string(32)',
      'optional!amount:int',
      'optional!subject:string(256)',
      'optional!trade_type:string(40)',
      'optional!currency:string(3)',
      'optional!time_created:datetime',
      'optional!time_success:datetime',
      'optional!trade_status:string(40)',
      'optional!channel_trade_no:string(32)',
      'optional!credentials:object',
      'optional!amount_refunded:int',
      'optional!refunds:array',
      'optional!extra:object',
      'optional!mch_extra:object',
      'optional!paid:boolean',
      'optional!refunded:boolean',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {
      credentials: [
        'optional!pay_url:string(1024)',
        'optional!prepay_id:string(64)',
        'optional!appId:string(128)',
        'optional!timeStamp:string(14)',
        'optional!nonceStr:string(32)',
        'optional!package:string(1024)',
        'optional!signType:string(10)',
        'optional!partnerId:string(128)',
        'optional!prepayId:string(128)'
      ],

      extra: [
        'optional!client_ip:string(16)',
        'optional!auth_token:string(256)',
        'optional!auth_code:string(128)',
        'optional!notify_url:string(256)',

        /**
         * Alipay
         */
        'optional!show_url:string(256)',
        'optional!buyer_id:string(32)',

        /**
         * Wxpay
         */
        'optional!limit_pay:string(32)',
        'optional!openid:string(128)',
        'optional!sub_openid:string(128)'
      ],

      refunds: ['refund_id:string(32)']
    };
  }
}

class PaymentList extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.payment.list';
    this._reqSchema = [
      'optional!page:int',
      'optional!page_size:int',
      'optional!app_id:string(32)',
      'optional!branch_id:string(40)',
      'optional!subject:string(100)',
      'optional!trade_type:string(40)',
      'optional!trade_status:string(40)',
      'optional!time_created:object',
      'optional!amount:object',
      'optional!timestamp:timestamp'
    ];
    this._reqExtendSchema = {
      time_created: [
        'optional!eq:datetime',
        'optional!gt:datetime',
        'optional!gte:datetime',
        'optional!lt:datetime',
        'optional!lte:datetime'
      ],

      amount: [
        'optional!eq:int',
        'optional!gt:int',
        'optional!gte:int',
        'optional!lt:int',
        'optional!lte:int'
      ]
    };
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)',
      'optional!type:string(16)',
      'optional!total:int',
      'optional!page:int',
      'optional!data:array'
    ];
    this._respExtendSchema = {
      data: [
        'app_id:string(32)',
        'transaction_id:string(32)',
        'order_no:string(32)',
        'mch_order_no:string(32)',
        'amount:int',
        'subject:string(256)',
        'trade_type:string(40)',
        'time_created:datetime',
        'trade_status:string(40)',
        'optional!paid:boolean',
        'optional!refunded:boolean',
        'optional!currency:string(3)',
        'optional!time_success:datetime',
        'optional!channel_trade_no:string(32)',
        'optional!credentials:object',
        'optional!extra:object',
        'optional!mch_extra:object',
        'optional!amount_refunded:int',
        'optional!refunds:array',
      ],

      credentials: [
        'optional!pay_url:string(1024)',
        'optional!prepay_id:string(64)',
        'optional!appId:string(128)',
        'optional!timeStamp:string(14)',
        'optional!nonceStr:string(32)',
        'optional!package:string(1024)',
        'optional!signType:string(10)',
        'optional!partnerId:string(128)',
        'optional!prepayId:string(128)'
      ],

      extra: [
        'optional!client_ip:string(16)',
        'optional!auth_token:string(256)',
        'optional!auth_code:string(128)',
        'optional!notify_url:string(256)',

        /**
         * Alipay
         */
        'optional!show_url:string(256)',
        'optional!buyer_id:string(32)',

        /**
         * Wxpay
         */
        'optional!limit_pay:string(32)',
        'optional!openid:string(128)',
        'optional!sub_openid:string(128)'
      ],

      refunds: ['refund_id:string(32)']
    };
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
    this.credentials = null;
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
          Payment.FILTER
        ));
      }
    } else {
      _.assign(this, _.pick(source, Payment.FILTER));
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
    if (typeof this.credentials == 'string') {
      this.credentials = JSON.parse(this.credentials);
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
    this.paid = (this.trade_status == Payment.TRADE_STATUS.PAID ||
      this.trade_status == Payment.TRADE_STATUS.REFUND ||
      this.trade_status == Payment.TRADE_STATUS.FINISH) ? true : false;
  }

  setRefunded() {
    this.refunded = (this.trade_status == Payment.TRADE_STATUS.REFUND ||
      this.trade_status == Payment.TRADE_STATUS.FINISH) ? true : false;
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
  new: new Payment(),
  PaymentCreate: PaymentCreate,
  PaymentQuery: PaymentQuery,
  PaymentList: PaymentList
};