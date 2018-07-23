
CREATE TABLE IF NOT EXISTS t_transaction_order(
  id VARCHAR(32) NOT NULL,                 -- 交易ID
  order_no VARCHAR(32) NOT NULL,           -- 订单号
  batch_no VARCHAR(32),                    -- 系统订单批次号
  transaction_type VARCHAR(40) NOT NULL,   -- 交易类型, 
                                           -- "PAYMENT":收款
                                           -- "REFUND":退款
                                           -- "TRANSFER":转账/代付
                                           -- "DIRECTDEBIT":代扣
  business_type VARCHAR(40),               -- 业务类型
                                           -- TRADE - 贸易
                                           -- BUSINESS - 业务往来款（默认）
                                           -- SALARY - 员工工资
                                           -- REIMBURSE - 报销
                                           -- CONTRACT - 合作款项
                                           -- PREMIUM - 赔付保金
                                           -- OTHERS - 其他
  ref_order_no VARCHAR(32),                -- 关联订单号，退款时为原交易订单号
  app_id VARCHAR(32) NOT NULL,             -- 商户应用ID
  merchant_id BIGINT NOT NULL,             -- 商户ID
  branch_id VARCHAR(32),                   -- 商户分支机构ID
  virtual_account_id VARCHAR(32),          -- 收款虚拟户ID
  merchant_order_no VARCHAR(32) NOT NULL,  -- 商户订单号
  merchant_batch_no VARCHAR(32),           -- 商户订单批次号
  merchant_refund_id VARCHAR(32),          -- 商户退款单号
  description VARCHAR(255) NOT NULL,       -- 订单摘要
  detail VARCHAR(2048),                    -- 订单明细, JSON格式
  payment_channel VARCHAR(32) NOT NULL,    -- 支付通道
  payment_product VARCHAR(32) NOT NULL,    -- 支付产品
  payment_vendor VARCHAR(32) NOT NULL,     -- 支付产品开发商
  route_id BIGINT NOT NULL,                -- 路由ID
  channel_trade_no VARCHAR(32),            -- 渠道交易单号
  channel_refund_id VARCHAR(32),           -- 渠道退款单号
  time_created DATETIME NOT NULL,          -- 交易创建时间
  time_expire DATETIME,                    -- 交易未支付失效时间
  time_success DATETIME,                   -- 交易成功时间
  time_modified DATETIME NOT NULL,         -- 交易更新时间
  time_cleared DATETIME,                   -- 清分时间
  order_date DATE,                         -- 下单日期
  trade_status VARCHAR(40) NOT NULL,       -- 交易状态:
                                           -- "PENDING":交易未发起,
                                           -- "PAYING":用户付款中,
                                           -- "PAID":已支付,
                                           -- "CLOSED":已关闭,
                                           -- "REFUND":交易退款, 原订单部分退款时状态
                                           -- "FINISH":交易结束, 全额退款后订单结束
                                           -- "REFUNDED":退款成功(交易类型为'REFUND'时显示)
                                           -- "FAILED":退款失败(交易类型为'REFUND'时显示)
  currency VARCHAR(4) NOT NULL DEFAULT 'CNY',  -- 订单币种。"CNY":人民币,"USD":美元。见字典
  currency_amount BIGINT NOT NULL DEFAULT 0,   -- 订单外币金额。人民币时与amount值相同
  amount BIGINT NOT NULL DEFAULT 0,            -- 交易金额,单位:分,币种:人民币
  amount_refunded BIGINT NOT NULL DEFAULT 0,   -- 已退款金额,单位:分,币种:人民币
  fund_direction VARCHAR(3) NOT NULL,          -- 资金流向: IN - 收入，OUT - 支出
  remark VARCHAR(255),        -- 备注信息
  device_id VARCHAR(64),      -- 设备ID
  device_info VARCHAR(255),   -- 设备信息, JSON格式
                              -- {
                              --   type: POS|M-POS|APP|WEB|SCANNER
                              --   ip_addr: 客户端IP
                              --   user_agent: 浏览器信息
                              -- }
  credentials VARCHAR(4096),  -- 交易凭据, JSON格式, 加密
                              -- {
                              --   pay_url:
                              --   prepay_id:
                              --   appId:
                              --   timeStamp:
                              --   nonceStr:
                              --   package:
                              --   signType:
                              --   partnerId:
                              --   prepayId:
                              -- }
  order_extra VARCHAR(4096),  -- 交易附加参数, JSON格式, 加密
                              -- order_type为SALE时：
                              -- {
                              --   auth_token:
                              --   auth_code:
                              --   notify_url:
                              --   show_url:
                              --   buyer_id:
                              --   limit_pay:
                              --   openid:
                              --   sub_openid:
                              -- }
                              -- order_type为TRANSFER时:
                              -- {
                              --   pay_mode:string(16) BALANCE|EBANK|LOAN, 付款模式
                              --   payee_check: true|false, 是否校验收款人
                              --   payee_name:string(128) 收款人姓名，必填
                              --   payee_account_id:string(32) 收款人账号（银行卡号），必填
                              --   payee_account_type:string(16) 收款人账户类型，对公|私人
                              --   payee_mobile:string(16) 收款人预留手机号
                              --   bank_name:string(40) 银行名称
                              --   bank_sort_code: 支行联行号
                              --   bank_branch_name:string(100) 支行名称
                              -- }
                              -- order_type为DIRECTDEBIT时:
                              -- {
                              --   payer_auth_type:string(20) 付款人鉴权类型
                              --   payer_name:string(128) 付款人姓名
                              --   payer_mobile:string(16) 付款人预留手机号
                              --   payer_cert_no:string(18) 付款人证件号
                              --   payer_cert_type:string(40) 付款人证件类型
                              --   payer_account_id:string(32) 付款人银行账号/银行卡号
                              --   payer_account_type:string(20) 账号/卡类型 DEBIT - 借记卡, CREDIT - 贷记卡/信用卡
                              --   bank_name:string(100) 开户银行名称
                              --   bank_sort_code:string(12) 开户银行代码
                              --   bank_province:string(20) 开户银行省份
                              --   credit_card_valid_thru:string(4) 付款人信用卡有效期
                              --   credit_card_cvv:string(3) 付款人信用卡校验码
                              -- }
  merchant_extra VARCHAR(2048), -- 商户附加信息, JSON格式
  PRIMARY KEY(id),
  KEY(order_no),
  KEY(merchant_order_no)
);


CREATE TABLE IF NOT EXISTS t_transaction_clearing_detail(
  id BIGINT NOT NULL AUTO_INCREMENT,        -- 清分增流水
  order_no VARCHAR(32) NOT NULL,            -- 订单号
  trade_type VARCHAR(40) NOT NULL,          -- 交易类型
  merchant_id BIGINT NOT NULL,
  rate_id BIGINT NOT NULL,                  -- 费率规则ID
  merchant_order_no VARCHAR(32) NOT NULL,   -- 商户订单号
  channel_trade_no VARCHAR(32),             -- 渠道交易单号
  payment_channel VARCHAR(40) NOT NULL,     -- 支付渠道
  business_type VARCHAR(40),                -- 业务类型
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  fund_direction VARCHAR(3) NOT NULL,       -- 资金流向: IN - 收入，OUT - 支出
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分, 
                                            -- 收款(CREDIT/payin)净额 = amount - commission,
                                            -- 付款(DEBIT/payout)净额 = amount + commission,
                                            -- 退款(DEBIT/payout)净额 = amount
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分, 正数表示扣除，负数表示返还
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(id),
  KEY(order_no)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_transaction_clearing_summary(
  id BIGINT NOT NULL AUTO_INCREMENT,        -- 记录增流水
  merchant_id BIGINT NOT NULL,         -- 商户ID
  trade_type VARCHAR(40) NOT NULL,          -- 交易类型
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  fund_direction VARCHAR(3) NOT NULL,       -- 资金流向: IN - 收入，OUT - 支出
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分, actual_amount = amount - refund_amount - commission + refund_commission
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分, 正数
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(id)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_transaction_commission_detail(
  id BIGINT NOT NULL AUTO_INCREMENT,       -- 对应清分增流水
  order_no VARCHAR(32) NOT NULL,           -- 订单号
  trade_type VARCHAR(40) NOT NULL,         -- 交易类型
  merchant_id BIGINT NOT NULL,
  agent_id VARCHAR(28),
  channel_rate_id BIGINT NOT NULL,          -- 渠道费率ID
  merchant_rate_id BIGINT NOT NULL,         -- 商户费率ID
  agent_rate_id BIGINT,                     -- 代理商费率ID
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分,
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分
  commission_basic BIGINT NOT NULL DEFAULT 0,  -- 基本手续费（通道签约成本）,单位:分
  commission_rebate BIGINT NOT NULL DEFAULT 0, -- 手续费反佣,单位:分
  agent_rebate BIGINT NOT NULL DEFAULT 0,      -- 代理商反佣,单位:分, 正数表示扣除，负数表示返还
  net_rebate BIGINT NOT NULL DEFAULT 0,        -- 净反佣,单位:分, net_rebate = commission_rebate - agency_rebate
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(id),
  KEY(order_no)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_transaction_commission_summary(
  id BIGINT NOT NULL AUTO_INCREMENT,        -- 记录增流水
  trade_type VARCHAR(40) NOT NULL,          -- 交易类型
  merchant_id BIGINT NOT NULL,
  agent_id VARCHAR(28),
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分
  commission_basic BIGINT NOT NULL DEFAULT 0,  -- 基本手续费（通道签约成本）,单位:分, 正数表示扣除，负数表示返还
  commission_rebate BIGINT NOT NULL DEFAULT 0, -- 手续费反佣,单位:分, 正数表示扣除，负数表示返还
  agent_rebate BIGINT NOT NULL DEFAULT 0,      -- 代理商反佣,单位:分, 正数表示扣除，负数表示返还
  net_rebate BIGINT NOT NULL DEFAULT 0,        -- 净反佣,单位:分, 正数表示扣除，负数表示返还
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(id)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_transaction_rebate_bill(
  id BIGINT NOT NULL AUTO_INCREMENT,        -- 反佣账单流水
  agent_id VARCHAR(28) NOT NULL,            -- 代理商ID
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  rebate_gross BIGINT NOT NULL DEFAULT 0,   -- 基本反佣,单位:分, 正数
  rebate_deducted BIGINT NOT NULL DEFAULT 0,-- 反佣退款扣除,单位:分, 负数
  rebate_actual BIGINT NOT NULL DEFAULT 0,  -- 实际反佣,单位:分, 正数表示盈余，负数表示欠款
  adjustment BIGINT NOT NULL DEFAULT 0,     -- 人工调整金额,单位:分, 正数表示盈余，负数表示欠款
  amount BIGINT NOT NULL DEFAULT 0,         -- 账单金额,单位:分, 账单金额 = 实际反佣 + 调整金额
  is_settled TINYINT(1) NOT NULL DEFAULT 0, -- 是否已结算（打款）
  time_settled DATETIME,                    -- 结算时间
  PRIMARY KEY(id)
)AUTO_INCREMENT = 100;

