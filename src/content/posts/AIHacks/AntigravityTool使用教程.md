---
title: AntigravityTool使用教程
published: 2026-02-13
tags: []
category: AIHacks
draft: false
pinned: false
---

Antigravity Tool 是一款智能代理项目，用于将Antigravity内的模型转换为不同协议标准 API，支持OpenAI 协议，Anthropic协议，Gemini 协议，本文主要演示供Claude使用。

| 协议           | 供给          |
| -------------- | ------------- |
| OpenAI 协议    | OpenCode      |
| Anthropic 协议 | Claude Code   |
| Gemini 协议    | Cherry Studio |



## 安装Antigravity Tools

项目地址https://github.com/lbjlaq/Antigravity-Manager

在 Antigravity Tools 桌面软件添加账号，打开浏览器通过谷歌账号登录 Antigravity

> ⚠️授权登录不，魔法开启了“TUN模式"或“虚拟网卡模式”
> 或者切换魔法新加坡  或使用[Proxifier 强制代理](https://zhuanlan.zhihu.com/p/1976637026888619563)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251227230252709.webp)

## 接入Claude Code 

#### 前置准备

- **Node.js**

https://nodejs.org/zh-cn/download

- **Git**

https://git-scm.com/install/windows

#### 安装Claude Code

```
npm install -g @anthropic-ai/claude-code
```

安装完成后，输入下面的命令查看是否安装成功。只要能看到版本号，就表示已经就绪：

```
claude --version
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251227225923134.webp)

#### 配置环境变量

#### 方法1：命令

启动 Antigravity，并在“API 反代”页面开启服务。
在bash终端执行：

```
export ANTHROPIC_API_KEY="你的API"
export ANTHROPIC_BASE_URL="http://127.0.0.1:8045"
Claude
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251227230150665.webp)

#### 方法2：CC Switch

下载地址https://github.com/farion1231/cc-switch/tags

> 打开Antigravity Tools，“API 反代 ”---“启动服务”----多协议支持---Anthropic 协议：拿到base_url，api_key，复制一个模型名称
>
> 
>
> 打开CC Switch，Claude---右上方“+”---自定义配置，填写API Key、官网链接/请求地址、主模型



## 写在最后

Antigravity Tools可以添加多个 Google 账号，每个账号都有一定的 Antigravity 模型额度，如果额度不够可点击切换账号，智能切换到额度足够的账号。

**大强远程技术支持：742112.xyz**