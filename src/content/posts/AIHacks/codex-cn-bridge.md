---
title: Codex App接入国产模型
published: 2026-05-13
description: 本地代理把 OpenAI Responses API 转成标准 Chat Completions API，Codex 桌面端可以直接用 DeepSeek、智谱 GLM、Kimi、通义千问、豆包。
tags:
  - AI
  - Codex
  - OpenAI
  - DeepSeek
  - 智谱
  - Kimi
  - 代理
category: AIHacks
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513182501123.webp
---
Codex App 最近在推特上很火，但没 GPT Pro 会员就用不了，每月 200 刀也不便宜。能不能接国产模型？逛 GitHub 发现了 **codex-cn-bridge**。

它是个本地代理，专门解决 Codex 只能用官方 GPT 的问题——把 OpenAI 的 `Responses API` 翻译成标准 `Chat Completions API`，让 Codex 桌面端、CLI、VS Code 插件都能直接用国产大模型。

**项目地址：**
https://github.com/git-liu835/codex-cn-bridge

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513182501123.webp)



### 闲话

今天打开 Codex App 突然弹了个电话号码验证，给我整懵了。搜了一圈发现不少人中招，现在确实开始要手机号了。

好多人推荐新的 hero-sms 网站。我试了几个，要么收不到 Codex 验证码，要么填了某些国家的号码 OpenAI 直接发 WhatsApp 上，体验很差。

不想折腾的同学可以去公号：**大强同学**，后台回「**Codex**」，有最新接码渠道。按那个方法一下就过了。

另外，如果你A电脑无需验证，B电脑需验证，只需将A电脑的auth.json复制一份粘贴B电脑，那Codex APP和 CLI它们共享同一个 `.codex` 配置目录，认证和配置都是互通的。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513200113027.webp)


---



### 实现原理

Codex 用的是 OpenAI 的 **Responses API**（新格式），其他大模型只支持标准 **Chat Completions API**（旧格式）。

代理做的事：接收 Codex 的 Responses 请求 → 翻译成 Chat Completions → 转发给国产模型 API → 把响应翻回来 → 流式推给 Codex。都在本地跑，数据不经过第三方。

---

### 安装与配置

#### Windows 桌面版安装

#### 1. 下载安装

去 [Releases](https://github.com/git-liu835/codex-cn-bridge/releases) 下 Windows 安装包：
```
code-CN-Bridge-Setup-0.1.0.exe
```

双击装就行，不用装 Python。

#### 2. 图形界面配置

打开 Code CN Bridge → **模型配置** → 添加卡片：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513174446114.webp)

点 **保存**，然后去仪表板点 **启动**。

#### 3. 确认代理在跑

仪表盘看到运行中说明在跑

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513174613088.webp)


---

#### Codex 客户端配置

#### 改 config.toml

文件位置：
```
C:\Users\你的用户名\.codex\config.toml
```

内容：
```toml
model_provider = "custom"
model = "gpt-5.4"  # 代理会自动映射成你选的国产模型

[model_providers.custom]
name = "custom"
base_url = "http://127.0.0.1:8765/v1"
wire_api = "responses"
```

#### 改 auth.json

文件位置：
```
C:\Users\你的用户名\.codex\auth.json
```

随便填，Bridge 会用图形界面里配的真实 Key：
```json
{
  "OPENAI_API_KEY": "sk-anything-works"
}
```

---

### 启动顺序

1. **先打开 Code CN Bridge**，看到 "代理运行中"
2. 重启 Codex，完事。

顺序反了的话把 Codex 彻底关掉（托盘右键 → Exit）再重来。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513175849525.webp)

---

### 最后

这个工具解决的就一件事：**不想给 OpenAI 交钱，又想用 Codex**。国产模型的 coding 能力其实不差，DeepSeek V3、Kimi K2 写代码都是有口碑的，配上 Codex 的交互体验，日常开发够用了。

有个小提示：代理跑在本地 `127.0.0.1:8765`，只监听本机，不用担心安全问题。但记得 API Key 别在别处泄露。

项目还在快速迭代，遇到 bug 去 GitHub Issues 反馈，作者响应挺快的。


