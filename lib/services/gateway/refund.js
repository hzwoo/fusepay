/**
 * lib/services/gateway/refund.js
 */

'use strict';

const _ = require('lodash');

const GatewayRequest = require('./gateway-request');

class RefundCreate extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.refund.create';
    this._reqSchema = [
      'app_id:string(32)',
      'transaction_id:string(32)',
      'refund_amount:int',
      'description:string(256)',
      'optional!mch_refund_id:string(32)',
      'optional!timestamp:timestamp',
      'optional!mch_extra:object'
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!app_id:string(32)',
      'optional!transaction_id:string(32)',
      'optional!refund_id:string(32)',
      'optional!amount:int',
      'optional!refund_amount:int',
      'optional!description:string(256)',
      'optional!time_created:datetime',
      'optional!time_success:datetime',
      'optional!refund_status:string(40)',
      'optional!order_no:string(32)',
      'optional!refund_no:string(32)',
      'optional!mch_order_no:string(32)',
      'optional!mch_refund_id:string(32)',
      'optional!channel_trade_no:string(32)',
      'optional!channel_refund_id:string(32)',
      'optional!refunded:boolean',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {};
  }
}

class RefundQuery extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.refund.query';
    this._reqSchema = [
      'transaction_id:string(32)',
      'refund_id:string(32)',
      'optional!timestamp:timestamp'
    ];
    this._reqExtendSchema = {};
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!app_id:string(32)',
      'optional!transaction_id:string(32)',
      'optional!refund_id:string(32)',
      'optional!amount:int',
      'optional!refund_amount:int',
      'optional!description:string(256)',
      'optional!time_created:datetime',
      'optional!time_success:datetime',
      'optional!refund_status:string(40)',
      'optional!order_no:string(32)',
      'optional!refund_no:string(32)',
      'optional!mch_order_no:string(32)',
      'optional!mch_refund_id:string(32)',
      'optional!channel_trade_no:string(32)',
      'optional!channel_refund_id:string(32)',
      'optional!refunded:boolean',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {};
  }
}

class RefundList extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.refund.list';
    this._reqSchema = [
      'optional!page:int',
      'optional!page_size:int',
      'optional!app_id:string(32)',
      'optional!trade_type:string(40)',
      'optional!refund_status:string(40)',
      'optional!time_created:object',
      'optional!refund_amount:object',
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
        'optional!app_id:string(32)',
        'optional!transaction_id:string(32)',
        'optional!refund_id:string(32)',
        'optional!amount:int',
        'optional!refund_amount:int',
        'optional!description:string(256)',
        'optional!time_created:datetime',
        'optional!time_success:datetime',
        'optional!refund_status:string(40)',
        'optional!order_no:string(32)',
        'optional!refund_no:string(32)',
        'optional!mch_order_no:string(32)',
        'optional!mch_refund_id:string(32)',
        'optional!channel_trade_no:string(32)',
        'optional!channel_refund_id:string(32)',
        'optional!refunded:boolean',
      ]
    };
  }
}


class Refund {
  constructor() {
    this.app_id = null;
    this.transaction_id = null;
    this.refund_id = null;
    this.amount = null;
    this.refund_amount = null;
    this.trade_type = null;
    this.description = null;
    this.time_created = null;
    this.time_success = null;
    this.refund_status = null;
    this.order_no = null;
    this.refund_no = null;
    this.mch_order_no = null;
    this.mch_refund_id = null;
    this.channel_trade_no = null;
    this.channel_refund_id = null;
    this.extra = null;
    this.refunded = false;
  }

  create(refundId, refundNo) {
    this.refund_id = refundId;
    this.refund_no = refundNo;
    this.time_created = new Date();
    this.refund_status = 'PENDING';
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
          Refund.FILTER
        ));
      }
    } else {
      _.assign(this, _.pick(source, Refund.FILTER));
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
    if (this.refunded == null || typeof this.refunded == 'string') {
      this.setRefunded();
    }
    return this;
  }

  prepareToResponse() {
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
    if (_.startsWith(data.refund_id, 'rf_') == false) {
      data.refund_id = 'rf_' + data.refund_id;
    }
    return this._trim(data);
  }

  prepareToList() {
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
    if (_.startsWith(data.refund_id, 'rf_') == false) {
      data.refund_id = 'rf_' + data.refund_id;
    }
    if (data.time_created instanceof Date) {
      data.time_created = utility.formatDate(data.time_created);
    }
    if (data.time_success instanceof Date) {
      data.time_success = utility.formatDate(data.time_success);
    }
    return this._trim(data);
  }

  setRefunded() {
    this.refunded = (this.refund_status == Refund.REFUND_STATUS.REFUNDED) ? true : false;
  }

  _trim(obj) {
    return _.pickBy(_.omit(obj, Refund.OMITTED), function(item) {
      return _.isNumber(item) ||
        _.isBoolean(item) ||
        _.isDate(item) ||
        !_.isEmpty(item);
    });
  }
}

Refund.FILTER = [
  'app_id',
  'transaction_id',
  'refund_id',
  'amount',
  'refund_amount',
  'trade_type',
  'description',
  'time_created',
  'time_success',
  'refund_status',
  'order_no',
  'refund_no',
  'mch_order_no',
  'mch_refund_id',
  'channel_trade_no',
  'channel_refund_id',
  'extra',
  'refunded'
];

Refund.OMITTED = [
  'trade_type',
  'extra'
];

Refund.REFUND_STATUS = {
  PENDING: 'PENDING',
  REFUNDING: 'REFUNDING',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
};

module.exports = {
  new: new Refund(),
};