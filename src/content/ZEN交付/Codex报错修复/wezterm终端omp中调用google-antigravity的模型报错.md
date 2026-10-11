./![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260925163243557.webp)

# omp 调用 google-antigravity 模型报错（429 / 400）排查记录

- 记录时间：2026-09-25（2026-10-01 验证并彻底解决；2026-10-04 复发新增第四种报错形态，见第八节）
- 状态：**已解决**。最终定位为「模型失效断流 + 日本出口被 Google 地区拦截」双重根因
- 修复方案：omp 升级模型角色至 `gemini-3.8-flash` + Clash Verge 中将 `飞鸟云` 策略组切换为**美国节点**
- 相关文档：[omp 调用 OpenCode Go（经 OpenCodex）报错修复](./wezterm终端omp中调用openCodex%20go%20API报错.md)（那个是代理端口问题，已修复）
- ⚠️ 经验教训（2026-10-04）：**Clash Verge 重启后，`飞鸟云` 策略组的选择会回到日本节点**，400 地区拦截会复发——每次重启代理后都要检查一次策略组选中节点

## 一、报错现象

在 WezTerm 里用 omp 调用 `google-antigravity` 系列模型（默认 `google-antigravity/gemini-3.8-flash`）时：

```
Error: Cloud Code Assist API error (429): {
  "error": {
    "code": 429,
    "message": "Resource has been exhausted (e.g. check quota).",
    "status": "RESOURCE_EXHAUSTED"
  }
}

Error: Retry failed after 1 attempts: Provider requested 1800000ms wait,
exceeds retry.maxDelayMs (300000ms). Original error: Cloud Code Assist API error (429): ...
```

注意 `1800000ms` = **30 分钟**，是 Google 给的重试冷却提示。

偶尔还会出现另一条 400（来自 title-generator 的小请求）：

```
Cloud Code Assist API error (400): {
  "error": {
    "code": 400,
    "message": "User location is not supported for the API use.",
    "status": "FAILED_PRECONDITION"
  }
}
```

## 二、先说结论

1. **已彻底解决（2026-10-01 验证闭环）**：
   - **400 地区判定根因**：出口走日本（AWS Tokyo 机房段）被 Google Cloud Code Assist 判定不支持（`User location is not supported for the API use.`）。将 Clash 代理策略组手动切到**美国节点**（如 `美国01aws`）后，400 彻底消除，首次调用即秒回。
   - **断流（Stream Ended）根因**：omp 原配置中 `smol` 与 `designer` 角色绑定的 `gemini-3.5-flash` 已被 Google 上游停用断流（实测 0/13 全挂，同批 `gemini-3-pro`、`gemini-3-flash` 亦然，报 `stream ended without a finish reason`）。升级配置为 `gemini-3.8-flash` 后彻底恢复。
2. **429 不是配额用完**：Google 配额接口显示该账号计数器为 `0.0% used`，429 属于偶发频控/风控。
3. **omp 熔断机制**：omp 收到 429 后会把凭据熔断 30 分钟（记入 `auth_credential_blocks`），熔断期内所有调用均会直接失败，排查时需避开熔断窗口。
4. **排除账号拉黑与客户端针对**：同一凭据、同一日本出口下调用 `claude-sonnet-4-6` **7/7 连续全通**，证明账号本身正常且出口未被全局封禁，仅 Google 自家 Gemini 接口对地区进行严格审查。
## 三、关键证据

### 1. 配额没用完（排除「配额耗尽」这个方向）

查 omp 的 `~/.omp/agent/agent.db` → `usage_history` 表，筛选当前账号：

```
=== usage_history: 按 status 统计（yunqiheying） ===
('ok', 333)
```

最近一轮（09-25 16:45）全部计数器：

| 计数器 | used | status | 重置时间 |
|---|---|---|---|
| google:default:gemini-5h | 0.0 | ok | 09-25 21:23 |
| google:default:gemini-weekly | 0.0 | ok | 09-25 23:46 |
| openai:default:3p-5h | 0.0 | ok | 09-25 21:46 |
| openai:default:3p-weekly | 0.0 | ok | 10-02 16:46 |
| anthropic:default:3p-5h | 0.0 | ok | 09-25 21:46 |
| anthropic:default:3p-weekly | 0.0 | ok | 10-02 16:46 |

**333 条记录全部 ok、全部 0%**，却仍然被 429。所以「等配额重置」永远不会好。

### 2. omp 自己把凭据熔断了

`auth_credential_blocks` 表：

```
credential_id 5 (identity: email:yunqiheying@gmail.com)
  provider_key = google-antigravity:oauth
  block_scope  = counter:google    blocked_until = 2026-09-25 17:15:23
  block_scope  = counter:openai    blocked_until = 2026-09-25 17:15:23
```

也就是说 omp 把 Google 回的两类 429（google 计数器 / openai 计数器）翻译成了「这条凭据先别用了」，在 `blocked_until` 之前调用会直接失败。**排查时要注意这个迷雾**：熔断期内看到的所有失败都不能当作新证据。

### 3. 线路与出口确认

Clash Verge 实时日志（`AppData\Roaming\io.github.clash-verge-rev.clash-verge-rev\logs\sidecar_latest.log`）：

```
[TCP] 127.0.0.1:58090(omp.exe) --> daily-cloudcode-pa.googleapis.com:443
      match DomainSuffix(googleapis.com) using 🚀 Google[日本01[HY2]]
```

- `googleapis.com` 走的是 **`🚀 Google` 策略组**（`type: select`），当前选中的是 `日本01[HY2]`
- 经同一节点查出口 IP：`23.151.104.234 / JP / Tokyo / AS53808 MoeDove`
- 对比：直连是 `36.142.161.40 / CN / 甘肃移动`（肯定不支持）

结论：**出口国是日本（属于受支持地区），Google 仍判 location 不支持**。
→ 说明 Google 判定的不完全是 ipinfo 那套地理位置，更可能是该 IP 属于机房 / 代理段被标记，或与账号地区有关。

> 注意：只改「全局节点」没用，`googleapis.com`（以及 `run.app`）是按域名规则走 `🚀 Google` 这个组，要改的是**这个组**里的选中节点。

### 4. 请求特征（可能踩风控）

omp 会伪装成官方 Antigravity 客户端，落盘的原始请求（`.omp\logs\http-400-requests\*.json`）：

```json
{
  "provider": "google-antigravity",
  "api": "google-gemini-cli",
  "model": "gemini-3.8-flash",
  "body": {
    "project": "aicode-consumers",
    "model": "gemini-3.8-flash-low",
    "userAgent": "antigravity",
    "requestType": "agent"
  },
  "headers": {
    "User-Agent": "antigravity/hub/2.17.0 (aidev_client; os_type=darwin; arch=arm64; cl=963137146)"
  }
}
```

`os_type=darwin; arch=arm64` 但实际跑在 Windows 上——这类「客户端指纹不一致」有可能触发 Google 风控。

### 5. 时间线：其实是两个阶段的问题

扫描全部 omp 日志（`~/.omp/logs/omp.*.log`）按天统计：

| 日期 | Cloud Code 400/429 | OAuth 刷新失败 | Unable to connect |
|---|---|---|---|
| 09-23 | 0 | 2 | 40 |
| 09-24 | 0 | 19 | 109 |
| 09-25 | 400×1, 429×2 | 0 | 0 |

- **09-23 / 09-24**：全是 `OAuth preflight refresh failed` + `Unable to connect` → 就是代理端口 `7890` 那个问题（见另一篇文档）
- **09-25 代理修好后**：才暴露出真正的 Google 侧 400 / 429

所以「这几天一直报错」实际是先后两个不同的故障叠加出来的假象。
### 6. 2026-10-01 对照测试与双重根因定位

在排除 429 熔断后，针对持续复现的 400 与断流报错，组织了全矩阵对照测试：

#### (1) 模型兼容性测试（实测样本）
| 模型 | 结果 | 表现 |
|---|---|---|
| `google-antigravity/gemini-3.5-flash` | **0/13 全挂** | 报 `stream ended without a finish reason`，上游已断流停用 |
| `google-antigravity/gemini-3-pro` / `3-flash` | **0/4 全挂** | 同上，断流报错 |
| `google-antigravity/claude-sonnet-4-6` | **7/7 全通** | 秒回 `PONG`，证明 OAuth 凭据及传输链路完全正常 |
| `google-antigravity/gemini-3.8-flash` | **日本出口 6/14 通**，**美国出口 100% 通** | 属于当前唯一受上游完整支持且稳定的 Gemini 3.x 版本 |

#### (2) 出口地区拦截验证
- **现象**：当 Clash Verge 策略组自动选择在 `54.238.85.138` / `18.180.62.13`（AWS 东京 JP）时，Gemini 请求有约 50%~70% 概率被抛出 `400 FAILED_PRECONDITION: User location is not supported for the API use.`。
- **生效策略组**：Clash Verge rules 规则中 `DOMAIN-KEYWORD,google,飞鸟云` 走的是主策略组 **`飞鸟云`**，而非文档最初记录的 `🚀 Google`。
- **美国节点修复**：将 `飞鸟云` 策略组从「自动选择」手动指定为「美国01aws」后，出口变为 US，调用 `gemini-3.8-flash` **首次即秒回 `OK`**，400 地区判定彻底消除。


## 四、排查命令（可复用）

```powershell
# 1. Clash 实际把 googleapis 路由到哪个组 / 节点
$d="$env:APPDATA\io.github.clash-verge-rev.clash-verge-rev\logs"
Select-String -Path "$d\sidecar_latest.log" -Pattern "cloudcode|googleapis" | Select-Object -Last 5

# 2. 当前代理出口 IP / 国家
curl.exe -s -x http://127.0.0.1:7897 https://ipinfo.io/json

# 3. omp 日志里各自的报错（区分网络问题 vs Google 拒绝）
Select-String -Path "$env:USERPROFILE\.omp\logs\omp.*.log" -Pattern "Cloud Code Assist API error|OAuth preflight|Unable to connect"
```

查看配额与熔断（用 Python 直接读 sqlite，避免猜）：

```python
import sqlite3, os, datetime
db = os.path.join(os.environ["USERPROFILE"], ".omp", "agent", "agent.db")
con = sqlite3.connect(f"file:{db}?mode=ro&immutable=1", uri=True)

# 配额使用情况按状态统计
for r in con.execute("select status, count(*) from usage_history where email like '%yunqiheying%' group by status"):
    print(r)

# 当前熔断记录
for r in con.execute("select * from auth_credential_blocks"):
    print(r, datetime.datetime.fromtimestamp(r[3]/1000))
```

## 五、可能原因（按可能性排序）

1. **出口 IP 被 Google 标记**：日本机房 / 代理 IP（AS53808 机房段）被判定为不支持的位置，导致 400 location / 429
2. **账号地区限制**：Google 账号地区（可能为中国）不满足 Antigravity / Cloud Code Assist 的地区要求
3. **客户端指纹风控**：omp 伪装 `antigravity/hub` 且 `os_type=darwin`，与真实环境不符
4. 账号被风控 / 限流（长期使用非官方客户端）

## 六、最终解决方案（已执行落地）

1. **升级 omp 模型角色至可用版本**（解决断流问题）：
   ```bash
   omp config set modelRoles '{"designer":"google-antigravity/gemini-3.8-flash","smol":"google-antigravity/gemini-3.8-flash","default":"opencode-go/deepseek-v4-flash-vision-exp:high"}'
   ```
   > 将已断流下线的 `gemini-3.5-flash` 替换为最新受支持的 `gemini-3.8-flash`。

2. **Clash Verge 将策略组固定到美国节点**（解决 400 地区拦截）：
   - 在 Clash Verge 的「代理」界面，找到承载 Google 规则的策略组（本订阅中为 `飞鸟云` 策略组）。
   - 将其从「自动选择」手动切为具体的 **`美国xxaws`** 节点（避开延迟低但被 Google 拦截的日本节点）。

3. **验证结果**：
   - 终端调用测试：`omp -p "Reply: OK" --model "google-antigravity/gemini-3.8-flash"` 秒回 `OK`。
   - omp 内部 smol 角色（标题生成、技能压缩）调用恢复正常，不再抛出异常。

## 七、追踪验证总结

- [x] **换美国节点后的结果**：已恢复。出口切为美国后，`gemini-3.8-flash` 首次调用秒回 OK，400 地区拦截彻底消除。
- [x] **模型版本兼容性排查**：确认 `gemini-3.5-flash`、`gemini-3-pro`、`gemini-3-flash` 均已在上游断流不可用，omp 角色配置已升级至 `gemini-3.8-flash`。
- [x] **同账号跨模型交叉验证**：同账号同节点下 `claude-sonnet-4-6` 7/7 连续全通，排除账号全局封控与指纹针对，确认是 Gemini 专属的地区审查。
- [x] **旧凭据清理提示**：`~/.omp/antigravity-import.json`（`dqtxai@gmail.com`，2026-08 已过期）及 `HKCU\Environment` 的 `GOOGLE_ANTIGRAVITY_ACCESS_TOKEN`（已失效）系历史残留，omp 实际走 `agent.db` 独立 OAuth，可按需清理残留。
## 八、2026-10-04 复发：第四种报错形态「No API key found」

### 1. 报错现象（与前三类完全不同）

```
error: No API key found for google-antigravity.

Use /login, set an API key environment variable, or create C:\Users\Administrator\.omp\agent\agent.db
```

**极具迷惑性**：提示让你去 `/login` 重新登录，但 `agent.db` 里的 OAuth 凭据其实完好无损（access / refresh token 都在）——真正的故障是**凭据刷新失败**，omp 把「刷新不了的凭据」翻译成了「没有凭据」。

### 2. 故障链条（两层叠加）

```
access token 过期（10-03 14:38 到期）
    ↓
Clash Verge 没在运行 → oauth2.googleapis.com 直连超时
    ↓
OAuth preflight refresh failed: Unable to connect
    ↓
omp 写入 auth 级熔断（auth_credential_blocks.block_scope = 'auth'，5 分钟）
    ↓
熔断期内 getApiKey 直接中止刷新（日志：OAuth token refresh aborted by caller）
    ↓
对外报错：No API key found for google-antigravity
```

关键日志（`~/.omp/logs/omp.*.log`）：

```
"OAuth preflight refresh failed ... OAuthError: request to https://oauth2.googleapis.com/token
 failed: Unable to connect. Is the computer able to access the url?"
"title-generator: no API key ... reason: missing-api-key"
```

### 3. 与旧熔断的区别（排查时别混淆）

| | counter 熔断（09-25 那次） | auth 熔断（本次） |
|---|---|---|
| block_scope | `counter:google` / `counter:openai` | `auth` |
| 触发原因 | Google 返回 429 频控 | OAuth 刷新连不上 / 失败 |
| 典型对外报错 | 429 Resource exhausted | **No API key found** |
| 修复方向 | 等冷却 / 换出口 | **恢复代理网络**，等 5 分钟熔断自动过期 |

### 4. 修复步骤

1. **启动 Clash Verge**，确认混合端口在监听（本次实测为 7897，端口会因配置变动，以实际监听为准）：
   ```powershell
   Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in 7890,7897,7901 }
   ```
2. **确认环境代理指向正确端口**（4 处硬编码检查见[另一篇文档](./wezterm终端omp中调用openCodex%20go%20API报错.md)第三节）。
3. **等 auth 熔断过期**（5 分钟）或手动清理（omp 没在运行时）：
   ```python
   import sqlite3, os
   db = os.path.join(os.environ["USERPROFILE"], ".omp", "agent", "agent.db")
   con = sqlite3.connect(db)
   con.execute("delete from auth_credential_blocks")  # 只在 omp 完全退出后执行
   con.commit()
   ```
4. 验证凭据会被自动刷新：`auth_credentials` 表中 `json_extract(data,'$.expires')` 更新为未来时间即成功，无需 `/login`。

### 5. 400 地区拦截复发（同日第二故障）

代理恢复后，其他 API（opencode-go 等）全部正常，唯独 Google 仍报 400 `User location is not supported`。查出口：

```
curl.exe -s -x http://127.0.0.1:7897 https://ipapi.co/json
→ ip: 23.151.104.234 / Tokyo / JP / AS53808 MoeDove   ← 与 09-25 记录的被拦截 IP 完全相同
```

原因：**Clash Verge 重启后 `飞鸟云` 策略组的选择回到了日本节点**。修复与 10-01 相同：Clash Verge「代理」页 → `飞鸟云` 组 → 手动选 `美国xxaws` 节点。

> 注意：Clash Verge 的 external-controller REST API 未开放时无法远程切组，只能在 UI 手动切换。切换后用「出口 IP 查询」确认变为 US 再重试 omp。

[WezTerm](../../posts/Software/WezTerm.md)
