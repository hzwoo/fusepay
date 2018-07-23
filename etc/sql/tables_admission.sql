

-- Admission states
-- PENDING - 待处理
-- SUBMITTED - 已提交
-- REVIEWING - 审核中
-- PROCESSING - 处理中
-- REJECTED - 已驳回
-- APPROVED - 已审核
-- REVOKED - 已撤销
-- CLOSED - 已关闭
-- FINISHED - 已完成


CREATE TABLE IF NOT EXISTS t_admission_application(
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_id BIGINT,
  agent_id BIGINT,
  status VARCHAR(40) NOT NULL DEFAULT 'PENDING', -- 状态
                                      -- PENDING   - 待处理
                                      -- SUBMITTED - 已提交
                                      -- ASSIGNED  - 处理中
                                      -- REJECTED  - 已驳回
                                      -- CLOSED    - 已关闭
  time_created DATETIME NOT NULL, -- 创建时间
  time_updated DATETIME NOT NULL, -- 更新时间
  time_closed DATETIME,           -- 结单时间
  is_spam TINYINT(1) NOT NULL DEFAULT 0,
  is_submitted TINYINT(1) NOT NULL DEFAULT 0,
  is_closed TINYINT(1) NOT NULL DEFAULT 0,
  applied_method VARCHAR(40) NOT NULL DEFAULT 'WAP', -- 提交方式
                                -- WEB
                                -- WAP
                                -- WEIXIN
                                -- APP
                                -- BOSS
  applied_type VARCHAR(40) NOT NULL,  -- 申请单主类型（如果同时提交商户和门店申请，主类型为商户进件）

  op_user_id VARCHAR(40) NOT NULL,    -- 提交人ID
  op_user_name VARCHAR(40) NOT NULL,  -- 提交人姓名
  op_user_type VARCHAR(40) NOT NULL DEFAULT 'STAFF', -- 提交人类型
                                      -- MERCHANT - 商户
                                      -- AGENT - 代理商
                                      -- STAFF - 员工
  application TEXT, -- 进件申请材料列表，JSON
                  -- application: [
                  --    {
                  --      type: 'MERCHANT_REGISTER',
                  --      data: { ... }
                  --    },
                  --    {
                  --      type: 'BRANCH_REGISTER',
                  --      data: { ... }
                  --    }
                  -- ]
  remark VARCHAR(255), -- 注释
  PRIMARY KEY(id)
)AUTO_INCREMENT = 10000000;

CREATE TABLE IF NOT EXISTS t_admission_contract(
  id BIGINT NOT NULL AUTO_INCREMENT,
  subject VARCHAR(128),
  type VARCHAR(20),
  date_start INT NOT NULL,
  date_end INT NOT NULL,
  PRIMARY KEY(id)
)AUTO_INCREMENT = 10000000;


CREATE TABLE IF NOT EXISTS t_admission_merchant_case(
  id BIGINT NOT NULL AUTO_INCREMENT,
  merchant_name VARCHAR(128),
  case_type VARCHAR(40) NOT NULL DEFAULT 'MERCHANT_REGISTER',
  case_status VARCHAR(40) NOT NULL DEFAULT 'MERCHANT_MATERIAL_PENDING', -- 进件状态
                                        -- MERCHANT_MATERIAL_PENDING   - 资料未提交,
                                        -- MERCHANT_MATERIAL_REVIEWING - 资料待审核,
                                        -- MERCHANT_MATERIAL_REJECTED  - 资料已驳回
                                        -- MERCHANT_MATERIAL_APPROVED  - 资料已通过
                                        -- MERCHANT_MATERIAL_REVOKED   - 资料已撤销
                                        -- MERCHANT_AGREEMENT_PENDING  - 协议未签署
                                        -- MERCHANT_AGREEMENT_APPROVED - 协议已签署
                                        -- MERCHANT_CONFIG_PENDING  - 配置未完成
                                        -- MERCHANT_CONFIG_DONE     - 配置已完成
  op_user_id VARCHAR(40) NOT NULL,      -- 操作用户ID
  op_user_name VARCHAR(40) NOT NULL,    -- 操作用户名
  time_created DATETIME NOT NULL,       -- 创建时间
  time_updated DATETIME NOT NULL,       -- 更新时间
  payment_application TEXT, -- 支付申请表, JSON对象
                            -- {
                            --   'WX_QRCODE': '0.6',
                            --   'WX_SCAN': '0.6',
                            --   'WX_JSAPI': '0.6',
                            --   'ALI_QRCODE': '0.6',
                            --   'ALI_SCAN': '0.6',
                            --   'QQ_QRCODE': '0.6',
                            --   'QQ_SCAN': '0.6'
                            -- }
  comments TEXT,                        -- 处理意见, JSON对象数组, step: 'MATERIAL|ACCOUNT|AGREEMENT|CONFIG'
                                        -- [
                                        --   {
                                        --     step: 'MATERIAL|ACCOUNT|AGREEMENT|CONFIG',
                                        --     status: 'OPEN|CLOSED'
                                        --     op_user_id: xxx
                                        --     op_user_name: xxx
                                        --     time: yyyyMMddHHmmss
                                        --     comment: xxxxxxx
                                        --   },
                                        --   ...
                                        -- ]
  PRIMARY KEY(id)
)AUTO_INCREMENT = 100000;






CREATE TABLE IF NOT EXISTS t_admission_merchant_branch(
  id BIGINT NOT NULL AUTO_INCREMENT,
  merchant_id BIGINT NOT NULL,
  merchant_name VARCHAR(128) NOT NULL,
  branch_id VARCHAR(32),
  branch_name VARCHAR(128),
  case_type VARCHAR(40) NOT NULL DEFAULT 'BRANCH_REGISTER',
  case_status VARCHAR(40) NOT NULL DEFAULT 'ENTRY_MATERIAL_PENDING', -- 进件状态
                                        -- ENTRY_MATERIAL_PENDING   - 资料未提交,
                                        -- ENTRY_MATERIAL_REVIEWING - 资料待审核,
                                        -- ENTRY_MATERIAL_REJECTED  - 资料已驳回
                                        -- ENTRY_MATERIAL_APPROVED  - 资料已通过
                                        -- ENTRY_MATERIAL_REVOKED   - 资料已撤销
                                        -- ENTRY_CONFIG_PENDING  - 配置未完成
                                        -- ENTRY_CONFIG_DONE     - 配置已完成
  submitter_id VARCHAR(40) NOT NULL,    -- 提交人ID
  submitter_name VARCHAR(40) NOT NULL,  -- 提交人姓名
  submitter_type VARCHAR(40) NOT NULL DEFAULT 'STAFF', -- 提交人类型
                                      -- MERCHANT - 商户
                                      -- AGENT - 代理商
                                      -- STAFF - 员工
  time_created DATETIME NOT NULL,       -- 创建时间
  time_updated DATETIME NOT NULL,       -- 更新时间
  comments TEXT,                        -- 处理意见, JSON对象数组, step: 'MATERIAL|CONFIG'
                                        -- [
                                        --   {
                                        --     step: 'MATERIAL|CONFIG',
                                        --     status: 'OPEN|CLOSED'
                                        --     op_user_id: xxx
                                        --     op_user_name: xxx
                                        --     time: yyyyMMddHHmmss
                                        --     comment: xxxxxxx
                                        --   },
                                        --   ...
                                        -- ]
  PRIMARY KEY(id),
  KEY(merchant_id)
)AUTO_INCREMENT = 10000000;

CREATE TABLE IF NOT EXISTS t_admission_branch_detail(
  id BIGINT NOT NULL,
  merchant_id BIGINT NOT NULL,
  submission_method VARCHAR(40) NOT NULL DEFAULT 'BOSS', -- 提交方式
                                -- WEB
                                -- WAP
                                -- WEIXIN
                                -- APP
                                -- BOSS

  is_submitted TINYINT(1) NOT NULL DEFAULT 0,
  submitter_id VARCHAR(40) NOT NULL,    -- 提交人ID
  submitter_name VARCHAR(40) NOT NULL,  -- 提交人姓名
  submitter_type VARCHAR(40) NOT NULL DEFAULT 'STAFF', -- 提交人类型
                                      -- MERCHANT - 商户
                                      -- AGENT - 代理商
                                      -- STAFF - 员工

  time_created DATETIME NOT NULL,   -- 创建时间
  time_submitted DATETIME, -- 提交时间
  branch_type VARCHAR(40) NOT NULL DEFAULT 'STORE',   -- STORE: 线下门店, DEPARTMENT: 部门, SUBSIDIARY: 分/子公司
  branch_name VARCHAR(128) NOT NULL DEFAULT '', -- 门店名
  province VARCHAR(40)  NOT NULL DEFAULT '', -- 门店省份
  city VARCHAR(40)  NOT NULL DEFAULT '',    -- 门店城市
  district VARCHAR(40)  NOT NULL DEFAULT '',    -- 门店区县
  region_id VARCHAR(6) NOT NULL DEFAULT '', -- 门店行政区编码
  address VARCHAR(255) NOT NULL DEFAULT '', -- 门店地址
  branch_phone VARCHAR(20) NOT NULL DEFAULT '',      -- 办公电话/客服电话
  business_hours VARCHAR(100) NOT NULL DEFAULT '',
  branch_image1 VARCHAR(255), -- 商户门店照片, 线下商户填
  branch_image2 VARCHAR(255), -- 商户门店照片, 线下商户填
  branch_image3 VARCHAR(255), -- 商户门店照片, 线下商户填
  branch_image4 VARCHAR(255), -- 商户门店照片, 线下商户填
  PRIMARY KEY(id),
  KEY(merchant_id)
);

CREATE TABLE IF NOT EXISTS t_admission_channel(
  id BIGINT NOT NULL AUTO_INCREMENT,
  merchant_id BIGINT NOT NULL,
  merchant_name VARCHAR(128) NOT NULL,
  case_type VARCHAR(40) NOT NULL DEFAULT 'CHANNEL_REGISTER',
  case_status VARCHAR(40) NOT NULL DEFAULT 'CHANNEL_MATERIAL_PENDING', -- 进件状态
                                        -- CHANNEL_MATERIAL_PENDING   - 资料未提交
                                        -- CHANNEL_MATERIAL_DONE      - 资料已提交
                                        -- CHANNEL_REVIEW_PENDING     - 待渠道审核
                                        -- CHANNEL_REVIEW_DONE        - 渠道已审核
                                        -- CHANNEL_ACCOUNT_PENDING    - 账号未验证
                                        -- CHANNEL_ACCOUNT_DONE       - 账号已验证
                                        -- CHANNEL_AGREEMENT_PENDING  - 渠道未签约
                                        -- CHANNEL_AGREEMENT_DONE     - 渠道已签约
                                        -- CHANNEL_CONFIG_PENDING     - 渠道未配置
                                        -- CHANNEL_CONFIG_DONE        - 渠道已配置

  channel_id VARCHAR(40) NOT NULL,      -- 渠道ID
  channel_alias VARCHAR(100) NOT NULL,  -- 渠道别名
  op_user_id VARCHAR(40) NOT NULL,      -- 操作人用户ID
  op_user_name VARCHAR(40) NOT NULL,    -- 操作人用户名
  time_created DATETIME NOT NULL,       -- 创建时间
  time_updated DATETIME NOT NULL,       -- 更新时间
  comments TEXT,                        -- 处理意见, JSON对象数组
                                        -- [
                                        --   {
                                        --     step: 'MATERIAL|REVIEW|ACCOUNT|AGREEMENT|CONFIG',
                                        --     status: 'OPEN|CLOSED'
                                        --     op_user_id: xxx
                                        --     op_user_name: xxx
                                        --     time: yyyyMMddHHmmss
                                        --     comment: xxxxxxx
                                        --   },
                                        --   ...
                                        -- ]
  PRIMARY KEY(id),
  KEY(merchant_id)
)AUTO_INCREMENT = 100001;


CREATE TABLE IF NOT EXISTS t_admission_agent(
  id BIGINT NOT NULL AUTO_INCREMENT,
  agent_name VARCHAR(128),
  case_type VARCHAR(40) NOT NULL DEFAULT 'MERCHANT_REGISTER',
  case_status VARCHAR(40) NOT NULL DEFAULT 'ENTRY_MATERIAL_PENDING', -- 进件状态
                                        -- ENTRY_MATERIAL_PENDING   - 资料未提交,
                                        -- ENTRY_MATERIAL_REVIEWING - 资料待审核,
                                        -- ENTRY_MATERIAL_REJECTED  - 资料已驳回
                                        -- ENTRY_MATERIAL_APPROVED  - 资料已通过
                                        -- ENTRY_MATERIAL_REVOKED   - 资料已撤销
                                        -- ENTRY_ACCOUNT_PENDING  - 账号未验证
                                        -- ENTRY_ACCOUNT_REJECTED - 账号验证失败
                                        -- ENTRY_ACCOUNT_APPROVED   - 账号已验证
                                        -- ENTRY_AGREEMENT_PENDING - 协议未签署
                                        -- ENTRY_AGREEMENT_APPROVED  - 协议已签署
                                        -- ENTRY_CONFIG_PENDING  - 配置未完成
                                        -- ENTRY_CONFIG_DONE     - 配置已完成
  submitter_id VARCHAR(40) NOT NULL,    -- 提交人ID
  submitter_name VARCHAR(40) NOT NULL,  -- 提交人姓名
  submitter_type VARCHAR(40) NOT NULL DEFAULT 'STAFF', -- 提交人类型
                                      -- MERCHANT - 商户
                                      -- AGENT - 代理商
                                      -- STAFF - 员工
  time_created DATETIME NOT NULL,       -- 创建时间
  time_updated DATETIME NOT NULL,       -- 更新时间
  comments TEXT,                        -- 处理意见, JSON对象数组, step: 'MATERIAL|ACCOUNT|AGREEMENT|CONFIG'
                                        -- [
                                        --   {
                                        --     step: 'MATERIAL|ACCOUNT|AGREEMENT|CONFIG',
                                        --     status: 'OPEN|CLOSED'
                                        --     op_user_id: xxx
                                        --     op_user_name: xxx
                                        --     time: yyyyMMddHHmmss
                                        --     comment: xxxxxxx
                                        --   },
                                        --   ...
                                        -- ]
  PRIMARY KEY(id)
)AUTO_INCREMENT = 100001;


CREATE TABLE IF NOT EXISTS t_admission_agent_detail(
  id VARCHAR(28) NOT NULL,
  name VARCHAR(128) NOT NULL, -- 代理商名称
  type VARCHAR(16) NOT NULL, -- 代理商类型: INDIVIDUAL - 个人, BUSINESS - 公司
  time_created DATETIME NOT NULL,     -- 创建时间
  time_modified DATETIME NOT NULL,    -- 更新时间

  contact_name VARCHAR(60) NOT NULL,   -- 联系人姓名
  contact_email VARCHAR(100) NOT NULL DEFAULT '', -- 联系人邮箱
  contact_mobile VARCHAR(20) NOT NULL, -- 联系人手机

  office_phone VARCHAR(20),      -- 办公电话
  office_province VARCHAR(40),   -- 注册地省份
  office_city VARCHAR(40),       -- 注册地城市
  office_district VARCHAR(40),   -- 注册地区县
  office_region_id VARCHAR(6),   -- 注册地行政区编码
  business_hours VARCHAR(100),
  website_url VARCHAR(100),      -- 网站地址

  licence_name VARCHAR(255), -- 工商注册名称
  licence_address VARCHAR(255), -- 工商注册地址
  licence_no VARCHAR(40), -- 营业执照编号
  licence_since INT, -- 成立时间
  licence_expire INT, -- 结束时间
  licence_image VARCHAR(255), -- 营业执照图片（地址）

  legal_type VARCHAR(40) NOT NULL,  -- 法人/经办人
                                    -- LEGAL_REP - 法人,
                                    -- LEGAL_AGENT - 经办人
  legal_name VARCHAR(100) NOT NULL, -- 法人姓名
  legal_cert_type VARCHAR(40) NOT NULL, -- 法人证件类型
                                        -- IDENTITY_CARD - 身份证,
                                        -- PASSPORT - 护照
  legal_cert_no VARCHAR(40) NOT NULL, -- 法人证件编号
  legal_cert_since INT NOT NULL, -- 法人证件生效日期
  legal_cert_expire INT NOT NULL, -- 法人证件失效日期
  legal_cert_image1 VARCHAR(255) NOT NULL, -- 法人证件照正面（地址）
  legal_cert_image2 VARCHAR(255) NOT NULL, -- 法人证件照背面（地址）

  bank_province VARCHAR(40) NOT NULL,        -- 省份
  bank_city VARCHAR(40) NOT NULL,            -- 城市
  bank_district VARCHAR(40) NOT NULL,        -- 区县
  bank_region_code VARCHAR(4) NOT NULL,      -- 银行地区代码
  bank_name VARCHAR(100) NOT NULL,           -- 银行名称
  bank_branch_name VARCHAR(100) NOT NULL,    -- 支行名称
  bank_branch_code VARCHAR(12) NOT NULL,     -- 支行联行号
  bank_account_type VARCHAR(40) NOT NULL,    -- 账户类型
  bank_account_name VARCHAR(255) NOT NULL,   -- 开户名称
  bank_account_no VARCHAR(40) NOT NULL,      -- 开户账号

  agent_status TINYINT(1) NOT NULL DEFAULT 1,  -- 代理商状态, 0- 关闭, 1 -开启

  PRIMARY KEY(id),
  KEY(name)
);