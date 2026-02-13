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



## 一、核心前提：从 “思考库” 到 “内容工厂”
### 1.1 核心痛点
懂思维 OS 理念，却陷入文件散乱的管理困境

### 1.2 核心需求
满足程序员 + 多平台创作者的 “素材→生产→分发” 全链路效率诉求

### 1.3 核心目标
搭建 “输入→AI 加工→输出” 的闭环创作流水线



## 二、基础搭建：Claude 驻场 Obsidian（3 步落地）
### 2.1 核心插件配置
- Claudian：配置 Opus 模型 + yolo 权限
- Terminal：支持 Obsidian 内调用命令行，无需切换应用

### 2.2 搭建本质
将 Obsidian 升级为 “AI 协作工作台”，实现工具集成与高效协同



## 三、核心能力：自定义工具箱体系
### 3.1 自定义 Skills 管理
- 存储路径：.claude/skills/ 目录统一管理

- 我安装的 16 个 Skills 安装部署

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

### 3.2 辅助插件
- Wechat Converter：公众号排版与一键发布
- Git 插件：文件备份同步至 GitHub

### 3.3 浏览器配套插件
- Obsidian Web Clipper：网页内容剪藏（直接转为 Markdown 格式）
- 爱贝壳：多平台内容分发工具



## 四、实战演示：30 分钟内容创作流水线
### 4.1 步骤 1：素材输入
通过 Obsidian Web Clipper 剪藏网页信息源，直接生成 Markdown 文件存入 Obsidian

### 4.2 步骤 2：AI 初稿生成 + 人工微调
依据记忆文件 CLAUDE.md 触发 AI 撰写初稿，配合人工进行内容优化

### 4.3 步骤 3：内容配图
调用 “baoyu-article-illustrator” Skill 完成文章配图自动生成

### 4.4 步骤 4：平台分发
通过 Wechat Converter 插件一键推送到公众号平台，再通过爱贝壳一键内容分发多平台



## 五、系统灵魂：CLAUDE.md 四大核心编码
### 5.1 编码 1：身份定义
明确自身标签 + 能力短板，为 AI 决策提供适配依据

### 5.2 编码 2：Skills 手册
包含 Skill 启动触发条件 + 场景对应关系（如公众号封面生成 / 文章配图等）

### 5.3 编码 3：工作流模板
提供分平台完整创作发布步骤，标准化流程执行

### 5.4 编码 4：迭代规则
记录流程错误、优化方向的活文档，支持系统持续迭代



## 六、总结：核心要素与起步指南
### 6.1 核心三要素
- 容器：Obsidian（承载内容与工具集成）
- 智能：Claude Code + Claudian（AI 核心能力支撑）
- 双手：Skills（自定义功能扩展）

### 6.2 起步三步法
1. 安装核心插件（Claudian、Terminal 等）
2. 编写 10 行极简版 CLAUDE.md（完成基础配置）
3. 测试 “网页转 Markdown” Skill（验证基础流程）

### 6.3 核心价值
让思考方式、工作流程显性化 + 高效化，实现创作全链路提效

