

CREATE TABLE IF NOT EXISTS t_payment_rate(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 费率规则ID
  ref_id VARCHAR(28) NOT NULL,        -- 关联渠道受理ID或商户ID或代理商ID
  name VARCHAR(100) NOT NULL,         -- 规则名称
  scheme_type VARCHAR(16) NOT NULL,   -- 规则类型：CHANNEL-"渠道费率",AGENT-"代理费率", MERCHANT-"商户费率"
  inherited BIGINT NOT NULL DEFAULT 0, -- 上级费率规则ID
  min_fee BIGINT NOT NULL DEFAULT 0,  -- 保底费用
  max_fee BIGINT NOT NULL DEFAULT 0,  -- 封顶费用
  rate_type VARCHAR(16) NOT NULL, -- 费率值类型: 'RATE' - 比率 | 'FEE' - 费用
  rate INT NOT NULL DEFAULT 0, -- 费率值, 费率值的最小单位需根据类型转换，为 'RATE'时最小单位为万分之一，为'FEE'时，最小单位为金额分
  min_applicable BIGINT NOT NULL DEFAULT 0, -- 费率生效金额(单位为分)，默认为0
  is_inherited TINYINT(1) NOT NULL DEFAULT 0, -- 是否衍生费率，0 - 否，1 - 是
  enabled TINYINT(1) NOT NULL DEFAULT 1, -- 生效标识位，0 - 否，1 - 是
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_payment_product(
  id VARCHAR(32) NOT NULL,  -- 支付方式 ID
                            -- WXPAY - 微信支付
                            -- ALIPAY - 支付宝
                            -- QPAY - QQ钱包
                            -- APPLEPAY - 苹果支付
                            -- QUICKPASS - 银联闪付
                            -- BANKCARD - 银行卡
                            -- NOCARD - 无卡支付
                            -- B2CPAY - B2C代付
                            -- DIRECTDEBIT - 代扣
  alias VARCHAR(40) NOT NULL,
  logo VARCHAR(255),
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_payment_subproduct(
  id VARCHAR(32) NOT NULL,    -- 支付产品
                              -- WX_QRCODE - 微信扫码支付（用户主扫）
                              -- WX_SCAN - 微信刷卡支付（用户被扫）
                              -- WX_JSAPI - 微信公众号支付
                              -- WX_WAP - 微信WAP支付（非微信浏览器）
                              -- WX_APP - 微信APP支付
                              -- ALI_WEB - 支付宝PC网关支付
                              -- ALI_WAP - 支付宝WAP支付
                              -- ALI_WAPOLD - 支付宝旧版WAP支付
                              -- ALI_QRCODE - 支付宝扫码支付（用户主扫）
                              -- ALI_SCAN - 支付宝条码支付（用户被扫）
                              -- ALI_JSAPI - 支付宝服务窗H5支付
                              -- ALI_APP - 支付宝APP支付
                              -- QQ_QRCODE - QQ钱包扫码支付
                              -- QQ_SCAN - QQ钱包刷卡（条码）支付
                              -- QQ_JSAPI - QQ钱包H5支付
                              -- UNP_QRCODE - 银联扫码支付
                              -- UNP_SCAN - 银联条码支付
                              -- B2C_TXPAY - 天下支付单笔代付
                              -- B2C_TXPAY_BATCH - 天下支付批量代付
                              -- B2C_WXPAY - 微信支付企业B2C转账
                              -- DD_TXPAY - 天下支付代扣
                              -- DD_BORAYING - 博瑞盈代扣
  alias VARCHAR(100) NOT NULL, -- 支付产品名称
  payment_method_id VARCHAR(32) NOT NULL,     -- 支付方式
                                     -- WXPAY - 微信支付
                                     -- ALIPAY - 支付宝
                                     -- QPAY - QQ钱包
                                     -- APPLEPAY - 苹果支付
                                     -- QUICKPASS - 银联闪付
                                     -- BANKCARD - 银行卡
                                     -- NOCARD - 无卡支付
                                     -- B2CPAY - B2C代付
                                     -- DIRECTDEBIT - 代扣
  scene_info VARCHAR(40),       -- 应用场景
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_payment_channel(
  id VARCHAR(40) NOT NULL,    -- 渠道ID
                              -- "WECHATPAY" - 微信支付,
                              -- "ALIPAY" - 支付宝,
                              -- "TENPAY" - 财付通,
                              -- "CMCB" - 民生银行
                              -- "TIANXIAPAY" - 天下支付
                              -- "ALLINPAY" - 通联支付
                              -- "PINGAN" - 平安银行
                              -- "UNIONPAY" - 银联
                              -- "BORAYING" - 博瑞盈
  type VARCHAR(40) NOT NULL,  -- 渠道类型,
                              -- BANK_CHANNEL 银行机构渠道
                              -- NONBANK_CHANNEL 第三方支付机构渠道
                              -- CHANNEL_SUPPLIER 渠道代理（服务商）,
  alias VARCHAR(100) NOT NULL, -- 渠道名称
  settings_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否已配置参数表
  settings TEXT,              -- 渠道配置参数表 [{"label":"xxx","key":"xxx","mandatory":"true|false"},...]
  -- [{"label":"xxx","key":"xxx","senabled":"0|1","smandatory":"true|false","menabled":"0|1","mmandatory":"true|false"},...]
  webhook VARCHAR(255),  -- 渠道回调地址
  contact_name VARCHAR(60),        -- 业务联系人姓名
  contact_email VARCHAR(100),      -- 业务联系人邮箱
  contact_phone VARCHAR(20),      -- 业务联系人电话/手机
  tech_contact_name VARCHAR(60),   -- 技术联系人姓名
  tech_contact_email VARCHAR(100), -- 技术联系人邮箱
  tech_contact_phone VARCHAR(20), -- 技术联系人电话/手机
  province VARCHAR(40),
  city VARCHAR(100),
  address VARCHAR(255),
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- 渠道配置类型
CREATE TABLE IF NOT EXISTS t_payment_channel_product(
  channel_id VARCHAR(40) NOT NULL,-- 渠道ID
  channel_type VARCHAR(40) NOT NULL,
  channel_alias VARCHAR(100) NOT NULL,
  payment_method_id VARCHAR(40) NOT NULL,  -- 支付方式
  payment_method_alias VARCHAR(100) NOT NULL,
  PRIMARY KEY (channel_id,payment_method_id)
);

-- 渠道参数配置
CREATE TABLE IF NOT EXISTS t_payment_channel_config(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 配置ID
  type VARCHAR(40),                  -- 配置类型,
                                     -- MERCHANT 商户
                                     -- SUPPLIER 服务商
  channel_id VARCHAR(40) NOT NULL,   -- 渠道标识
  settings TEXT,                     -- JSON字符串
  PRIMARY KEY (id)
);

-- 渠道受理机构
CREATE TABLE IF NOT EXISTS t_payment_channel_delegate(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 受理ID
  alias VARCHAR(100) NOT NULL,        -- 受理别名
  handling_mode VARCHAR(40) NOT NULL, -- 受理模式,
                                      -- MERCHNT_DIRECT - 渠道直连
                                      -- SUPPLIER_DIRECT - 服务商直连
                                      -- SUPPLIER_INDIRECT - 服务商间连
                                      -- STANDING_CLEAR - 归集清分
  rate_id BIGINT NOT NULL DEFAULT 0,  -- 费率ID
  channel_id VARCHAR(40) NOT NULL,
  payment_method_id VARCHAR(40) NOT NULL,
  channel_config_id BIGINT NOT NULL DEFAULT 0, -- 受理渠道参数配置ID
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  account_enabled TINYINT(1) NOT NULL DEFAULT 0,   -- 是否有备付金账号
  account_id BIGINT NOT NULL DEFAULT 0,
  payment_products TEXT, -- JSON字符串, [{"id":"xxx","rate":"xxx"},...]
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_payment_merchant_config(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 支付ID
  merchant_id VARCHAR(28) NOT NULL,   -- 商户编号
  channel_agency_id BIGINT NOT NULL,
  channel_agency_alias VARCHAR(100) NOT NULL,        -- 支付配置别名
  channel_config_id BIGINT NOT NULL DEFAULT 0,
  account_enabled TINYINT(1) NOT NULL DEFAULT 0,   -- 是否有收款虚拟户
  account_id BIGINT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  payment_products TEXT, -- JSON字符串, [{"id":"xxx","rate":"xxx"},...]
  PRIMARY KEY (id),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_payment_merchant_application(
  id VARCHAR(32) NOT NULL,            -- 商户应用ID
  name VARCHAR(128) NOT NULL,         -- 商户应用名称
  status VARCHAR(20) NOT NULL,        -- "TEST"-测试, "LIVE"-上线, "BLOCKED"-禁用
  merchant_id VARCHAR(28) NOT NULL,       -- 商户编号
  merchant_name VARCHAR(128) NOT NULL,    -- 商户名称
  test_webhook_enabled TINYINT(1) NOT NULL DEFAULT 0,
  live_webhook_enabled TINYINT(1) NOT NULL DEFAULT 0,
  seckey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  local_prikey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  local_pubkey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  merchant_pubkey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  test_apikey VARCHAR(64) NOT NULL,
  live_apikey VARCHAR(64) NOT NULL,
  test_webhook VARCHAR(255),
  live_webhook VARCHAR(255),
  seckey VARCHAR(128) NOT NULL,
  local_prikey TEXT,
  local_pubkey TEXT,
  merchant_pubkey TEXT,
  time_created DATETIME NOT NULL,
  time_expire DATETIME NOT NULL,
  time_modified DATETIME NOT NULL,
  payment_routes TEXT, -- 支付渠道详细配置
  PRIMARY KEY(id),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_payment_agent_delegate(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- ID
  agent_id VARCHAR(28) NOT NULL,   -- 代理商id
  channel_agency_id BIGINT NOT NULL,
  channel_agency_alias VARCHAR(100) NOT NULL, -- 支付配置别名
  channel_config_id BIGINT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  payment_products TEXT, -- JSON字符串, [{"id":"xxx","rate":"xxx"},...]

  handling_mode VARCHAR(40) NOT NULL, -- 受理模式,
                                      -- MERCHNT_DIRECT - 渠道直连
                                      -- SUPPLIER_DIRECT - 服务商直连
                                      -- SUPPLIER_INDIRECT - 服务商间连
                                      -- STANDING_CLEAR - 归集清分
  channel_id VARCHAR(40) NOT NULL,
  payment_method_id VARCHAR(40) NOT NULL,

  PRIMARY KEY (id),
  KEY(agent_id)
);