
CREATE TABLE IF NOT EXISTS t_report_order_timely(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,
  order_time CHAR(4) NOT NULL,
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_order_hourly(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,
  order_hour CHAR(2) NOT NULL,
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_order_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,               -- 交易订单日期
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  app_id VARCHAR(32),
  branch_id VARCHAR(32),
  payment_method VARCHAR(40),
  payment_channel VARCHAR(40),
  payment_product VARCHAR(40),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_refund_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,               -- 交易订单日期
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  app_id VARCHAR(32),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_transfer_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,               -- 交易订单日期
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  app_id VARCHAR(32),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_direct_debit_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_date BIGINT NOT NULL,               -- 交易订单日期
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  app_id VARCHAR(32),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_order_request_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,  -- 商户虚拟账号
  order_date BIGINT NOT NULL,               -- 交易订单日期
  count BIGINT NOT NULL DEFAULT 0,   -- 交易总笔数,单位:笔
  order_state VARCHAR(40) NOT NULL,  -- 订单状态
  app_id VARCHAR(32),
  branch_id VARCHAR(32),
  payment_method VARCHAR(40),
  payment_channel VARCHAR(40),
  payment_product VARCHAR(40),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_report_order_monthly(
  sn BIGINT NOT NULL AUTO_INCREMENT,        -- 增流水
  merchant_id VARCHAR(28) NOT NULL,         -- 商户ID
  fund_account_id BIGINT NOT NULL DEFAULT 0,          -- 商户虚拟账号
  order_month BIGINT NOT NULL,              -- 交易订单月份
  count BIGINT NOT NULL DEFAULT 0,    -- 交易总笔数,单位:笔
  amount BIGINT NOT NULL DEFAULT 0,   -- 交易总额,单位:分
  average BIGINT NOT NULL DEFAULT 0, -- 每笔交易均额,单位:分
  app_id VARCHAR(32),
  branch_id VARCHAR(32),
  payment_method VARCHAR(40),
  payment_channel VARCHAR(40),
  payment_product VARCHAR(40),
  PRIMARY KEY(sn),
  KEY(merchant_id)
);



CREATE TABLE IF NOT EXISTS t_report_admission_daily(
  sn BIGINT NOT NULL AUTO_INCREMENT,  -- 增流水
  stat_date BIGINT NOT NULL,          -- 统计日期
  merchant_count BIGINT NOT NULL DEFAULT 0,  -- 已开通商户数量
  branch_count BIGINT NOT NULL DEFAULT 0,    -- 已开通门店数量
  merchant_case_created BIGINT NOT NULL DEFAULT 0,  -- 新增商户进件单数量
  merchant_case_done BIGINT NOT NULL DEFAULT 0,     -- 商户进件结单数量
  branch_case_created BIGINT NOT NULL DEFAULT 0,    -- 新增门店进件单数量
  branch_case_done BIGINT NOT NULL DEFAULT 0,       -- 门店进件结单数量
  channel_case_created BIGINT NOT NULL DEFAULT 0,   -- 新增渠道进件单数量
  channel_case_done BIGINT NOT NULL DEFAULT 0,      -- 渠道进件结单数量
  PRIMARY KEY(sn)
);
