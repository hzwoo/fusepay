/**
 * lib/modules/channel/wechatpay/micro-pay.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class MicroPay extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'pay/micropay';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'body:128',
      'out_trade_no:32',
      'total_fee:9',
      'auth_code:128',
      'optional!device_info:32',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'optional!fee_type:16',
      'optional!detail:8192',
      'optional!attach:127',
      'optional!goods_tag:32'
    ];

    this.extendParams = {
      detail: [
        'goods_detail[]'
      ],

      goods_detail: [
        'goods_id:32',
        'optional!wxpay_goods_id:32',
        'goods_name:256',
        'quantity:9',
        'price:9',
        'optional!goods_category:32',
        'optional:body:1000'
      ]
    };
  }
}

module.exports = MicroPay;