---
title: OpenCli
published: 2026-03-24
tags:
  - cli
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_ioq7uwioq7uwioq7.webp
---

在AI Agent时代，大模型最缺的是“操作能力”。[OpenCLI](https://github.com/jackwener/opencli) 巧妙地解决了这个问题：它通过复用你本地 Chrome 的登录状态，让 AI 能够像调用 API 一样在终端直接查热搜、发动态或抓取数据。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_ioq7uwioq7uwioq7.webp)

## **环境准备**

- Node.js，版本需≥20.0.0
- 已安装Chrome浏览器

## **安装OpenCLI**

```bash
# 全局安装
npm install -g @jackwener/opencli

# 验证安装是否成功
opencli --version
```

## **配置浏览器桥接** 

1. 下载OpenCLI的Chrome扩展（[点此下载](https://github.com/jackwener/opencli/releases/tag/v1.4.1)）并安装
2. 运行 opencli doctor检查扩展程序与本地后台服务（Daemon）的连接状态

## 快速上手

配置完成后，你可以尝试以下命令来确认工具是否正常工作：

运行opencli setup，该命令会自动从Chrome浏览器中检测并配置Playwright MCP Bridge扩展的token，完成浏览器连接性验证。



完成以上步骤后，即可在终端中使用`opencli`命令操作支持的网站或Electron应用，例如：

```
opencli bilibili hot --limit 5  # 查看B站热门视频
opencli zhihu hot -f json       # 查看知乎热榜并以JSON格式输出
```

## **集成到 AI Agent**

如果你正在使用 [Claude Code](https://github.com/joeseesun/opencli-skill) 或其他智能体，可以将 OpenCLI 作为“技能”添加。
只需在 Agent 的系统提示词（如 `.cursorrules`）中加入：

> "You have a tool called opencli. Run `opencli list` to see available commands to browse the web."

OpenCLI 的安装非常直观，关键在于浏览器插件的桥接。一旦打通，你的终端就不再只是一个冷冰冰的控制台，而是通往整个 Web 世界的万能钥匙。



文章来源：[dqtx.cc](https://www.dqtx.cc/)  远程技术支持：[fix.dqtx.cc](https://fix.dqtx.cc/)

