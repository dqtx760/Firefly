---
title: Obsidian+Claude：AI超级大脑架构设计
published: 2025-10-25
tags: []
category: AIHacks
draft: false
pinned: false
---

很多人理解思维OS理念，却被Obsidian文件散乱问题困扰，难以高效管理知识与内容。为满足程序员与多平台创作者的创作效率需求，我设计了这套AI超级大脑架构，于是有了这篇文章。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260213215428541.webp)



## 从 “思考库” 到 “内容工厂”

很多人理解思维 OS，却卡在文件混乱。

问题并不在于不会记笔记，而在于没有“生产结构”。

当 Obsidian 只是存储容器，知识会堆积；

当它变成生产系统，内容才会流动。

核心矛盾只有一个：

素材越来越多

 产出却没有变快

如果无法形成“输入 → 加工 → 输出”的闭环，思维系统一定会熵增。

## 让Claude 驻场 Obsidian（3 步落地）

目标很简单：让 AI 不再是外部助手，而是仓库成员。

关键动作有三个：

接入 Claudian，配置 Opus + yolo 权限

 启用 Terminal，实现命令行调用

 建立 .claude/skills/ 目录统一管理

做到这一步，Obsidian 才真正升级为协作工作台。

## 能力扩展：技能系统的逻辑

技能的价值不在数量，而在场景覆盖。

给你看看我安装16 个 Skills ，覆盖六类能力：内容生成、排版转换、图像处理、视频处理、项目规划、设计开发。

判断一个 Skill 是否值得安装，只看一个标准：

它是否替代了一个高频重复动作。

| #   | Skill 名称                      | 功能说明                 |
| --- | ----------------------------- | -------------------- |
| 1   | **baoyu-article-illustrator** | 文章配图生成           |
| 2   | **baoyu-url-to-markdown**     | URL 转 Markdown       |
| 3   | **image**                     | AI 图片生成（通义千问）|
| 4   | **md2wechat-skill**           | Markdown 转微信格式   |
| 5   | **nano-banana-ppt**           | PPT 生成              |
| 6   | **notebooklm**                | NotebookLM 自动化     |
| 7   | **obsidian-skills**           | Obsidian 相关技能     |
| 8   | **planning-with-files**       | 文件式项目规划        |
| 9   | **prompt-skills**             | 提示词技能            |
| 10  | **ui-skills**                 | UI/UX 技能集          |
| 11  | **ui-ux-pro-max**             | UI/UX 专业设计        |
| 12  | **url-to-markdown**           | URL 转 Markdown（另一版本） |
| 13  | **youtube-clipper-skill**     | YouTube 视频智能剪辑  |
| 14  | **youtube-transcript-cn**     | YouTube 字幕转中文    |
| 15  | **ai-writing-assistant**      | AI 写作助手（6 种方法） |
| 16  | **mcp-builder**               | MCP 服务器开发指南    |

## 生产流程：30 分钟闭环

完整创作路径可以压缩为四步。



素材输入：Web Clipper 直接转 Markdown

通过 Obsidian Web Clipper 剪藏网页信息源，直接生成 Markdown 文件存入 Obsidian



AI 初稿：依据 CLAUDE.md 规则生成草稿



内容增强：自动配图 + 排版优化

调用 “baoyu-article-illustrator” Skill 完成文章配图自动生成

通过 Wechat Converter 插件一键推送到公众号平台



多平台分发：公众号排版 + 分发工具同步

爱贝壳一键内容分发多平台



闭环完成。

## 系统内核：CLAUDE.md

如果只保留一个文件，那就是 CLAUDE.md。

它承担四个职责：

定义身份

规范技能触发

固化工作流

记录迭代规则

它相当于系统的调度层。

## 最小可以行动愿景

如果你刚开始，只做三件事：

安装 Claudian插件

写 10 行 CLAUDE.md

测试文章配图skill

先跑通一次，再谈扩展。



