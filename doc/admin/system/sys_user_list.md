# 获取系统用户列表

**Path:** /admin/system/users

**Method:** GET

**请求参数格式:** Form或JSON

## 请求参数

**公共参数**

| 参数名 | 类型 | 含义 | 描述 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| timestamp | Number | Unix时间戳 | 1970年1月1日至今的秒数 | Y | - |

**业务参数**

| 参数名 | 类型 | 含义 | 描述 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| agency\_id | Number | 受理机构ID | 受理机构ID | Y | - |

**请求数据示例**

```
{
  timestamp: 1479916122,
  agency_id: 100001,
  agency_name: '瑞赛-东海银行',
  agency_type: 'BANK',
  channel_id: 1,
  channel_type: 'ALIPAY',
  handling_type: 'COMMISSION_DIRECT',
  deposit_enabled: 1,
  bank_id: 666,
  region_id: '4400',
  bank_name: '东海银行',
  branch_name: '东海银行南山支行',
  account_type: '企业账户',
  account_name: '深圳瑞赛网络科技有限公司',
  account_no: '1234567890123456'
}
```

##响应参数 

**公共参数**

| 参数名 | 类型 | 含义 | 描述 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| timestamp | Number | Unix时间戳 | 1970年1月1日至今的秒数 | Y | - |

**业务参数**

| 参数名 | 类型 | 含义 | 描述 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| agency\_id | Number | 受理机构ID | 受理机构ID | Y | - |

**响应数据示例**

```
{
  return_code: 'OK',
  timestamp: 1479916799,
  result_code: 'SUCCESS',
  result: {
    agency_id: 100001,
    agency_name: '瑞赛-东海银行',
    agency_type: 'BANK',
    channel_id: 1,
    channel_type: 'ALIPAY',
    handling_type: 'COMMISSION_DIRECT',
    deposit_enabled: 1,
    bank_id: 666,
    region_id: '4400',
    bank_name: '东海银行',
    branch_name: '东海银行南山支行',
    account_type: '企业账户',
    account_name: '深圳瑞赛网络科技有限公司',
    account_no: '1234567890123456'
  }
}
```