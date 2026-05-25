---
title: 微信内容同步到 Obsidian：灵感随手记，自动入库
published: 2026-05-26
tags:
  - obsidian
  - wechat
  - workflow
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/IMG_1177.webp
---
微信里看到的好文章、一闪而过的灵感、随手录的语音备忘——怎么快速存进 Obsidian？

网上有人用 vib coding 做了一个「Obsidian 内容同步助手」，微信小程序 + Obsidian 插件配合，支持剪贴板、录音、网页链接、文件同步。实测可用，流程很轻。

### 操作步骤

**一步：绑定小程序**

微信搜索小程序「Obsidian 内容同步助手」→ 首页点击「绑定 Obsidian」→ 复制 6 位绑定码。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/IMG_1177.webp)

**二步：安装插件**

在 Obsidian 社区插件市场搜索 **WeChat Inbox Sync**，安装后进入设置，粘贴绑定码，点击「立即绑定」。记得勾选「启动时自动同步」。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260526003152490.webp)

### 使用体验

整体流畅，两个小槽点：

- **非实时同步**：微信复制链接后打开小程序点「读取网页链接」，不会立即推送到 Obsidian，需要手动点击插件里的同步按钮
- **开屏广告**：小程序有广告，毕竟作者花时间开发，可以理解

好消息是每次重新打开 Obsidian 会自动拉取未同步的内容，日常使用影响不大。

参考：[飞书教程：WeChat Inbox Sync](https://my.feishu.cn/wiki/EPHhwqRobijHqfkAqjMcDEgvnlf)