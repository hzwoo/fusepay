
CREATE TABLE IF NOT EXISTS t_static_region (
  region_id VARCHAR(6) NOT NULL,          -- 区域ID，国家行政区编码
  region_name VARCHAR(100) NOT NULL,      -- 区域名称
  region_code VARCHAR(100) NOT NULL,       -- 银行地区代码或代码列表
  parent_id VARCHAR(6) NOT NULL,        -- 上级区域ID, 若没有上级区域则用本区域代替
  parent_name VARCHAR(100) NOT NULL,    -- 上级区域名称
  region_level INT NOT NULL,              -- 区域级别, 0-国家, 1-省/直辖市/自治区, 2-市/自治州
  PRIMARY KEY(region_id),
  KEY (region_code)
);

CREATE TABLE IF NOT EXISTS t_static_bank (
  id BIGINT NOT NULL AUTO_INCREMENT,
  bank_code VARCHAR(3) NOT NULL,        -- 银行代码，
  bank_name VARCHAR(40) NOT NULL,       -- 银行名称
  bank_type INT NOT NULL,               -- 银行类型
  type_name VARCHAR(40) NOT NULL,       -- 类型名称
  PRIMARY KEY(id),
  KEY(bank_code)
);

-- create bankbranch
CREATE TABLE IF NOT EXISTS t_static_bankbranch (
  id BIGINT NOT NULL AUTO_INCREMENT,
  bank_code VARCHAR(3) NOT NULL,        -- 银行代码，
  bank_name VARCHAR(40) NOT NULL,       -- 银行名称
  branch_code VARCHAR(12) NOT NULL,     -- 银行（支行）行号
  branch_name VARCHAR(100) NOT NULL,    -- 支行名称
  region_code VARCHAR(4) NOT NULL,      -- 银行地区代码
  PRIMARY KEY(id),
  KEY(bank_code),
  KEY(branch_code)
)AUTO_INCREMENT = 100000;

CREATE TABLE IF NOT EXISTS t_static_currency (
  id BIGINT NOT NULL AUTO_INCREMENT,
  currency VARCHAR(3) NOT NULL,
  name VARCHAR(60) NOT NULL,
  cname VARCHAR(100) NOT NULL,
  code VARCHAR(3),
  minor_unit VARCHAR(4),
  PRIMARY KEY(id),
  KEY(currency)
);

CREATE TABLE IF NOT EXISTS t_static_industrial_category (
  category_id BIGINT NOT NULL AUTO_INCREMENT,
  category_code VARCHAR(4) NOT NULL,
  category_name VARCHAR(40) NOT NULL,
  subcode VARCHAR(4) NOT NULL,
  subname VARCHAR(100) NOT NULL,
  applicable VARCHAR(100),
  description VARCHAR(100),
  permit VARCHAR(255),
  PRIMARY KEY(category_id),
  KEY(category_code),
  KEY(subcode)
);
