

## 背景

Codex 凭借出色的 AI 表现，越来越多人开始使用。但不少用户会遇到一个共同问题：每次对话都会出现 Reconnecting 提示。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260611001657657.webp)

## 原因

Codex 需要代理才能用。每次发起对话时会创建一个子进程，子进程先尝试直连 OpenAI，失败后再尝试走代理——这 5 次重试就是 Reconnecting 的来源。

## 解决办法

### 方案一：环境变量 + Codex 配置

**第一步** — 将代理地址设为环境变量：

| 系统      | 操作             |
| ------- | -------------- |
| macOS   | 编辑 `~/.zshrc`  |
| Linux   | 编辑 `~/.bashrc` |
| Windows | 系统设置 → 环境变量    |

添加以下内容：

```bash
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 把 `127.0.0.1:7890` 替换为你代理软件的实际地址。

**第二步** — 打开 Codex 配置文件：

```bash
open ~/.codex/config.toml
```

增加如下配置，让 Codex 继承这些环境变量：

```toml
[shell_environment_policy]
include_only = ["PATH", "HOME", "https_proxy", "http_proxy", "all_proxy"]
```

**第三步** — 退出 Codex，重新启动即可。

### 方案二：.env 文件（更优雅）

在 `~/.codex/` 目录下新建 `.env` 文件，写入代理配置：

```bash
https_proxy=http://127.0.0.1:7890
http_proxy=http://127.0.0.1:7890
all_proxy=socks5://127.0.0.1:7890
```

Codex 会自动读取 `.env`，无需额外配置 `config.toml`。
