---
title: Codex 合集
published: 2026-05-13
description: OpenAI Codex 桌面版与命令行版完整配置与迁移指南
tags: [AI, Codex, OpenAI, 开发工具]
category: Yoke
draft: false
---

## 📦 版本说明

| 版本 | 说明 |
|------|------|
| **Codex Desktop App** | Electron 桌面版，带图形界面，支持插件系统 |
| **Codex CLI** | 命令行版本，直接在终端使用，轻量快速 |

---

## 🔑 认证与迁移

### 认证文件位置

两个版本**共享同一个认证文件**，位置：

**Windows:**
```
C:\Users\Administrator\.codex\auth.json
```

**macOS/Linux:**
```
~/.codex/auth.json
```

### 迁移步骤

1. **备份旧电脑**
   ```powershell
   # 备份认证
   Copy-Item -Path "C:\Users\Administrator\.codex\auth.json" -Destination "D:\Backup\codex\"
   
   # 备份个人化配置
   Copy-Item -Path "C:\Users\Administrator\.codex\config.toml" -Destination "D:\Backup\codex\"
   
   # 备份已安装技能（可选）
   Copy-Item -Path "C:\Users\Administrator\.codex\skills" -Destination "D:\Backup\codex\skills\" -Recurse
   ```

2. **恢复到新电脑**
   ```powershell
   # 先在新电脑正常安装一次 Codex
   # 然后覆盖配置
   Copy-Item -Path "D:\Backup\codex\*" -Destination "C:\Users\<新用户名>\.codex\" -Recurse
   ```

> **注意**：Token 有效期约 10-30 天，过期后仍需重新手机验证

---

## ⚙️ 配置文件

### config.toml 示例

```toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "medium"

[windows]
sandbox = "elevated"

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://api.openai.com/v1"

[plugins."browser-use@openai-bundled"]
enabled = true

[plugins."documents@openai-primary-runtime"]
enabled = true

[plugins."spreadsheets@openai-primary-runtime"]
enabled = true

[plugins."presentations@openai-primary-runtime"]
enabled = true
```

---

## 📁 完整目录结构

```
.codex/
├── auth.json                    # 登录凭证（最重要）
├── auth.json.antigravity.bak    # 自动备份
├── config.toml                  # 主配置
├── .codex-global-state.json    # 全局状态
├── history.jsonl               # 对话历史
├── installation_id             # 安装ID
├── version.json                # 版本信息
├── cap_sid                     # 会话ID
├── memories/                   # 长期记忆
├── plugins/                    # 已安装插件
├── sessions/                   # 会话数据
├── skills/                     # 已安装技能
├── state_5.sqlite             # 状态数据库
├── logs_2.sqlite              # 日志数据库
├── .sandbox/                   # 沙箱环境
├── .sandbox-bin/               # 沙箱二进制
├── .sandbox-secrets/           # 沙箱密钥
├── tmp/                        # 临时文件
├── .tmp/                       # 临时目录
│   ├── bundled-marketplaces/   # 内置插件市场
│   └── plugins/                # 插件缓存
└── vendor_imports/             # 依赖导入
```

---

## 🔍 常见问题

### Q: 登录需要手机验证怎么办？
A: 正常走验证流程，验证成功后会自动更新 `auth.json`，之后一段时间内不需要重复验证。

### Q: Codex Desktop 和 CLI 是分开的吗？
A: 它们共享同一个 `.codex` 配置目录，认证和配置都是互通的。

### Q: 桌面版的认证数据存在哪里？
A: 桌面版使用 Electron 的 Local Storage 存储，但会同步到 `.codex/auth.json`，所以备份这个文件就够了。

### Q: Codex AppData 位置
```
C:\Users\Administrator\AppData\Roaming\@codex-proxy\electron\
```
（主要是浏览器缓存，迁移价值不大）

---

## 📌 相关资源

- [Skills 仓库合集](./Skills仓库合集)
- [斜杠命令合集](./斜杠命令合集)
- [智能体合集](./智能体合集)

---

**更新时间**：2026-05-13
