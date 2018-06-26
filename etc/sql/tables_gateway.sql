-- 支付产品(产品代码)
-- 100 - WEB - PC网页支付
-- 101 - WAP - 手机WAP支付
-- 102 - QRCODE - 二维码支付（商家被扫）
-- 103 - SCAN - 扫码支付（商家主扫）
-- 104 - JSAPI - 公众号支付
-- 105 - MINA - 小程序支付
-- 106 - APP - APP支付
-- 120 - B2C (B2C Transfer)
-- 130 - DD (Direct Debit)

-- 子产品代码
-- 101 - ALIPAY - 支付宝
-- 102 - WXPAY - 微信支付
-- 103 - QPAY - QQ钱包
-- 104 - UNIPAY - 银联支付

-- 子产品
-- 100000 - PC网页支付，保留
-- 100101 - WEB_ALIPAY
-- 101000 - 手机WAP支付，保留
-- 101101 - WAP_ALIPAY
-- 101102 - WAP_WXPAY
-- 102000 - 二维码支付（被扫），保留
-- 102101 - QRCODE_ALIPAY
-- 102102 - QRCODE_WXPAY
-- 102103 - QRCODE_QPAY
-- 102104 - QRCODE_UNIPAY
-- 103000 - 扫码支付（主扫），保留
-- 103101 - SCAN_ALIAPY
-- 103102 - SCAN_WXPAY
-- 103103 - SCAN_QPAY
-- 103104 - SCAN_UNIPAY
-- 104000 - 公众号支付，保留
-- 104101 - JSAPI_ALIAPY
-- 104102 - JSAPI_WXPAY
-- 104103 - JSAPI_QPAY
-- 104104 - JSAPI_UNIPAY
-- 105000 - 小程序支付， 保留
-- 105101 - MINIAPP_ALIPAY
-- 105102 - MINIAPP_WXPAY
-- 106000 - APP支付， 保留
-- 106101 - APP_ALIPAY
-- 106102 - APP_WXPAY
-- 106103 - APP_QPAY
-- 120000 - B2C代付，保留
-- 130000 - 代扣，保留


-- 支付产品
CREATE TABLE IF NOT EXISTS t_gateway_product(
  id VARCHAR(6) NOT NULL,    -- 支付产品ID, cat_id + sub_id
  cat_id VARCHAR(3) NOT NULL,
  cat_name VARCHAR(32) NOT NULL, -- 产品名称
  cat_desc VARCHAR(32) NOT NULL,  -- 产品描述
  sub_id VARCHAR(3) NOT NULL,
  sub_name VARCHAR(32) NOT NULL, -- 子产品名称
  sub_desc VARCHAR(32) NOT NULL,  -- 子产品描述
  scene_info VARCHAR(32),         -- 应用场景
  logo VARCHAR(255),
  channel_excluded VARCHAR(255), -- 排除通道
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  KEY(sub_name)
);

-- 支付渠道
-- 100 - FUSEPAY - 保留
-- 101 - ALIPAY - 支付宝
-- 102 - WECHATPAY - 微信支付
-- 103 - TENPAY - 财付通
-- 104 - UNIONPAY - 银联商务
-- 105 - ALLINPAY - 通联支付
-- 106 - PINGAN - 平安银行

CREATE TABLE IF NOT EXISTS t_gateway_channel(
  id VARCHAR(3) NOT NULL,     -- 渠道ID
  name VARCHAR(32) NOT NULL, -- 渠道编码
  description VARCHAR(32) NOT NULL, -- 渠道中文描述
  type VARCHAR(32) NOT NULL,  -- 渠道类型,
                              -- BANK 银行
                              -- NON_BANK_AGENCY 非银行类支付机构
                              -- TECHNICAL_PROVIDER 技术服务商
  type_desc VARCHAR(32) NOT NULL,  -- 渠道类型描述,
                              -- BANK 银行
                              -- NON_BANK_AGENCY 非银行类支付机构
                              -- TECHNICAL_PROVIDER 技术服务商
  webhook_path VARCHAR(255) NOT NULL,  -- 渠道回调路径
  prod_sub_name VARCHAR(32),       -- 支付子产品名称
  contact_name VARCHAR(60),        -- 业务联系人姓名
  contact_email VARCHAR(100),      -- 业务联系人邮箱
  contact_phone VARCHAR(20),       -- 业务联系人电话/手机
  tech_contact_name VARCHAR(60),   -- 技术联系人姓名
  tech_contact_email VARCHAR(100), -- 技术联系人邮箱
  tech_contact_phone VARCHAR(20),  -- 技术联系人电话/手机
  province VARCHAR(40),
  city VARCHAR(100),
  address VARCHAR(255),
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_gateway_channel_parameter(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 配置ID
  channel_id VARCHAR(3) NOT NULL,
  channel_name VARCHAR(32) NOT NULL,
  param_name VARCHAR(32) NOT NULL UNIQUE,
  param_desc VARCHAR(64) NOT NULL,
  sp_enabled TINYINT(1) NOT NULL DEFAULT 0,
  sp_mandatory TINYINT(1) NOT NULL DEFAULT 0,
  merchant_enabled TINYINT(1) NOT NULL DEFAULT 0,
  merchant_mandatory TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY(channel_id)
);


-- 支付渠道受理
CREATE TABLE IF NOT EXISTS t_gateway_channel_delegate(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 支付受理ID
  name VARCHAR(128) NOT NULL,       -- 支付受理别名，channel_name + cat_name + sub_name
  description VARCHAR(128) NOT NULL,       -- 支付受理标签，channel_desc + cat_desc + sub_desc
  type VARCHAR(32) NOT NULL,  -- 支付受理类型,
                              -- MERCHNT_DIRECT - 商户直连
                              -- SUPPLIER_DIRECT - 服务商直连
                              -- SUPPLIER_INDIRECT - 服务商间连
                              -- BANK_INDIRECT - 银行间连
                              -- COOPERATIVE_CLEARING - 归集清分
  type_desc VARCHAR(32) NOT NULL, -- 支付受理类型描述,
                              -- MERCHNT_DIRECT - 商户直连
                              -- SUPPLIER_DIRECT - 服务商直连
                              -- SUPPLIER_INDIRECT - 服务商间连
                              -- BANK_INDIRECT - 银行间连
                              -- COOPERATIVE_CLEARING - 归集清分
  channel_id VARCHAR(4) NOT NULL,
  channel_name VARCHAR(32) NOT NULL,
  channel_desc VARCHAR(64) NOT NULL, -- 渠道中文描述
  product_id VARCHAR(6) NOT NULL,
  cat_id VARCHAR(3) NOT NULL,
  cat_name VARCHAR(32) NOT NULL,
  cat_desc VARCHAR(32) NOT NULL,
  sub_id VARCHAR(3) NOT NULL,
  sub_name VARCHAR(64) NOT NULL,
  sub_desc VARCHAR(64) NOT NULL,
  rate_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否配置费率
  rate_id BIGINT NOT NULL DEFAULT 0,  -- 费率ID
  sp_config_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否有服务商配置
  sp_config_id BIGINT NOT NULL DEFAULT 0, -- 服务商配置ID
  enabled BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- 渠道受理费率
CREATE TABLE IF NOT EXISTS t_gateway_delegate_rate(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 费率规则ID
  ref_id VARCHAR(28) NOT NULL,        -- 关联渠道受理ID或商户ID或代理商ID
  name VARCHAR(100) NOT NULL,         -- 规则名称
  rate_mode VARCHAR(16) NOT NULL,     -- 费率模式：CHANNEL-"渠道费率",AGENT-"代理费率", MERCHANT-"商户费率"
  rate_type VARCHAR(16) NOT NULL,     -- 费率类型: 'RATE' - 比率 | 'FEE' - 费用
  min_fee BIGINT NOT NULL DEFAULT 0,  -- 保底费用
  max_fee BIGINT NOT NULL DEFAULT 0,  -- 封顶费用
  rate INT NOT NULL DEFAULT 0, -- 费率值, 费率值的最小单位需根据类型转换，为 'RATE'时最小单位为万分之一，为'FEE'时，最小单位为金额分
  min_applicable BIGINT NOT NULL DEFAULT 0, -- 费率生效金额(单位为分)，默认为0
  inherited BIGINT NOT NULL DEFAULT 0,-- 上级费率规则ID
  is_inherited TINYINT(1) NOT NULL DEFAULT 0, -- 是否衍生费率，0 - 否，1 - 是
  enabled TINYINT(1) NOT NULL DEFAULT 1, -- 生效标识位，0 - 否，1 - 是
  PRIMARY KEY (id)
);

-- 渠道参数配置
CREATE TABLE IF NOT EXISTS t_gateway_delegate_config(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 配置ID
  type VARCHAR(20),             -- 配置类型,
                                -- MERCHANT 商户
                                -- SUPPLIER 服务商
  delegate_id BIGINT NOT NULL,  -- 受理标识
  delegate_name VARCHAR(32) NOT NULL,
  settings TEXT,                -- 受理配置（JSON字符串，base64编码）
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_gateway_channel_merchant(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 支付商户受理ID
  merchant_id VARCHAR(28) NOT NULL,   -- 商户编号
  delegate_id BIGINT NOT NULL,
  delegate_name VARCHAR(128) NOT NULL, -- 支付配置别名
  delegate_config_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否有服务商配置
  delegate_config_id BIGINT NOT NULL DEFAULT 0,
  inherited_enabled TINYINT(1) NOT NULL DEFAULT 0,  -- 是否继承费率
  inherited_id BIGINT NOT NULL DEFAULT 0,  -- 继承费率ID
  merchant_rate_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否配置商户费率
  merchant_rate_id BIGINT NOT NULL DEFAULT 0,   -- 商户费率ID
  priority INT NOT NULL DEFAULT 10,
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_gateway_merchant_config(
  id VARCHAR(32) NOT NULL,            -- 商户应用配置ID
  config_name VARCHAR(128) NOT NULL,     -- 商户应用名称
  merchant_id VARCHAR(28) NOT NULL,       -- 商户编号
  merchant_name VARCHAR(128) NOT NULL,    -- 商户名称
  test_webhook_enabled TINYINT(1) NOT NULL DEFAULT 0,
  live_webhook_enabled TINYINT(1) NOT NULL DEFAULT 0,
  seckey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  prikey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  pubkey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  merchant_pubkey_enabled TINYINT(1) NOT NULL DEFAULT 0,
  test_apikey VARCHAR(64) NOT NULL,
  live_apikey VARCHAR(64) NOT NULL,
  test_webhook VARCHAR(255),
  live_webhook VARCHAR(255),
  seckey VARCHAR(128) NOT NULL,
  prikey TEXT,
  pubkey TEXT,
  merchant_pubkey TEXT,
  time_created DATETIME NOT NULL,
  time_expire DATETIME NOT NULL,
  time_updated DATETIME NOT NULL,
  state VARCHAR(20) NOT NULL,            -- "TEST"-测试, "LIVE"-上线
  enabled TINYINT(1) NOT NULL DEFAULT 1, -- 启用标志
  channel_routes TEXT, -- 支付路由，对应t_gateway_merchant_route表中记录
  PRIMARY KEY(id),
  KEY(merchant_id)
);

-- 支付渠道路由映射表
CREATE TABLE IF NOT EXISTS t_gateway_merchant_route(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 路由ID
  merchant_config_id VARCHAR(32) NOT NULL,
  channel_merchant_id BIGINT NOT NULL,
  PRIMARY KEY(id)
)AUTO_INCREMENT = 10000000;


CREATE TABLE IF NOT EXISTS t_gateway_channel_agent(
  id BIGINT NOT NULL AUTO_INCREMENT,  -- 支付渠道代理ID
  agent_id VARCHAR(28) NOT NULL,      -- 代理商ID
  delegate_id BIGINT NOT NULL,          -- 支付受理ID
  delegate_alias VARCHAR(128) NOT NULL, -- 支付受理别名
  inherited_rate_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否继承费率
  inherited_rate_id BIGINT NOT NULL DEFAULT 0,      -- 继承费率ID
  agent_rate_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否配置代理费率
  agent_rate_id BIGINT NOT NULL DEFAULT 0,  -- 代理费率ID
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY(agent_id)
);
