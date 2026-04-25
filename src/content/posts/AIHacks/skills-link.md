---
title: Skills-Link完全使用指南!
published: 2026-04-24
tags:
  - skill
  - tools
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220829071.webp
---

你是否也有这样的困扰？在多个 AI 工具里安装了同样的技能（Skills），修改一次要同步多次，麻烦！

**Skills-Link** 就是来解决这个问题的 —— 让所有 AI 编程工具共享同一个 Skills 文件夹。

**相关文档**
https://github.com/shanliuling/skills-link/blob/main/README.zh.md
https://www.npmjs.com/package/skills-link?activeTab=readme

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220829071.webp)


## 目录

- [前置条件](#前置条件)
- [从零开始完整步骤](#从零开始完整步骤)
- [我的实际情况](#我的实际情况)
- [多电脑同步](#多电脑同步)
- [常见问题](#常见问题)


## 前置条件

在开始之前，你需要准备：

1. **GitHub 账号** - 没有的话去 [github.com](https://github.com) 注册
2. **创建一个 GitHub 仓库** - 命名为 `skills-manage`（可以改成其他名字）
3. **本地安装 Git** - Windows 下载 [Git for Windows](https://gitforwindows.org/)

**可选**：如果你想和我一样用软链接方式，需要：
- 创建 `D:\project2026\skills-manage` 目录
- 在 `C:\Users\Administrator\` 创建软链接 `.skillshub` 指向它


## 从零开始完整步骤

### 第一步：本地创建文件夹

```bash
# 在 D 盘创建文件夹（名字随意）
mkdir D:\project2026\skills-manage
cd D:\project2026\skills-manage
git init
```

### 第二步：推送到 GitHub

```bash
# 关联你的 GitHub 仓库（换成你自己的仓库地址）
git remote add origin https://github.com/你的用户名/skills-manage.git

# 推送
git add .
git commit -m "initial commit"
git push -u origin main
```

### 第三步：创建软链接（可选，推荐）

```bash
# 删除可能存在的旧文件夹（如果有）
rmdir C:\Users\Administrator\.skillshub

# 创建软链接
mklink /D C:\Users\Administrator\.skillshub D:\project2026\skills-manage
```

> **注意**：如果不创建软链接，工具会用自己的默认文件夹 `C:\Users\Administrator\AISkills`

### 第四步：安装 skills-link

```bash
npm install -g skills-link
```


### 第五步：初始化配置

```bash
skills-link setup
```

这步会让你选择：
- 中央仓储目录（填 `.skillshub` 或 `D:\project2026\skills-manage`）
- 语言（选中文）

### 第六步：配置文件（关键！）

编辑 `C:\Users\Administrator\config.yaml`，确保 masterDir 指向软链接：

```yaml
masterDir: C:\Users\Administrator\.skillshub  # 必须是软链接！
language: zh
git:
  enabled: false  # 我建议手动推送，不开自动
  remote: ""
  autoPush: false
```

### 第七步：添加 Skills

把想用的 skills 放到 `D:\project2026\skills-manage` 里。

**⚠️ 重要：让 AI 安装 skill 时，一定要指定安装到中央仓库目录！**

```bash
# 先 cd 到中央仓库再安装
cd C:\Users\Administrator\.skillshub
# 然后再让 AI 安装 skill
```

否则 skill 会安装到 Agent 的本地目录，不会同步到其他工具！

然后运行 `skills-link`，会分两步：

**第一步：导入**
- 扫描中央仓库，发现新 skills
- 显示"已导入 xxx"

**第二步：创建链接**
- 为各 Agent 的 skills 目录创建软链接
- 这样 Qwen Code、Claude Code 才能看到这个 skill

### 第八步：推送到 GitHub

```bash
# 方式1：双击运行
D:\project2026\skills-manage\push.bat

# 方式2：命令行
cd C:\Users\Administrator\.skillshub
git add .
git commit -m "新增 xxx skill"
git push
```


## 我的实际情况

### 一图读懂

```
┌─────────────────────────────────────────────────────────────────────┐
│                         本地电脑                                    │
│                                                                     │
│   .qwen/skills ──┐                                                 │
│   .claude/skills ──┤     ┌──────────────────┐                       │
│   .codex/skills ──┤     │  .skillshub      │◀─── 软链接           │
│   .trae/skills ───┼────▶│  (D:\project2026 │                       │
│   ...            │     │   \skills-manage)│                       │
│                   │     └──────────────────┘                       │
│                              │                                      │
│                              ▼ GitHub                              │
│                   https://github.com/你的账号/skills-manage         │
└─────────────────────────────────────────────────────────────────────┘
```

**一句话解释**：所有 AI 工具的 Skills 目录都指向同一个地方，修改一次，所有工具都生效。

| 目录                                      | 性质   | 存什么                   |
| --------------------------------------- | ---- | --------------------- |
| `D:\project2026\skills-manage`          | 真实目录 | GitHub 仓库，67 个 Skills |
| `C:\Users\Administrator\.skillshub`     | 软链接  | 指向上面那个目录              |
| `C:\Users\Administrator\.qwen\skills`   | 软链接  | 指向中央仓储                |
| `C:\Users\Administrator\.claude\skills` | 软链接  | 指向中央仓储                |

**软链接就像快捷方式** —— 不占硬盘空间，指向同一个地方。


### 验证方法

```bash
dir /a C:\Users\Administrator\.qwen\skills
```

- `<SYMLINKD>` = 软链接 ✅
- `<DIR>` = 本地目录

### 常用命令

交互式启动 — 导入、链接、同步
```
skills-link
```

列出本地 skills（自动去重）
```
skills-link list
```

从 Master 目录删除 skills
```
skills-link remove
```

切换启用的应用
```
skills-link app
```

提交并推送到 GitHub
```
skills-link sync
```

文件变更时自动同步
```
skills-link watch
```

检查符号链接状态
```
skills-link health
```

撤销所有操作，恢复初始状态
```
skills-link reset
```

全局卸载
```
npm uninstall skills-link --global
```
## 多电脑同步

假设你在公司电脑配置好了，现在要在家里电脑用。

### 家里电脑操作步骤

1. 安装 skills-link
```
npm install -g skills-link
```

2. 创建各 AI 工具的软链接
```
skills-link
```
中文→中央仓库选择
```
~/AISkills
```
github仓库选择
```
https://github.com/dqtx760/skills-manage 
```

### 或者更简单的方式

如果不需要软链接，直接：

```bash
# 1. 安装 skills-link
npm install -g skills-link

# 2. 初始化
skills-link setup
# 中央仓储目录填：D:\project2026\skills-manage

# 3. 拉取代码
cd D:\project2026\skills-manage
git pull
```

> **注意**：不同电脑的 Agent 路径可能不同，比如 Qwen 在 `C:\Users\Administrator\.qwen\skills`，Claude Code 在 `C:\Users\Administrator\.claude\skills`。用 `skills-link health` 可以检查链接状态。


## 常见问题

### Q1：一定要用软链接吗？

**不是必须**，但推荐。

- 用软链接：所有 Agent 共享 `D:\project2026\skills-manage` 这一个文件夹
- 不用软链接：工具会用默认的 `C:\Users\Administrator\AISkills` 文件夹

### Q2：config.yaml 里的 masterDir 怎么填？

| 情况 | masterDir 应该填 |
|------|-----------------|
| 用软链接 | `C:\Users\Administrator\.skillshub` |
| 不用软链接 | `D:\project2026\skills-manage`（或其他你指定的目录） |

**重要**：填错了会导致 skills 不同步！

### Q3：安装 skill 后其他 Agent 看不到？

这是两个概念没分清：

| 步骤 | 做什么 | 目的地 |
|------|--------|--------|
| 1. 安装 skill | 把 skill 文件夹复制进去 | `.skillshub`（中央仓储） |
| 2. 创建链接 | 让各个 AI 工具能访问到这个 skill | 各 Agent 的 skills 目录 |

**比如**：你想用"飞书"这个 skill
1. 先把 `lark-im` 文件夹复制到 `D:\project2026\skills-manage`
2. 然后运行 `skills-link`，选择"创建链接"

这样 Qwen Code 和 Claude Code 才能看到它。

### Q4：删除 skill 怎么操作？

1. 删除 `.skillshub` 里的内容
2. 执行 `push.bat` 推送

**注意**：不要从 Agent 目录删除，只删了链接，源文件还在。

### Q5：另一台电脑同步后看不到 skills？

检查软链接是否创建成功：

```bash
skills-link health
```

如果有红色的错误信息，运行 `skills-link` 重新创建链接。

