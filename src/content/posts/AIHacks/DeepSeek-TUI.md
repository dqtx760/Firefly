---
title: DeepSeek TUI - 终端编码代理新体验
published: 2026-05-08
tags:
  - DeepSeek
  - TUI
  - AI工具
  - 终端
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260508205033123.webp
---

DeepSeek TUI 是一个运行在终端中的 AI 编码代理，它从 `deepseek` 命令启动，支持流式推理区块、编辑本地工作区（带审批门控），还包含自动模式，可为每次交互选择模型和思考级别。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260508210940076.png)

## 核心特性

### 🚀 Auto 模式
使用 `deepseek --model auto` 或 `/model auto`，让 DeepSeek TUI 自动决定每次交互需要多少模型和推理能力。

Auto 模式控制两个设置：
- **模型**：`deepseek-v4-flash` 或 `deepseek-v4-pro`
- **思考级别**：`off`、`high` 或 `max`

在发送真正的请求前，程序会进行一次小型的 `deepseek-v4-flash` 路由调用（思考关闭）。路由器查看最新请求和最近上下文，然后为实际请求选择具体的模型和思考级别。

### 💭 思考模式流式输出
在模型工作时，你可以实时看到 DeepSeek 的推理区块（reasoning blocks），直观了解 AI 的思考过程。

### 🛠️ 完整工具套件
- 文件操作
- Shell 命令执行
- Git 管理
- 网页搜索/浏览
- 应用补丁
- 子代理
- MCP 服务器

### 📚 100 万 Token 上下文
支持上下文追踪、手动或配置的压缩，以及前缀缓存遥测。

### 🎯 三种模式

| 模式 | 说明 |
|------|------|
| **Plan** 🔍 | 只读调查模式——模型探索并提出计划后再进行修改 |
| **Agent** 🤖 | 默认交互模式——多步骤工具使用，带审批门控 |
| **YOLO** ⚡ | 自动批准所有工具——适合可信工作区 |

### ⌨️ 快捷键

| 按键 | 功能 |
|------|------|
| `Tab` | 完成 `/` 或 `@` 条目；运行时将草稿排队为后续；否则切换模式 |
| `Shift+Tab` | 切换推理强度：off → high → max |
| `F1` | 可搜索的帮助叠加层 |
| `Esc` | 返回/关闭 |
| `Ctrl+K` | 命令面板 |
| `Ctrl+R` | 恢复之前的会话 |
| `Alt+R` | 搜索提示历史并恢复清除的草稿 |
| `Ctrl+S` | 隐藏当前草稿 |

## 安装方式

### npm（最简单）
```bash
npm install -g deepseek-tui
```

### Cargo
```bash
cargo install deepseek-tui-cli --locked
cargo install deepseek-tui --locked
```

### Homebrew (macOS)
```bash
brew tap Hmbown/deepseek-tui
brew install deepseek-tui
```

### Docker
```bash
docker run --rm -it \
  -e DEEPSEEK_API_KEY \
  -v "$PWD:/workspace" \
  ghcr.io/hmbown/deepseek-tui:latest
```

## 快速开始

```bash
npm install -g deepseek-tui
deepseek --version
deepseek --model auto
```

首次启动时，系统会提示输入 [DeepSeek API key](https://platform.deepseek.com/api_keys)。密钥会保存到 `~/.deepseek/config.toml`。

你也可以提前设置：

```bash
deepseek auth set --provider deepseek
deepseek auth status
deepseek doctor
```

## 模型定价

| 模型 | 上下文 | 输入（缓存命中） | 输入（缓存未命中） | 输出 |
|------|--------|-----------------|-------------------|------|
| `deepseek-v4-pro` | 1M | $0.003625 / 1M | $0.435 / 1M | $0.87 / 1M |
| `deepseek-v4-flash` | 1M | $0.0028 / 1M | $0.14 / 1M | $0.28 / 1M |

> 注：DeepSeek Pro 费率目前享受 75% 折扣，有效期至 2026 年 5 月 31 日 15:59 UTC。

## 其他 API 提供商

除了 DeepSeek，还支持：

```bash
# NVIDIA NIM
deepseek auth set --provider nvidia-nim --api-key "YOUR_NVIDIA_API_KEY"

# Fireworks
deepseek auth set --provider fireworks --api-key "YOUR_FIREWORKS_API_KEY"

# 自托管 SGLang
SGLANG_BASE_URL="http://localhost:30000/v1" deepseek --provider sglang --model deepseek-v4-flash

# 自托管 vLLM
VLLM_BASE_URL="http://localhost:8000/v1" deepseek --provider vllm --model deepseek-v4-flash

# 自托管 Ollama
ollama pull deepseek-coder:1.3b
deepseek --provider ollama --model deepseek-coder:1.3b
```

## Skills 系统

DeepSeek TUI 从工作区目录发现技能（`.agents/skills` → `skills` → `.opencode/skills` → `.claude/skills` → `.cursor/skills`）和全局目录（`~/.agents/skills` → `~/.claude/skills` → `~/.deepseek/skills`）。

每个技能是一个包含 `SKILL.md` 文件的目录：

```bash
~/.agents/skills/my-skill/
└── SKILL.md
```

## 总结

DeepSeek TUI 为开发者提供了一个强大的终端编码代理，结合了 DeepSeek V4 模型的强大能力和直观的 TUI 界面。无论是日常编码、调试还是架构设计，它都能成为你的得力助手。

官方网站：
https://github.com/Hmbown/DeepSeek-TUI
