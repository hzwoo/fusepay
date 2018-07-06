

CREATE TABLE IF NOT EXISTS t_system_user (
  id BIGINT AUTO_INCREMENT NOT NULL,
  username VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  type VARCHAR(40) NOT NULL DEFAULT 'STAFF', -- 用户类型
                                      -- MERCHANT - 商户
                                      -- AGENT - 代理商
                                      -- STAFF - 员工
                                      -- ADMIN - 管理员
  email VARCHAR(128),
  mobile VARCHAR(24),
  fullname VARCHAR(40),
  avatar VARCHAR(255),
  group_id VARCHAR(32) NOT NULL DEFAULT 'guest',
  op_user_id VARCHAR(32) NOT NULL,
  is_staff TINYINT(1) NOT NULL DEFAULT 0,
  is_super TINYINT(1) NOT NULL DEFAULT 0,
  is_email_verified TINYINT(1) NOT NULL DEFAULT 0,
  is_mobile_verified TINYINT(1) NOT NULL DEFAULT 0,
  is_enabled TINYINT(1) NOT NULL DEFAULT 0,
  time_created DATETIME NOT NULL,
  time_modified DATETIME NOT NULL,
  last_login DATETIME,
  status VARCHAR(32) NOT NULL DEFAULT 'NORMAL',
                                    -- NORMAL
                                    -- SUSPENDED
                                    -- DELETED
  remark VARCHAR(255),
  PRIMARY KEY (id),
  KEY(username)
)AUTO_INCREMENT = 100000;

CREATE TABLE IF NOT EXISTS t_system_role (
  id BIGINT AUTO_INCREMENT NOT NULL,
  name VARCHAR(128) NOT NULL,
  group_id VARCHAR(32) NOT NULL DEFAULT 'guest',
  domain VARCHAR(128) NOT NULL DEFAULT 'fusepay',
  inherited VARCHAR(128),
  PRIMARY KEY (id)
)AUTO_INCREMENT = 200;

CREATE TABLE IF NOT EXISTS t_system_user_role (
  user_id VARCHAR(32) NOT NULL,
  username VARCHAR(128) NOT NULL,
  role_id BIGINT NOT NULL,
  rolename VARCHAR(128) NOT NULL,
  role_domain VARCHAR(128) NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES t_system_user (id)
      ON DELETE CASCADE,
  FOREIGN KEY (role_id)
    REFERENCES t_system_role (id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS t_system_permission (
  id BIGINT AUTO_INCREMENT NOT NULL,
  domain VARCHAR(128) NOT NULL,
  domain_name VARCHAR(40) NOT NULL,
  resource_id BIGINT NOT NULL,
  resource_name VARCHAR(40) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  action VARCHAR(40) NOT NULL, -- 访问操作
                                  -- list - 查看列表
                                  -- view - 查看记录
                                  -- create - 创建
                                  -- edit - 编辑
                                  -- drop - 删除
  context VARCHAR(512) NOT NULL,
  module VARCHAR(40), -- 所属模块
                      -- MOD_REGISTER_MANAGEMENT - 进件管理
                      -- MOD_MERCHANT_MANAGEMENT - 商户管理
                      -- MOD_CHANNEL_MANAGEMENT - 通道管理
                      -- MOD_SYSTEM_MANAGEMENT - 系统管理
                      -- MOD_TRANSACTION_MANAGEMENT - 交易管理
                      -- MOD_AGENT_MANAGEMENT - 代理商管理
  module_name VARCHAR(40),
  hash VARCHAR(32) NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_system_role_permission (
  role_id BIGINT NOT NULL,
  rolename VARCHAR(128) NOT NULL,
  permission_id BIGINT NOT NULL,
  hash VARCHAR(32) NOT NULL,
  FOREIGN KEY (role_id)
    REFERENCES t_system_role (id)
      ON DELETE CASCADE,
  FOREIGN KEY (permission_id)
    REFERENCES t_system_permission (id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS t_system_resource (
  id BIGINT NOT NULL,
  domain VARCHAR(128) NOT NULL DEFAULT 'fusepay',
  domain_name VARCHAR(40) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  resource_name VARCHAR(40) NOT NULL,
  module VARCHAR(40),
  module_name VARCHAR(40),
  permission VARCHAR(255), -- "{\"list\":1,\"view\":1,\"create\":1,\"edit\":1,\"drop\":1}"
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS t_system_settings (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL UNIQUE,  -- 参数名
  value VARCHAR(255),                -- 参数值
  context VARCHAR(40),
  sub_context VARCHAR(40),
  PRIMARY KEY(id),
  KEY (name)
);

CREATE TABLE IF NOT EXISTS t_system_dictionary (
  table_name VARCHAR(80) NOT NULL,
  column_name VARCHAR(80) NOT NULL,
  column_label VARCHAR(40) NOT NULL,
  is_enumerable TINYINT(1) NOT NULL DEFAULT 0,
  enumeration TEXT, -- e.g. '[{"value": "INDIVIDUAL", "label": "个人"}，{"value":"BUSINESS", "label":"公司"}]'
  time_created DATETIME,
  time_modified DATETIME,
  created_by VARCHAR(40) NOT NULL,
  remark VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY(table_name,column_name)
);
