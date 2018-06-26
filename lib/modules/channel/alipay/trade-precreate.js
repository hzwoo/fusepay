/**
 * lib/modules/channel/alipay/trade-precreate.js
 */

'use strict';

const AlipayResource = require('./alipay-resource');

class TradePrecreate extends AlipayResource {
  constructor(client) {
    super(client);
    this.path = 'gateway.do';
    this.method = 'POST';
    this.parameters = [
      'app_id:32',
      'method:128',
      'optional!format:40',
      'charset:10',
      'sign_type:10',
      'sign:256',
      'timestamp:19',
      'version:3',
      'optional!notify_url:256',
      'optional!app_auth_token:40',
      'biz_content'
    ];
    this.extendParams = {
      biz_content: [
        'out_trade_no:64',
        'optional!seller_id:28',
        'total_amount:11',
        'optional!discountable_amount:11',
        'optional!undiscountable_amount:11',
        'optional!buyer_logon_id:100',
        'subject:256',
        'optional!body:128',
        'optional!goods_detail',
        'optional!operator_id:28',
        'optional!store_id:32',
        'optional!terminal_id:32',
        'optional!extend_params',
        'optional!timeout_express:6',
        'optional!royalty_info',
        'optional!sub_merchant',
        'optional!alipay_store_id:32'
      ],

      goods_detail: [
        'goods_id:32',
        'optional!alipay_goods_id:32',
        'goods_name:256',
        'quantity:10',
        'price:9',
        'optional!goods_category:24',
        'optional!body:1000',
        'optional!show_url:400'
      ],

      extend_params: [
        'optional!sys_service_provider_id:64',
        'optional!hb_fq_num:5',
        'optional!hb_fq_seller_percent:3'
      ],

      royalty_info: [
        'optional!royalty_type:150',
        'royalty_detail_infos'
      ],

      royalty_detail_infos: [
        'optional!serial_no:9',
        'optional!trans_in_type:24',
        'batch_no:32',
        'optional!out_relation_id:64',
        'trans_out_type:24',
        'trans_out:16',
        'trans_in:28',
        'amount:9',
        'optional!desc:1000',
        'optional!amount_percentage:3'
      ],

      sub_merchant: [
        'merchant_id:11'
      ]
    };
    this.commonData = {
      method: 'alipay.trade.precreate',
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA',
      version: '1.0'
    };
  }
}

module.exports = TradePrecreate;