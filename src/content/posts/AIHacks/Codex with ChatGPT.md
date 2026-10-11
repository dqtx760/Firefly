---
title: Codex with ChatGPT：让 ChatGPT 负责思考，Codex 负责执行
published: 2026-08-31
tags:
  - Codex
  - ChatGPT
  - AIHacks
category: AIHacks
draft: false
pinned: false
image:
description: 用 ChatGPT 网页版的闲置额度给 Codex 做规划审查，不用 API Key，不用逆向。
---
 ChatGPT Plus 网页版的配额天天在浪费，Codex 却用着紧张的 API 额度做规划和 Review。这个开源项目把两边的角色拆开：**思考交给已付费的网页版 ChatGPT，执行留给本地 Codex**。不需要 API Key，不需要逆向代理，就是浏览器 + 一条只读 MCP 桥接。

项目地址：[XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt)

安装的话，直接把这个 repo 丢给 Codex 就行，它会帮你配好。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260831004958231.webp)

### 它解决什么问题

Codex 单独干活有个短板：规划能力弱。它擅长改代码、跑测试，但让它在多个方案里选最优路径、审查自己的改动有没有遗漏——经常翻车。而 ChatGPT 网页版恰好擅长这些，Plus 用户的配额还经常闲置。

这俩本来在两个世界里，这个项目用一条 MCP 连接把它们串起来了。

### 实际效果

实际用下来的分工大概是：

- **ChatGPT 网页端**：分析现有代码结构，出方案，检查 Codex 改完的结果
- **Codex 本地**：写代码、跑测试、改文件
- **你的本地仓库**：全程不会上传到任何服务器

典型对话像这样：你对 Codex 说"帮我在网站里加个搜索功能，先看下现有结构，给最小改动方案，改完测试"，Codex 会去拉 ChatGPT 的分析，然后本地执行。

实际体验上，ChatGPT 的规划质量明显比 Codex 自己兜圈子高，尤其是改一个你不熟悉的项目时。Codex 的执行速度也没受影响，该快的还是快。

### 局限

- ChatGPT 的分析基于它"看到"的代码片段，不是整个仓库上下文，大项目里可能有盲区
- 依赖 ChatGPT 网页版的可用性，偶尔 OpenAI 网页端抽风就断了
- 本质上是个桥接工具，不是银弹，复杂任务还是得人盯着

### 使用方式

对 Codex 直接说：

> 使用 Codex with ChatGPT，帮我实现 XXX。先检查现有项目，给出最小改动方案，完成后测试并复核。

