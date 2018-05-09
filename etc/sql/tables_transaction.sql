
CREATE TABLE IF NOT EXISTS t_transaction_payment(
  id VARCHAR(32) NOT NULL,                 -- 交易ID
  order_no VARCHAR(32) NOT NULL,           -- 订单号
  type VARCHAR(40) NOT NULL,               -- 交易类型, 
                                           -- "SALE":消费
                                           -- "REFUND":退款
  ref_order_no VARCHAR(32),                -- 关联订单号，退款时为原交易订单号
  app_id VARCHAR(32) NOT NULL,             -- 商户应用ID
  merchant_id VARCHAR(28) NOT NULL,        -- 商户ID
  branch_id VARCHAR(32),                   -- 商户分支机构ID
  virtual_account_id VARCHAR(32),          -- 收款虚拟户ID
  merchant_order_no VARCHAR(32) NOT NULL,  -- 商户订单号
  merchant_refund_id VARCHAR(32),          -- 商户退款单号
  subject VARCHAR(255) NOT NULL,           -- 商品名称
  detail VARCHAR(2048),                    -- 商品明细
  payment_channel VARCHAR(40) NOT NULL,    -- 支付渠道
  payment_method VARCHAR(40) NOT NULL,     -- 付款方式
  payment_product VARCHAR(40) NOT NULL,    -- 支付产品
  route_id VARCHAR(32) NOT NULL,           -- 路由ID
  channel_trade_no VARCHAR(32),            -- 渠道交易单号
  channel_refund_id VARCHAR(32),           -- 渠道退款单号
  time_created DATETIME NOT NULL,          -- 交易创建时间
  time_expire DATETIME,                    -- 交易未支付失效时间
  time_success DATETIME,                   -- 交易成功时间
  time_modified DATETIME NOT NULL,         -- 交易更新时间
  order_date DATE,                         -- 下单日期
  order_state VARCHAR(40) NOT NULL,        -- 订单状态:
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
  terminal_type VARCHAR(40),  -- 终端类型
                              -- "POS":POS,
                              -- "M-POS":M-POS,
                              -- "VI-POS":VI-POS,
                              -- "APP":APP客户端,
                              -- "WEB":浏览器,
  terminal_id VARCHAR(64),    -- 终端ID,pos_id或m-pos_id
  device_info VARCHAR(255),   -- 设备信息,如果支付中能取到此值则有效
  pos_batch_no VARCHAR(20),   -- POS机批次号
  pos_trace_no VARCHAR(60),   -- POS机跟踪号，从批次号递增的。批次号是签入时获得的，撤销交易时要用到
  time_cleared DATETIME,      -- 清算时间
  workflow_id BIGINT NOT NULL DEFAULT 0, -- 审核单ID，非0表示正在审核中。审核结束时要继续驱动订单完成支付。
  remark VARCHAR(255),          -- 备注信息
  credential VARCHAR(4096),     -- 交易凭据JSON
  extra VARCHAR(4096),          -- 附加参数JSON
  device_extra VARCHAR(4096),   -- 附加设备信息JSON
  merchant_extra VARCHAR(4096), -- 商户附加信息JSON
  PRIMARY KEY(id),
  KEY(order_no),
  KEY(merchant_order_no)
);

CREATE TABLE IF NOT EXISTS t_transaction_transfer(
  id VARCHAR(32) NOT NULL,                 -- 交易ID
  type VARCHAR(40) NOT NULL,               -- 交易类型, 
                                           -- "TRANSFER":转账代付, 
                                           -- "REDPACK":红包,
  order_no VARCHAR(32) NOT NULL,           -- 系统订单号
  batch_no VARCHAR(32),                    -- 系统订单批次号
  app_id VARCHAR(32) NOT NULL,             -- 商户应用ID
  merchant_id VARCHAR(28) NOT NULL,        -- 商户ID
  virtual_account_id VARCHAR(32),          -- 虚拟户ID
  merchant_order_no VARCHAR(32) NOT NULL,  -- 商户订单号
  merchant_batch_no VARCHAR(32),           -- 商户订单批次号
  amount BIGINT NOT NULL DEFAULT 0,        -- 交易金额,单位:分
  description VARCHAR(128) NOT NULL,       -- 交易摘要
  currency VARCHAR(4) NOT NULL DEFAULT 'CNY',  -- 订单币种。"CNY":人民币,"USD":美元。见字典
  currency_amount BIGINT NOT NULL DEFAULT 0,   -- 订单外币金额。人民币时与amount值相同
  business_type VARCHAR(40) NOT NULL,      -- 业务类型
                                           -- BUSINESS - 业务往来款（默认）
                                           -- SALARY - 员工工资
                                           -- REIMBURSE - 报销
                                           -- CONTRACT - 合作款项
                                           -- PREMIUM - 赔付保金
                                           -- OTHERS - 其他
  channel_trade_no VARCHAR(32),            -- 渠道交易单号
  -- fund_direction INT NOT NULL,          -- 资金方向。-1 冲正或撤销, 0 查询类, 1 支付类
  order_date DATE,                 -- 下单日期
  order_state VARCHAR(40) NOT NULL DEFAULT 'PENDING',       -- 订单状态:
                                          -- "PENDING":审核中,
                                          -- "PAYING":支付中,
                                          -- "PAID":已支付,
                                          -- "FAILED":异常单,
  
  clear_state VARCHAR(40) NOT NULL DEFAULT 'PENDING',   -- 清算状态:
                                      -- "PENDING": 未清算,
                                      -- "CLEARING": 清算中,
                                      -- "CLEARED": 已清算
  time_created DATETIME NOT NULL,     -- 交易创建时间
  time_modified DATETIME NOT NULL,    -- 最后修改时间
  time_cleared DATETIME,              -- 清算完成时间
  time_success DATETIME,              -- 交易完成时间

  payment_channel VARCHAR(40) NOT NULL, -- 支付渠道
  payment_method VARCHAR(40) NOT NULL,  -- 支付方法
  payment_product VARCHAR(40) NOT NULL, -- 支付产品
  payment_mode VARCHAR(16) NOT NULL,    -- 付款模式
                                        -- BALANCE - 余额支付（默认）,
                                        -- EBANK - 企业网银,
                                        -- LOAN - 垫资支付
  route_id VARCHAR(32),                 -- 路由ID
  payee_check TINYINT(1) NOT NULL DEFAULT 0, -- 是否校验收款人
  payee_name VARCHAR(128) NOT NULL,
  payee_account_id VARCHAR(32) NOT NULL,
  payee_account_type VARCHAR(16),
  payee_mobile VARCHAR(16),
  bank_name VARCHAR(40),
  bank_branch_code VARCHAR(12),
  bank_branch_name VARCHAR(100),

  remark VARCHAR(100),
  workflow_id BIGINT NOT NULL DEFAULT 0, -- 审核单ID，非0表示正在审核中。审核结束时要继续驱动订单完成支付。
  extra VARCHAR(4096),          -- 附加参数JSON

  PRIMARY KEY(id),
  KEY(order_no),
  KEY(merchant_order_no)
);

CREATE TABLE IF NOT EXISTS t_transaction_directdebit(
  id VARCHAR(32) NOT NULL,                 -- 交易ID
  type VARCHAR(40) NOT NULL DEFAULT 'DIRECTDEBIT',  -- 交易类型, 
                                           -- "DIRECTDEBIT":代扣, 
  order_no VARCHAR(32) NOT NULL,           -- 系统订单号
  batch_no VARCHAR(32),                    -- 系统订单批次号
  app_id VARCHAR(32) NOT NULL,             -- 商户应用ID
  merchant_id VARCHAR(28) NOT NULL,        -- 商户ID
  virtual_account_id VARCHAR(32),          -- 虚拟户ID
  merchant_order_no VARCHAR(32) NOT NULL,  -- 商户订单号
  merchant_batch_no VARCHAR(32),           -- 商户订单批次号
  amount BIGINT NOT NULL DEFAULT 0,        -- 交易金额,单位:分
  description VARCHAR(128) NOT NULL,       -- 交易摘要
  currency VARCHAR(4) NOT NULL DEFAULT 'CNY',  -- 订单币种。"CNY":人民币,"USD":美元。见字典
  currency_amount BIGINT NOT NULL DEFAULT 0,   -- 订单外币金额。人民币时与amount值相同
  business_type VARCHAR(40) NOT NULL,      -- 业务类型
  business_ref VARCHAR(64),                -- 关联业务单号
  channel_trade_no VARCHAR(32),            -- 渠道交易单号
  order_date DATE,                 -- 下单日期
  order_state VARCHAR(40) NOT NULL DEFAULT 'PENDING',       -- 订单状态:
                                          -- "PENDING":审核中,
                                          -- "PAYING":支付中,
                                          -- "PAID":已支付,
                                          -- "FAILED":异常单,
  
  clear_state VARCHAR(40) NOT NULL DEFAULT 'PENDING',   -- 清算状态:
                                      -- "PENDING": 未清算,
                                      -- "CLEARING": 清算中,
                                      -- "CLEARED": 已清算
  time_created DATETIME NOT NULL,     -- 交易创建时间
  time_modified DATETIME NOT NULL,    -- 最后修改时间
  time_cleared DATETIME,              -- 清算完成时间
  time_success DATETIME,              -- 交易完成时间

  payment_channel VARCHAR(40) NOT NULL, -- 支付渠道
  payment_method VARCHAR(40) NOT NULL,  -- 支付方法
  payment_product VARCHAR(40) NOT NULL, -- 支付产品
  route_id VARCHAR(32),                 -- 路由ID
  -- BEGIN: 代扣交易付款人信息
  payer_auth_type VARCHAR(20),  -- 付款人鉴权类型
  payer_name VARCHAR(128),      -- 付款人姓名
  payer_mobile VARCHAR(16),     -- 付款人预留手机号
  payer_cert_no VARCHAR(18),    -- 付款人证件号
  payer_cert_type VARCHAR(40),  -- 付款人证件类型
  payer_account_id VARCHAR(32), -- 付款人银行账号/银行卡号
  payer_account_type VARCHAR(16), -- 账号/卡类型 DEBIT - 借记卡, CREDIT - 贷记卡/信用卡
  bank_name VARCHAR(40),        -- 开户银行名称
  bank_sort_code VARCHAR(12),   -- 开户银行代码
  bank_province VARCHAR(20),    -- 开户银行省份
  card_valid_thru VARCHAR(4), -- 付款人信用卡有效期
  card_cvv VARCHAR(3),       -- 付款人信用卡校验码
  -- END
  remark VARCHAR(100),
  workflow_id BIGINT NOT NULL DEFAULT 0, -- 审核单ID，非0表示正在审核中。审核结束时要继续驱动订单完成支付。
  extra VARCHAR(4096),          -- 附加参数JSON
  PRIMARY KEY(id),
  KEY(order_no),
  KEY(merchant_order_no)
);

CREATE TABLE IF NOT EXISTS t_clearing_detail(
  sn BIGINT NOT NULL AUTO_INCREMENT,       -- 清分增流水
  order_no VARCHAR(32) NOT NULL,           -- 订单号
  transaction_type VARCHAR(40) NOT NULL,   -- 交易类型
  merchant_id VARCHAR(28) NOT NULL,
  rate_id BIGINT NOT NULL,                 -- 费率规则ID
  merchant_order_no VARCHAR(32) NOT NULL,  -- 商户订单号
  channel_trade_no VARCHAR(32),            -- 渠道交易单号
  payment_channel VARCHAR(40) NOT NULL,    -- 支付渠道
  business_type VARCHAR(40),                -- 业务类型
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分, 
                                            -- 收款(CREDIT/payin)净额 = amount - commission,
                                            -- 付款(DEBIT/payout)净额 = amount + commission,
                                            -- 退款(DEBIT/payout)净额 = amount
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分, 正数表示扣除，负数表示返还
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(sn),
  KEY(order_no)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_clearing_summary(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 记录增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  transaction_type VARCHAR(40) NOT NULL,   -- 交易类型
  posting_date BIGINT NOT NULL,             -- 记账日期 格式:20160101
  time_created DATETIME NOT NULL,           -- 创建时间
  amount BIGINT NOT NULL DEFAULT 0,         -- 交易金额,单位:分
  amount_actual BIGINT NOT NULL DEFAULT 0,  -- 实际交易金额,单位:分, actual_amount = amount - refund_amount - commission + refund_commission
  commission BIGINT NOT NULL DEFAULT 0,     -- 交易手续费,单位:分, 正数
  batch_no VARCHAR(32) NOT NULL,
  PRIMARY KEY(sn)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_commission_detail(
  sn BIGINT NOT NULL AUTO_INCREMENT,       -- 对应清分增流水
  order_no VARCHAR(32) NOT NULL,           -- 订单号
  transaction_type VARCHAR(40) NOT NULL,   -- 交易类型
  merchant_id VARCHAR(28) NOT NULL,
  agent_id VARCHAR(28),
  channel_rate_id BIGINT NOT NULL,         -- 渠道费率ID
  merchant_rate_id BIGINT NOT NULL,        -- 商户费率ID
  agent_rate_id BIGINT,                    -- 代理商费率ID
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
  PRIMARY KEY(sn),
  KEY(order_no)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_commission_summary(
  sn BIGINT NOT NULL AUTO_INCREMENT,       -- 记录增流水
  transaction_type VARCHAR(40) NOT NULL,   -- 交易类型
  merchant_id VARCHAR(28) NOT NULL,
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
  PRIMARY KEY(sn)
)AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS t_commission_rebate_bill(
  sn BIGINT NOT NULL AUTO_INCREMENT,                       -- 反佣账单流水
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
  PRIMARY KEY(sn)
)AUTO_INCREMENT = 100;

