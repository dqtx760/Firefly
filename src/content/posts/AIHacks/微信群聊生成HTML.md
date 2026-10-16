---
title: 微信群聊生成HTML
published: 2026-10-11
tags:
  - wechat
  - mcp
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-weflow-chat-report-20261011-172631.webp
---
今天这篇文章，我来教大家如何让 AI 帮你整理群聊。

其实我要用到一个工具，把它的 API 通过 MCP 的方式配置到任意 Agent 里面。然后，再借助我写的一个 skill，你只需要提供一个群的名字，它就会自动帮你整理当天的群聊，生成每一个非常美观的 HTML。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-weflow-chat-report-20261011-172631.webp)



### 第一步：安装 WeFlow，启用 API 服务并配置 MCP

1. [下载 WeFlow 安装包](https://pan.xunlei.com/s/VP1LIQZGCXCfvEMV53Ut48uWA1?pwd=cs4s)，提取码：`cs4s`。
2. 按 WeFlow 引导连接自己的微信数据库，在设置中启用 **API 服务**，复制自己的 **Access Token**。
3. 安装 Node.js/npm，在 AI 客户端配置 WeFlow MCP。提示词示例：

```
帮我配置此MCP服务
{
  "mcpServers": {
    "weflow": {
      "command": "npx",
      "args": ["-y", "weflow-mcp"],
      "env": {
        "WEFLOW_BASE_URL": "http://127.0.0.1:5031",
        "WEFLOW_ACCESS_TOKEN": "填写你自己的 Access Token"
      }
    }
  }
}
```


### 第二步：安装这个 skill
提示词
```
帮我安装
https://github.com/dqtx760/dqtx-WeFlow-Daily
```

### 第三步：开始使用

示例

```
/dqtx-WeFlow-Daily 大强·软件研习社
```

```
/dqtx-WeFlow-Daily Obsidian 交流群
```

```
/dqtx-WeFlow-Daily 姜胡说杭州活动 AI众筹（正式群）
```


