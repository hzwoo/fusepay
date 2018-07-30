# Fusepay聚合支付系统

## 概述

### 目录结构

```
fusepay
  |-package.json
  |-server.js
  |-lib
  |  |-common
  |  |  |-templates
  |  |-controllers
  |  |  |-admin
  |  |  |-agent
  |  |  |-cron
  |  |  |-gateway
  |  |  |-installer
  |  |  |-merchant
  |  |-middleware
  |  |-models
  |  |  |-nosql
  |  |  |-sql
  |  |-modules
  |  |  |-access
  |  |  |-admission
  |  |  |-channel
  |  |  |-cron
  |  |  |-gateway
  |  |  |-member
  |  |  |-merchant
  |  |  |-object
  |  |  |-rate
  |  |  |-security
  |  |  |-static-data
  |  |  |-system
  |  |-services
  |  |  |-admin
  |  |  |-gateway
  |  |  |-merchant
  |  |  |-agent
  |-test
  |-logs
```


## 安装

### 使用源码安装

从github下载源代码仓库

```
$ git clone https://github.com/hzwoo/fusepay.git
```

安装依赖包

```
$ cd fusepay
$ npm install
```

### 使用Docker

## 启动

通过`npm`命令启动系统

```
$ npm start    # 启动默认环境
$ npm run dev  # 启动开发环境
$ npm run prod # 启动生产环境
```

可修改`package.json`中`congfig.status`参数设置系统的默认启动方式

`package.json`文件中其他配置如下：

```
  "config": {
    "host": "localhost", 
    "port": 3000,
    "services": {     // 设置启动的服务，1-启动，0-不启动 
      "admin": 1,     // 运营管理中台服务
      "gateway": 1,   // 聚合支付网关服务
      "cron": 0,      // 定时任务服务
      "merchant": 0,  // 商户管理服务
      "agent": 0,     // 代理商管理服务
      "installer": 0  // 安装服务
    },
    "status": "dev",  // 指定系统的默认启动方式，'dev'-开发模式， 'prod'-生产模式
    "name": "fusepay-server",
    "logdir": "logs"
  }
```


## 支付服务访问方式

### Api Key

商户通过接口访问聚合支付服务需获取**Api Key**, 系统采用Basic验证方式验证头部信息，因此需要设置http头部的**Authorization**字段, 如下：

```
Authorization: Basic api_live_xxxxxxxxxxx
```

## 管理中台访问方式

管理中台包括运营管理中台、商户管理中台和代理商管理中台。其中运营管理中台为聚合支付服务商提供运营支撑，而商户管理中台和代理商管理中台分别为商户和代理商提供运营支撑服务

### 获取访问Token

客户端成功登录后可获得系统的访问Token，在访问受限服务时需要在http头部包含此Token。

### 刷新访问Token

访问Token的默认有效期为15分钟（900秒），客户端需定时刷新Token以更新有效期。