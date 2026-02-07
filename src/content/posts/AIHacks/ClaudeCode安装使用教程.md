---
title: ClaudeCode安装使用教程
published: 2026-02-03T21:22:43.308Z
description: 1. Node.js 18 或更高版本 请前往 Node.js 官方网站安装最新 LTS 版本，确保 Claude Code 能正常运行。 https://no...
tags: ["效率工具","AI","Claude","Windows"]
draft: false
lang: zh_CN

image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202139189.webp
category: AIHacks
---

> 这几天，c彻底火了，网上都在夸赞这个由Anthropic出品的命令行AI编码工具。不同于那些花哨的AI插件，Claude Code直接住进你的终端，像个老司机一样帮你写代码、修bug、重构项目。我也测试了一圈下来，确实牛批！免费、不限量、速度快，关键是它真的能理解你的整个项目结构。今天，我就给大家整理一份保姆级教程，让你5分钟上手Claude Code。
>

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202139189.webp)

## 一.准备工作

1. **Node.js 18 或更高版本** 

请前往 Node.js 官方网站安装最新 LTS 版本，确保 Claude Code 能正常运行。

https://nodejs.org/en/download/

1. **Git（Windows 用户必需）** 

如果你使用 Windows，请提前安装 **Git for Windows**，否则后续依赖安装可能失败。

https://git-scm.com/install/windows

## 二.安装Claude Code

安装命令

```Plain
npm install -g @anthropic-ai/claude-code
```

安装完后，输入以下命令查看是否安装成功。能看到版本号，就表示已经就绪：

```CSS
claude --version
```

重新打开一个新的终端窗口，进入你的test项目，依次运行如下命令

```
cd test
claude
```

## 三.配置Claude Code的API

启动后会要求你授权，我自己是通过接入API的方法使用，你可以订阅智谱GLM Coding Lite，然后将API通过CC-switch进行管理启动，供Claude Code使用，当然你有gemini pro会员，也可以借助Antigravity Tools反代API，通过CC-switch进行管理启动供Claude Code使用。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202311293.webp)

### 1.购买API key

这里推荐智谱的API，我订阅的GLM Coding Lite，3个月只要48.6

**优惠购买地址**

https://www.bigmodel.cn/glm-coding?ic=PUCQNADSPM

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202316904.webp)

### 2.创建API key

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202319858.webp)

### 3.配置API key

我自己使用的工具是**CC-switch**进行AIPI管理启动，供Claude Code使用，顺便提及下CC-switch，不仅可以管理你的多个API，一键切换，还可以，进行MCP 服务器管理、Claude Code 提示词管理、Claude Skills 管理



**CC-switch开源地址**

https://github.com/farion1231/cc-switch



## 四.上手claude Skills

Skills 是给 Claude 装的"专业技能包"。你可以这样理解，一个 Skill 让 Claude 在特定领域变成专家。Skills 是打包好的指令、脚本和资源，Claude 会自动发现并按需加载，让它在特定任务上表现更好。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/svg-1767702815285.webp)

目前skills支持在Claude.ai、Claude Code以及API中使用，Skills 有两个位置

```
~/.claude/skills/              # 全局 Skills  (所有项目可用)
project/.claude/skills/        # 项目 skills (仅当前项目，可 git 共享)
```

### 理解CLAUDE.md

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/svg-1767702653032.webp)

### 理解Slash Commands

Slash Commands即自定义斜杠命令。

比如我创建一个/search-web命令用来搜索资料用

**具体的配置流程如下**

```
mkdir -p ~/.claude/commands
```

```
touch ~/.claude/commands/search-web.md
```

search-web.md内容

```
---
allowed-tools: Bash(*)
description: 使用 Gemini CLI 搜索特定站点并进行 UltraThink 总结
argument-hint: [搜索关键词]
---

# 任务目标
在互联网上搜索关于 "$ARGUMENTS" 的内容，并挖掘最靠谱、最能解答疑问的信息。

# 搜索要求
1. **限定范围**：重点关注以下站点的资料和动态：
   - anthropic.com
   - x.com
   - reddit.com
   - linux.do
2. **时效性**：搜索当前月份（!`date "+%Y年%m月"`）的最新消息 [1]。
3. **执行工具**：必须调用本地的 `gemini cli` 工具，并利用其 `GoogleSearch` 功能执行查询。
4. **并行处理**：请启动多个并行的子任务（同时调用多次 Bash 工具）分别检索上述不同站点，以加快执行速度。
5. **总结逻辑**：在给出最终回复前，请开启 **UltraThink (Extended Thinking)** 模式。深度分析各方资料的冲突、真实性和深度，最后提供一份结构严密的总结。

# 搜索指令示例（供你参考执行）
- `gemini search "site:linux.do $ARGUMENTS"`
- `gemini search "site:anthropic.com $ARGUMENTS"`

```

使用示例

```
/search-web  Claude Code上手教程
```

## 六.斜杠命令（Slash Commands）

### 
### 1. 内置核心命令

| 命令     | 功能描述                            |
| -------- | ----------------------------------- |
| /help    | 显示所有可用命令                    |
| /clear   | 重置对话历史和上下文                |
| /init    | 生成 CLAUDE.md 项目配置文件         |
| /compact | 压缩对话内容，保留关键上下文        |
| /model   | 切换使用的模型（sonnet/opus/haiku） |
| /context | 显示当前上下文窗口使用情况          |
| /doctor  | 诊断安装问题和 MCP 服务器状态       |
| /mcp     | 管理 MCP 服务器配置                 |
| /hooks   | 查看和管理生命周期钩子              |

### 2. 高级技巧

- 支持使用 $ARGUMENTS 占位符传递参数，例如创建自动修复 GitHub Issue 的命令。

## 常见问题

### 1.PowerShell运行不了命令

以管理员身份运行 PowerShell，执行：`Set-ExecutionPolicy RemoteSigned`（该策略允许运行本地签名脚本、远程可信签名脚本），按提示输入`Y`确认。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260106202326621.webp)

### 2.启动各种报错

一般是由于win系统下的cmd默认不支持魔法，需要在环境变量进行配置

sysdm.cpl进入配置环境变量，

系统变量---新建

```
变量名：http_proxy    变量值：http://127.0.0.1:端口号
变量名：https_proxy   变量值：http://127.0.0.1:端口号
```



## 七.写在最后

Claude Code确实是目前最好用的AI编程工具之一，它不像其他工具那样花哨，而是专注于真正提升你的编程效率。当然，一些简单的任务基本用不到AI，反而会拖累你的效率，日常可以根据自己的实际情况，是否使用AI辅助。



*以上，既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧，如果想第一时间收到推送，也可以给我个星标⭐～谢谢你看我的文章，我们，下次再见。*
