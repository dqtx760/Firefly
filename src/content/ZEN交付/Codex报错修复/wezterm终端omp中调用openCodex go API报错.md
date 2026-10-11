# omp 调用 OpenCode Go（经 OpenCodex）报错修复

## 一、报错现象

在 WezTerm 终端里启动 omp 调用 OpenCode Go 时，对话直接失败：

```
Error: Retry failed after 10 attempts: Unable to connect. Is the computer able to access the url?
```

同时模型面板顶部还有一条红色提示（说明模型配置也没加载成功）：

```
Error: Failed to load config file models, Schema error: root: must be an object (was null)
```

## 二、环境与触发原因

- 终端：WezTerm，默认 shell 是 **Nushell**（`config.default_prog = { 'nu' }`）
- 代理软件：**之前一直用 v2rayN（端口 7890），这两天换成了 Clash Verge（混合端口 7897）**
- omp（Oh My Pi）调用 OpenCode Go 有两条路径：内置直连 `opencode-go`，或经本地 OpenCodex 桥接（`127.0.0.1:10100`）的 `opencodex` provider

**触发点**：换代理软件后端口从 `7890` 变成了 `7897`，但机器上仍有 4 处写的是 `7890`（或残留状态），于是 omp 的所有联网请求全部连不上。

## 三、根本原因（4 处，缺一不可）

### 1. OpenCodex 出口代理写死 7890 → 上游请求全部 502

`C:\Users\Administrator\.opencodex\config.json`

```json
"proxy": "http://127.0.0.1:7890"
```

而 Clash Verge 实际监听的是 7897，7890 没有任何进程在听，导致 OpenCodex 每次请求 `https://opencode.ai/zen/go/v1` 都秒失败：

```
HTTP 502  {"error":{"message":"Unable to connect. Is the computer able to access the url?"}}
```

### 2. PowerShell 配置文件写死 7890

`C:\Users\Administrator\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

```powershell
$env:HTTP_PROXY  = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

从 PowerShell 启动 omp 会继承这两个变量，所有请求走死掉的 7890。

### 3. Nushell 配置用大写变量覆盖了 WezTerm 的小写变量（本次最隐蔽的坑）

`C:\Users\Administrator\.wezterm.lua` 里设的是**小写**：

```lua
config.set_environment_variables = {
  http_proxy = "http://127.0.0.1:7897",
  https_proxy = "http://127.0.0.1:7897",
}
```

但 Nushell 启动时会执行 `config.nu` 里的 `proxy set`，用**大写**把它覆盖掉：

`C:\Users\Administrator\AppData\Roaming\nushell\config.nu`

```nu
def --env "proxy set" [] {
    load-env { "HTTP_PROXY": "http://127.0.0.1:7890", "HTTPS_PROXY": "http://127.0.0.1:7890" }
}
proxy set
```

> 这就是「WezTerm 里已经改成 7897 了，但还是不行，而 PowerShell 里测试却是好的」的原因：
> 大写 `HTTPS_PROXY` 优先级更高，把 WezTerm 的小写设置覆盖了；PowerShell 则只认配置文件里那两行。

### 4. models.yml 被清空 → 模型配置加载失败

`C:\Users\Administrator\.omp\agent\models.yml` 被清成 **0 字节**。空文件被解析成 `null`，而 omp 要求根节点必须是对象，于是报：

```
Schema error: root: must be an object (was null)
```

（原因是删除了 OpenCodex 注入的 `providers.opencodex` 段，但把整个文件删空了。）

## 四、排查命令（以后可复用）

```powershell
# 1. 看 Clash 实际监听哪个端口（混合端口）
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in 7890,7897 }

# 2. 直连 / 走代理分别测试上游是否可达
curl.exe -s -o NUL -w "code=%{http_code}\n" -x http://127.0.0.1:7897 https://opencode.ai/zen/go/v1/models
curl.exe -s -o NUL -w "code=%{http_code}\n" https://opencode.ai/zen/go/v1/models

# 3. 看 OpenCodex 的出口代理配置
ocx config get proxy

# 4. 让 OpenCodex 真连一次 OpenCode Go
ocx provider test opencode-go

# 5. 看 OpenCodex 服务状态 / 请求日志
ocx status
ocx logs --json

# 6. 看 omp 自己的日志（搜 "Unable to connect" / "Failed to parse"）
Get-ChildItem "$env:USERPROFILE\.omp\logs" | Sort-Object LastWriteTime -Descending | Select-Object -First 3
```

omp 启动日志里这一行能直接暴露环境里生效的是哪个代理变量：

```
"message":"global proxy fetch not installed","reason":"PI_PROXY unset","env":{"HTTPS_PROXY":"set"}
```

`env` 里出现 `HTTPS_PROXY` 就是被第 3 条（Nushell）接管了。

## 五、修复步骤

| # | 文件 | 修改内容 |
|---|---|---|
| 1 | `C:\Users\Administrator\.opencodex\config.json` | 代理 `http://127.0.0.1:7890` → `http://127.0.0.1:7897` |
| 2 | `C:\Users\Administrator\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` | `HTTP_PROXY` / `HTTPS_PROXY` → `http://127.0.0.1:7897` |
| 3 | `C:\Users\Administrator\AppData\Roaming\nushell\config.nu` | `proxy set` / `proxy set8083` 里的 `7890` → `7897` |
| 4 | `C:\Users\Administrator\.omp\agent\models.yml` | 清空导致 schema 错误，恢复为最小合法内容 `providers: {}` |

第 1 处推荐用 OpenCodex 自带命令改，避免手改 JSON：

```powershell
ocx config set proxy http://127.0.0.1:7897
ocx stop
ocx service start
```

> 注意：`ocx restart` 有时不会真正重启（守护脚本检测到「已有进程在跑」会跳过），稳妥做法是 `ocx stop` + `ocx service start`，并确认端口 10100 的 PID 换了新的。

改完后**新开终端 / 重启 omp**：正在运行的进程里还是旧的环境变量。

## 六、验证结果

| 检查 | 结果 |
|---|---|
| `models.yml` 加载 | 无 schema 报错 |
| `ocx provider test opencode-go` | connected，35 个模型 |
| OpenCodex 桥接 `/v1/chat/completions` | HTTP 200 |
| 新开 Nushell 解析 `$env.HTTPS_PROXY` | `http://127.0.0.1:7897` |
| 经 Nushell 环境跑 omp 调 `opencode-go/deepseek-v4-flash` | 正常返回 |
| omp 调 `opencode-go/deepseek-v4-flash-vision-exp` | 正常返回 |

## 七、预防

整套链路里同时有 **4 个地方**硬编码了代理端口，以后只要换代理软件 / 改 Clash 混合端口，就要同步这 4 处，否则会再次出现同类报错：

1. `.wezterm.lua`（小写 `http_proxy` / `https_proxy`）
2. `nushell\config.nu`（大写 `HTTP_PROXY` / `HTTPS_PROXY`，**优先级最高，最容易漏**）
3. PowerShell `Microsoft.PowerShell_profile.ps1`
4. OpenCodex：`ocx config set proxy http://127.0.0.1:<新端口>` + 重启服务

排错口诀：**先确认 Clash 混合端口号 → 再全局搜 `7890` 看还有哪里没改 → 最后看 omp 日志里 `env` 显示的是大写还是小写代理变量。**


[WezTerm](../../posts/Software/WezTerm.md)
