---
title: Zed安装使用教程
published: 2026-04-09
tags: []
category: AIHacks
draft: false
pinned: false
---

Zed 是 Rust 编写、GPU 加速的跨平台开源代码编辑器（Windows/macOS/Linux），主打**极速性能、原生 AI 代理协作、实时多人开发**，定位为下一代 AI 驱动的 IDE，由 Atom/Tree-sitter 核心团队打造，兼顾个人开发与团队协作Zed



定价：基础编辑器永久免费（无 AI 功能）；Zed Pro 含免费额度，付费版 20 美元 / 月（500 次提示），协作功能全用户免费



## 一.下载安装

官方版：

https://zed.dev/

汉化版：

https://github.com/x6nux/zed-globalization

https://github.com/tc999/zed-loc

https://github.com/qq602431132/zed-fanyi



ps.如报错如下DLL错误

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260409133730352.webp)

第三方 DLL 网站下载[windowsperformancerecordercontrol.DLL](http://windowsperformancerecordercontrol.DLL)

将文件粘贴到你电脑的 `C:\Windows\System32` 目录（64 位系统）

执行注册命令

```
regsvr32 windowsperformancerecordercontrol.DLL
```

## 二.初始配置

### 

### 1.**常用快捷键**

1. 打开设置：`Ctrl + ,`
2. 打开主题切换面板：`Ctrl + K + Ctrl + T`
3. 打开扩展插件面板：`Ctrl + Shift + X`
4. 打开Agent面板：`Ctrl + Shift + /`
5. 打开文件夹：`Ctrl + O`
6. 快速打开文件：`Ctrl + P`
7. 打开命令面板（全能入口）：`Ctrl + Shift + P`
8. 打开快捷键配置：`Ctrl + K + Ctrl + S`
9. 新建编辑器窗口：`Ctrl + Shift + N`
10. 新建对话：`Ctrl + N`
11. 查看 AI 聊天历史：`Ctrl + Shift + H`

### 2.**安装使用opencode插件**

Ctrl + Shift + X打开扩展插件面板，搜索安装**opencode**

Ctrl + Shift + /打开Agent面板选择opencode进行对话

> **OpenCode插件提供的免费模型清单**
>
> 1. OpenCode Zen/Qwen3.6 Plus Free（接近 Claude Opus）
> 2. OpenCode Zen/Qwen3.6 Plus Free (low)
> 3. OpenCode Zen/Qwen3.6 Plus Free (medium)
> 4. OpenCode Zen/Qwen3.6 Plus Free (high)
> 5. OpenCode Zen/Nemotron 3 Super Free
> 6. OpenCode Zen/Nemotron 3 Super Free (low)
> 7. OpenCode Zen/Nemotron 3 Super Free (medium)
> 8. OpenCode Zen/Nemotron 3 Super Free (high)
> 9. OpenCode Zen/MiniMax M2.5 Free（首选，对标 Claude Opus）

很多人担心换编辑器要重新适应，Zed 这点也很友好。它支持导入 VS Code 的快捷键配置，不用重新记一堆新快捷键，上手零成本。



而且社区插件生态虽然不如 VS Code 成熟，但常用的插件基本都有，足够满足日常开发需求，关键是插件加载也快，不会拖慢编辑器速度。