
CREATE TABLE IF NOT EXISTS t_member_membership(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 虚拟户账号
  type VARCHAR(16) NOT NULL,     -- 虚拟户类型: V_COLLECTION -收款虚拟户, "V_CURRENT" -提现虚拟户, "V_DEPOSIT"-专用虚拟户, "V_PROVISION" -备付金虚拟户
  name VARCHAR(100) NOT NULL,    -- 虚拟户名
  ref_id VARCHAR(40) NOT NULL,       -- 关联账号ID(如: merchant_id, agent_id)
  balance BIGINT NOT NULL DEFAULT 0, -- 账户余额
  frozen BIGINT NOT NULL DEFAULT 0,  -- 冻结金额
  overdraft_limit BIGINT NOT NULL DEFAULT 0,  -- 透支额度,单位分
  bank_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否关联银行账号
  bank_province VARCHAR(40),        -- 省份
  bank_city VARCHAR(40),            -- 城市
  bank_region_code VARCHAR(4),      -- 银行地区代码
  bank_name VARCHAR(100),           -- 银行名称
  bank_branch_name VARCHAR(100),    -- 支行名称
  bank_branch_code VARCHAR(12),     -- 支行联行号
  bank_account_type VARCHAR(40),    -- 账户类型: "BUSINESS_ACCOUNT"-对公账户, "PRIVATE_ACCOUNT"-个人账户
  bank_account_name VARCHAR(255),   -- 开户名称
  bank_account_no VARCHAR(40),      -- 开户账号
  time_modified DATETIME,           -- 修改时间
  sign VARCHAR(64) NOT NULL,        -- 上次更新信息的签名： Sign(balance,fund_frozen,time_modified)。理论上每次出款前都要验证该签名。
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 账号状态 "PENDING":待验证, 账号状态."OK":正常, "SUSPEND":锁定
  PRIMARY KEY(id)
)AUTO_INCREMENT = 10000000;

CREATE TABLE IF NOT EXISTS t_member_account(
  id BIGINT NOT NULL AUTO_INCREMENT, -- 虚拟户账号
  type VARCHAR(16) NOT NULL,     -- 虚拟户类型: V_COLLECTION -收款虚拟户, "V_CURRENT" -提现虚拟户, "V_DEPOSIT"-专用虚拟户, "V_PROVISION" -备付金虚拟户
  name VARCHAR(100) NOT NULL,    -- 虚拟户名
  ref_id VARCHAR(40) NOT NULL,       -- 关联账号ID(如: merchant_id, agent_id)
  balance BIGINT NOT NULL DEFAULT 0, -- 账户余额
  frozen BIGINT NOT NULL DEFAULT 0,  -- 冻结金额
  overdraft_limit BIGINT NOT NULL DEFAULT 0,  -- 透支额度,单位分
  bank_enabled TINYINT(1) NOT NULL DEFAULT 0, -- 是否关联银行账号
  bank_province VARCHAR(40),        -- 省份
  bank_city VARCHAR(40),            -- 城市
  bank_region_code VARCHAR(4),      -- 银行地区代码
  bank_name VARCHAR(100),           -- 银行名称
  bank_branch_name VARCHAR(100),    -- 支行名称
  bank_branch_code VARCHAR(12),     -- 支行联行号
  bank_account_type VARCHAR(40),    -- 账户类型: "BUSINESS_ACCOUNT"-对公账户, "PRIVATE_ACCOUNT"-个人账户
  bank_account_name VARCHAR(255),   -- 开户名称
  bank_account_no VARCHAR(40),      -- 开户账号
  time_modified DATETIME,           -- 修改时间
  sign VARCHAR(64) NOT NULL,        -- 上次更新信息的签名： Sign(balance,fund_frozen,time_modified)。理论上每次出款前都要验证该签名。
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 账号状态 "PENDING":待验证, 账号状态."OK":正常, "SUSPEND":锁定
  PRIMARY KEY(id)
)AUTO_INCREMENT = 10000000;