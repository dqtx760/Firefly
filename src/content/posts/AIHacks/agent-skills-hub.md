---
title: Agent Skills Hub详解
published: 2026-03-11
tags: []
category: AIHacks
draft: false
pinned: false
---

相信有很多小伙伴跟我一样，手头同时在用好几个 AI Agent——Claude Code、Codex、Cursor、Windsurf……每个 Agent 都有自己的 Skill 目录，装了一堆技能包。时间一长就会遇到一个头疼的问题：同一个 Skill 要在不同 Agent 里各装一遍，版本还不一定一致，管理起来非常混乱。



我一直在想，有没有一种方式能像管理代码依赖一样，统一管理所有 Agent 的技能包？最近我在 GitHub 上发现了 agent-skills-hub 这个项目，完美解决了我的痛点。

**项目地址**：https://github.com/youzaiAGI/agent-skills-hub

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_kgv50bkgv50bkgv5.webp)

## 它解决了什么问题

简单来说，agent-skills-hub 提供了一个"中央仓库"的概念。所有 Skill 统一安装到 `~/.skill-hub` 这个目录，然后通过同步命令一键分发到各个 Agent 的技能目录中。这样做的好处显而易见：只需要维护一份技能包，所有 Agent 共享同一套 Skill，再也不用重复安装了。

目前它支持 18+ 个 AI Agent，包括 Claude Code、Codex、Cursor、Windsurf、Gemini、Trae、GitHub Copilot 等主流工具，覆盖面非常广。

## 安装方式

安装方式很简单，直接用 pip：

```bash
pip install agent-skills-hub
```

安装完成后，可以用以下命令验证：

```bash
skill --version
# 输出: Agent Skills Hub v1.6.10
```

当然，你也可以直接把项目地址丢给 Claude，让它帮你安装：

```
https://github.com/youzaiAGI/agent-skills-hub
帮我安装这个项目
```

## 日常使用

安装好之后，日常使用主要就两步：装技能、同步技能。

### 安装新技能到中央仓库

每次发现一个好用的 Skill，我都会先装到 `~/.skill-hub` 这个中央仓库里。比如我想安装 Anthropic 官方的 skill-creator：

```
skill install skill-creator@anthropics/skills
```

或者你也可以让 Claude 帮你操作，把 Skill 的 GitHub 地址丢给它就行：

```
https://github.com/anthropics/skills/tree/main/skills/skill-creator
帮我安装这个 skill 到 ~/.skill-hub
```

### 同步到各个 Agent

技能装好后，需要同步到你实际使用的 Agent 中。agent-skills-hub 提供了 `skill sync` 命令来完成这件事：

```bash
# 同步到 Claude Code（全局）
skill sync ClaudeCode skill-creator@anthropics/skills -g

# 同步到 Cursor（项目级）
skill sync Cursor skill-creator@anthropics/skills -p
```

如果你想一次性把所有技能都同步过去，也可以先导出技能列表，再批量同步：

```bash
# 导出当前已安装的技能列表
skill list > skills.txt

# 批量同步到指定 Agent
skill sync ClaudeCode skills.txt -g
```

这个体验就像 Python 的 `pip install -r requirements.txt` 一样丝滑。

### 交互式搜索和管理

除了命令行，agent-skills-hub 还提供了交互式的 TUI 界面，可以搜索、浏览和安装技能：

```bash
# 打开交互式搜索
skill search

# 打开技能管理界面
skill manage
```

在搜索界面里可以用方向键浏览，按回车查看详情并安装，非常直观。

## 我的实际工作流

分享一下我个人的使用习惯，供大家参考。

我主要用 Claude Code 和 Codex 两个 Agent，每次安装新 Skill 时，我会这样告诉 Claude：

```
https://github.com/xxx/xxx
帮我安装这个 skill 到 C:\Users\Administrator\.skill-hub

安装完后使用 skill sync 命令，将技能同步到 ~\.claude\skills\ 和 ~\.codex\skills\ 目录
```

这样一句话就搞定了安装和同步，两个 Agent 立刻就能用上新技能。

## 写在最后

agent-skills-hub 解决的虽然是一个小问题，但对于同时使用多个 AI Agent 的开发者来说，确实能省下不少重复劳动。如果你也有类似的困扰，不妨试试看。

以上，既然看到这里了，**如果觉得教程对你有帮助**，随手<u>点个赞、收藏、转发</u>三连吧！有任何问题，欢迎在**留言区**评论，我会逐一回复。👏👏



**✅大远程技术支持**

如果你在安装、配置或使用中遇到任何问题，不想自己折腾

随时可以找我提供 **1 对 1 远程技术支持**：[742112.xyz](742112.xyz)



✅**关于的知识星球**

我做了一个轻量社群，把私藏的精品软件，技术教程，AI智能体学习笔记

都整理进了进去，68元/年，感兴趣的可以扫码自行学习！

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)
