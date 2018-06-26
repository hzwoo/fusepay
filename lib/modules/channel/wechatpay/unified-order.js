/**
 * lib/modules/channel/wechatpay/unified-order.js
 */

'use strict';

const WechatPayResource = require('./wechatpay-resource');

class UnifiedOrder extends WechatPayResource {
  constructor(client) {
    super(client);
    this.path = 'pay/unifiedorder';
    this.method = 'POST';
    this.parameters = [
      'appid:32',
      'mch_id:32',
      'sign:32',
      'nonce_str:32',
      'body:128',
      'out_trade_no:32',
      'total_fee:9',
      'spbill_create_ip:16',
      'notify_url:256',
      'trade_type:16',
      'optional!sub_appid:32',
      'optional!sub_mch_id:32',
      'optional!device_info:32',
      'optional!detail:8192',
      'optional!attach:127',
      'optional!fee_type:16',
      'optional!time_start:14',
      'optional!time_expire:14',
      'optional!goods_tag:32',
      'optional!product_id:32',
      'optional!limit_pay:32',
      'optional!openid:128',
      'optional!sub_openid:128',
      'optional!scene_info:256'
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

module.exports = UnifiedOrder;