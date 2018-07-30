/**
 * lib/services/gateway/transfer.js
 */

'use strict';

const _ = require('lodash');

const GatewayRequest = require('./gateway-request');

class TransferCreate extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.transfer.create';
    this._reqSchema = [
      'optional!timestamp:timestamp',
      'sign_type:string(10)',
      'sign:string(1024)',
      'app_id:string(32)',
      'either![mch_order_no:string(32)|mch_batch_no:string(32)]',
      'description:string(128)',
      'amount:int',
      'trade_type:string(40)', // B2C_WXPAY - 微信支付B2C企业转账, 
      // B2C_TXPAY - 天下支付B2C单笔代付 
      // B2C_TXPAY_BATCH - 天下支付B2C批量代付
      'optional!pay_mode:string(40)', // BALANCE - 余额支付（默认）, EBANK - 企业网银, LOAN - 垫资支付
      'optional!payee_check:boolean', // false - 不校验收款人（默认）, true - 强校验收款人
      'optional!currency:string(3)',
      'optional!business_type:string(16)', // BUSINESS - 业务往来款（默认）, SALARY - 员工工资, REIMBURSE - 报销
      // CONTRACT - 合作款项, PREMIUM - 赔付保金, OTHERS - 其他

      'extra:object',
      'optional!batch_count:int',
      'optional!batch:array'
    ];
    this._reqExtendSchema = {
      extra: [
        'client_ip:string(16)',
        'optional!payee_name:string(128)', // 收款人姓名
        'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ],

      batch: [
        'sub_amount:int',
        'sub_order_no:string(32)',
        'payee_name:string(128)', // 收款人姓名
        'payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ]
    };
    this._respSchema = [
      'result_code:string(40)',
      'timestamp:timestamp',
      'optional!app_id:string(32)',
      'optional!transaction_id:string(32)',
      'optional!order_no:string(32)',
      'optional!batch_no:string(32)',
      'optional!mch_order_no:string(32)',
      'optional!mch_batch_no:string(32)',
      'optional!amount:int',
      'optional!description:string(128)',
      'optional!trade_type:string(40)',
      'optional!pay_mode:string(40)',
      'optional!payee_check:boolean',
      'optional!currency:string(3)',
      'optional!business_type:string(16)',
      'optional!time_created:datetime',
      'optional!time_success:datetime',
      'optional!trade_status:string(40)',
      'optional!channel_trade_no:string(64)',
      'optional!extra:object',
      'optional!batch_count:int',
      'optional!batch:array',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {
      extra: [
        'client_ip:string(16)',

        'optional!payee_name:string(128)', // 收款人姓名
        'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ],

      batch: [
        'sub_amount:int',
        'sub_order_no::string(32)',
        'payee_name:string(128)', // 收款人姓名
        'payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ]
    };
  }
}

class TransferQuery extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.transfer.query';
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
      'optional!description:string(128)',
      'optional!trade_type:string(40)',
      'optional!pay_mode:string(40)',
      'optional!payee_check:boolean',
      'optional!currency:string(3)',
      'optional!business_type:string(16)',
      'optional!time_created:datetime',
      'optional!time_success:datetime',
      'optional!trade_status:string(40)',
      'optional!channel_trade_no:string(64)',
      'optional!extra:object',
      'optional!err_code:string(40)',
      'optional!err_msg:string(256)'
    ];
    this._respExtendSchema = {
      extra: [
        'client_ip:string(16)',

        'optional!payee_name:string(128)', // 收款人姓名
        'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ]
    };
  }
}

class TransferList extends GatewayRequest {
  constructor(header, payload, extra) {
    super(header, payload, extra);
    this._service = 'gateway.transfer.list';
    this._reqSchema = [
      'optional!page:int',
      'optional!page_size:int',
      'optional!app_id:string(32)',
      'optional!trade_type:string(40)',
      'optional!trade_status:string(40)',
      'optional!mch_batch_no:string(32)',
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
        'optional!app_id:string(32)',
        'optional!transaction_id:string(32)',
        'optional!order_no:string(32)',
        'optional!batch_no:string(32)',
        'optional!mch_order_no:string(32)',
        'optional!mch_batch_no:string(32)',
        'optional!amount:int',
        'optional!description:string(128)',
        'optional!trade_type:string(40)',
        'optional!pay_mode:string(40)',
        'optional!payee_check:boolean',
        'optional!currency:string(3)',
        'optional!business_type:string(16)',
        'optional!time_created:datetime',
        'optional!time_success:datetime',
        'optional!trade_status:string(40)',
        'optional!channel_trade_no:string(64)',
        'optional!extra:object',
        'optional!batch_count:int',
        'optional!batch:array',
      ],

      extra: [
        'client_ip:string(16)',

        'optional!payee_name:string(128)', // 收款人姓名
        'optional!payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ],

      batch: [
        'sub_amount:int',
        'sub_order_no::string(32)',
        'payee_name:string(128)', // 收款人姓名
        'payee_account_id:string(128)', // 收款人平台账号/银行账号
        'optional!payee_mobile:string(16)',
        'optional!payee_account_type:string(16)', // DEBIT - 借记卡, CREDIT - 贷记卡/信用卡, BUSINESS - 对公账号
        'optional!bank_name:string(40)',
        'optional!bank_branch_code:string(12)',
        'optional!bank_branch_name:string(100)',
        'optional!remark:string(100)'
      ]
    };
  }
}

class Transfer {
  constructor() {
    this.transaction_id = null;
    this.app_id = null;
    this.order_no = null;
    this.batch_no = null;
    this.mch_order_no = null;
    this.mch_batch_no = null;
    this.amount = null;
    this.description = null;
    this.trade_type = null;
    this.channel = null;
    this.pay_mode = null;
    this.payee_check = null;
    this.currency = null;
    this.business_type = null;
    this.trade_status = null;
    this.channel_trade_no = null;
    this.time_created = null;
    this.time_success = null;
    this.extra = null;
    this.batch_count = null;
    this.batch = null;
  }

  create(transId, orderNo) {
    this.transaction_id = transId;
    this.order_no = orderNo;
    this.time_created = new Date();
    this.time_modified = this.time_created;
    this.trade_status = 'PENDING';
    this.business_type = 'BUSINESS';
    this.pay_mode = 'BALANCE';
    this.payee_check = false;
    this.batch_count = 0;
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
          Transfer.FILTER
        ));
      }
    } else {
      _.assign(this, _.pick(source, Transfer.FILTER));
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
    if (this.trade_type) {
      this.trade_type = this.trade_type.toUpperCase();
    }
    if (typeof this.extra == 'string') {
      this.extra = JSON.parse(this.extra);
    }
    if (typeof this.batch == 'string') {
      this.batch = JSON.parse(this.batch);
    }
    return this;
  }

  prepareToResponse() {
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

  prepareToList() {
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
    if (data.time_success instanceof Date) {
      data.time_success = utility.formatDate(data.time_success);
    }
    data.extra = this._trim(data.extra);
    return this._trim(data);
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

Transfer.FILTER = [
  'transaction_id',
  'app_id',
  'order_no',
  'batch_no',
  'mch_order_no',
  'mch_batch_no',
  'amount',
  'description',
  'trade_type',
  'channel',
  'pay_mode',
  'payee_check',
  'currency',
  'business_type',
  'trade_status',
  'channel_trade_no',
  'time_created',
  'time_success',
  'extra',
  'batch_count',
  'batch'
];

Transfer.TRADE_STATUS = {
  PENDING: 'PENDING',
  PAYING: 'PAYING',
  PAID: 'PAID',
  FAILED: 'FAILED'
};

Transfer.OMIT_FROM_EXTRA_TO_STORE = [
  'payee_name',
  'payee_account_id',
  'payee_account_type',
  'payee_mobile',
  'bank_name',
  'bank_branch_code',
  'bank_branch_name',
  'remark'
];

module.exports = {
  new: new Transfer(),
  TransferCreate: TransferCreate,
  TransferQuery: TransferQuery,
  TransferList: TransferList
};