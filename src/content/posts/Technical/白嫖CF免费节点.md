---
title: 白嫖CF免费节点
published: 2026-10-06
tags:
  - Cloudflare
  - Worker
  - 节点
category: Technical
draft: false
pinned: false
image:
---
买机场怕跑路，租 VPS 又要月付。其实只要有一个托管在 Cloudflare 的域名，就能白嫖一条属于自己的线路——**不花钱、不用服务器、不碰命令行**，全程浏览器点几下。

原理不复杂：CF Worker 免费额度每天 10 万次请求，拿它跑一个轻量转发脚本，流量就直接从 CF 边缘节点走。你只需要填个 UUID、挑个优选 IP，线路就活了。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-cf-worker-free-line-20261011-170352.webp)


### 条件
- Cloudflare账号
- cf托管域名cf账号


### 部署

Worker编辑代码，然后里面的代码替换项目中的edgetunnel经典轻量版

项目地址
https://github.com/byJoey/cfnew


UUID生成器
https://tool.lu/uuid/
或者Powershell
```
Powershell -Command "[guid]::NewGuid()"
```

IP
https://bestcf.pages.dev/


超时：
设置-兼容日期

### 使用示例：

```
https://你的域名/UUID
```