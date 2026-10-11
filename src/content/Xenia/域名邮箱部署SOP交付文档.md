# 域名邮箱部署 SOP 交付文档（Cloudflare + Gmail + Resend）

> 用途：客户想用自己域名收发邮件（如 `hi@客户域名.com`），又不花钱买企业邮箱。把本文档发给客户，客户按第一部分做 10 分钟手动操作，再把第二部分的提示词原样发给任意 AI 智能体，智能体自动完成剩余部署。
>
> 方案分工：**收件**走 Cloudflare Email Routing（转发到 Gmail），**发件**走 Resend SMTP（挂在 Gmail 里以域名身份发信）。免费方案，Resend 每天免费 100 封。

## 客户需要提前有的东西

1. 一个域名，且 DNS 已托管在 Cloudflare（能登录 dash.cloudflare.com 即可）
2. 一个 Gmail 账号
3. 电脑装有 Node.js 20 或更高版本（没有就让智能体第一步行内安装）

---

## 第一部分：客户手动操作（约 10 分钟）

### 1. 注册 Resend 并创建 API Key

1. 打开 [resend.com](https://resend.com)，用邮箱注册（免费）
2. 登录后进入 **API Keys** → **Create API Key**
3. 权限务必选 **Full access**（只发信的 key 无法自动配置域名）
4. 复制 `re_` 开头的密钥。**页面关掉就再也看不到，先存到记事本**

### 2. 创建 Cloudflare API Token

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com) → 右上角头像 → **My Profile** → **API Tokens** → **Create Token** → 页面底部 **Create Custom Token**
2. 添加以下 4 条权限（前三条必需，第四条用于自动启用邮件路由）：
   - **Zone / DNS / Edit**
   - **Zone / Email Routing Rules / Edit**
   - **Account / Email Routing Addresses / Edit**
   - **Zone / Zone Settings / Edit**
3. Zone Resources 全部选 **Include → Specific zone → 你的域名**
4. 创建后复制 Token。**同样只显示一次**

> 权限给少不报错但会半路卡住：缺 DNS 权限写不了记录，缺 Email Routing 权限建不了转发规则，缺 Zone Settings 权限启用不了邮件路由。

### 3. 创建配置文件

在电脑上新建一个文本文件（建议放 `C:\Users\Administrator\tmp\email-setup.env` 或任意固定路径），内容如下，把两个密钥和你的信息填进去：

```
RESEND_API_KEY=re_你的Resend密钥
CLOUDFLARE_API_TOKEN=你的CloudflareToken
DOMAIN=你的域名.com
GMAIL=你的Gmail地址@gmail.com
SENDER=hi@你的域名.com
DISPLAY_NAME=你希望对方看到的名字
```

### 4. 记下配置文件在电脑上的完整路径

后面提示词里要用到它。

---

## 第二部分：把这段提示词发给你的 AI 智能体

> 使用方法：把下面代码块里的内容**原样复制**给智能体（Codex / Claude Code / Cursor 等能执行命令的 AI 都可以），只改第一行的文件路径。

```
帮我全自动部署一个域名邮箱，方案是 Cloudflare 收件转发 + Resend SMTP 发件。配置信息都在这个文件里，一行一个 KEY=VALUE：
C:\Users\Administrator\tmp\email-setup.env
字段含义：RESEND_API_KEY（Resend 密钥）、CLOUDFLARE_API_TOKEN（Cloudflare API Token）、DOMAIN（我的域名）、GMAIL（收件转发的 Gmail）、SENDER（要开通的域名邮箱地址）、DISPLAY_NAME（发信显示名）。

执行要求：
1. 先读这个文件拿到全部配置。密钥值不要打印到屏幕、不要写进任何日志或输出，只引用变量。
2. 环境准备：检查 node >= 20，然后 npm install -g resend-cli。所有 Resend 操作用 resend CLI（用环境变量 RESEND_API_KEY 传密钥）；所有 Cloudflare 操作用 curl 调 API v4（https://api.cloudflare.com/client/v4，Bearer 认证）。注意：wrangler 管不了 DNS 记录和 Email Routing，不要用 wrangler 做这两件事。
3. Resend 添加域名：resend domains create --name $DOMAIN，记下返回的 domain id 和 DNS 记录数组（类型/名称/值/优先级）。
4. 把上一步的每条 DNS 记录写入 Cloudflare：POST /zones/{zone_id}/dns_records。zone_id 用 GET /zones?name=$DOMAIN 查询。TXT 记录内容照抄 Resend 返回值，MX 记录带上 priority，ttl 统一用 1（自动）。
5. 触发并轮询验证：resend domains verify <id>，然后每隔 60 秒 resend domains get <id> 查状态，直到 status 变成 success（一般 1-5 分钟）。超过 10 分钟没通过：用 nslookup 向域名的权威 NS 直接查这几条记录，如果权威 DNS 有值就是 Resend 侧延迟，继续等；如果权威 DNS 没值，说明 DNS 记录写错，检查名称是否多加了域名后缀。
6. 启用 Email Routing：POST /zones/{zone_id}/email/routing/enable。如果返回权限错误，告诉我去 Cloudflare 控制台左侧「构建 → 电子邮件服务 → 电子邮件路由」点域名后「接入域名」手动启用，然后继续。
7. 创建转发目标地址：POST /accounts/{account_id}/email/routing/addresses，body 为 {"email":"$GMAIL"}。account_id 从 GET /zones 响应里拿。
8. 【暂停点】告诉我：去 Gmail 收 Cloudflare 发来的验证邮件并点确认链接，然后回复「好了」。我等你，不要跳过这步。收到「好了」后用 GET accounts/{account_id}/email/routing/addresses 确认 status 是 verified 再继续。
9. 创建转发规则：POST /zones/{zone_id}/email/routing/rules，body：{"name":"forward to gmail","enabled":true,"matchers":[{"type":"literal","field":"to","value":"$SENDER"}],"actions":[{"type":"forward","value":["$GMAIL"]}]}。如果报 "Destination address is not verified"，回到第 8 步等我。
10. 端到端测试：resend emails send --from "$DISPLAY_NAME <$SENDER>" --to $SENDER --subject "域名邮箱测试" --text "测试"。等 60 秒后用 resend emails get <id> 查 last_event。
11. 异常处理：如果 last_event 是 bounced，打印 bounce.diagnosticCode 给我看；如果是 suppressed，执行 resend suppressions delete $SENDER --yes 后再测一次。测试前确认目标地址 verified 已超过 5 分钟，否则等够再发，避免硬退把地址拉进 suppression 列表。
12. 全部通过后，给我一份交付报告：域名验证状态、DNS 记录清单、转发规则、测试结果，并列出剩下的唯一手动步骤（见下）。全程不许删除任何已存在的 DNS 记录或路由规则。

剩下我自己做的步骤（做完提醒我）：在 Gmail 设置 → 账号和导入 → 用这个地址发送邮件 → 添加其他电子邮件地址，填 $SENDER，SMTP 服务器 smtp.resend.com、端口 587、用户名 resend、密码用 RESEND_API_KEY、TLS。Gmail 的验证邮件会经 Cloudflare 转发落回我的 Gmail 收件箱，点确认即可。
```

---

## 第三部分：智能体运行时你要配合的事

智能体跑到第 8 步会暂停，等你做两件事：

1. **点验证链接**：Gmail 收件箱里收到 Cloudflare 的验证邮件（主题含 verify / 验证），点里面的确认链接，然后回复智能体「好了」
2. **等测试信**：智能体最后会发一封测试信到你的域名地址，它应自动落进你的 Gmail 收件箱

---

## 第四部分：Gmail 发件身份（唯一无法自动化的步骤）

智能体跑完后，域名地址已经能收能发，但要在 Gmail 网页里「以域名身份」写信，还需手动加一次发件身份：

1. Gmail → 齿轮 ⚙️ → **查看所有设置** → **账号和导入**
2. 「用这个地址发送邮件」→ **添加其他电子邮件地址**
3. 弹窗填写：
   - 名称：`DISPLAY_NAME` 里定的显示名
   - 电子邮件地址：`SENDER` 里的域名地址
   - SMTP 服务器：`smtp.resend.com`
   - 端口：`587`
   - 用户名：`resend`（四个字母，不是邮箱）
   - 密码：`re_` 开头的 Resend API Key
   - 连接安全：**TLS**
4. 提交后验证邮件会经 Cloudflare 转发落回 Gmail 收件箱，点确认链接（或把验证码填回弹窗）
5. 配好的标志：「用这个地址发送邮件」列表里出现域名地址，下方注明「邮件通过 smtp.resend.com 发送（端口 587）」

## 交付验收清单

- [ ] Resend 控制台域名状态 Verified
- [ ] 用别的邮箱发信到域名地址，Gmail 能收到
- [ ] Gmail 里切到域名身份发信，对方收件箱能收到、不进垃圾箱
- [ ] 回复域名地址收到的信，默认用域名身份发出

## 常见问题

**Q：126/QQ 收到的信旁边有「由 …@send.域名 代发」小字？**
正常现象。第三方 SMTP 的回执地址在 send 子域，网易系客户端会标注；Gmail/Outlook 不显示，SPF/DKIM/DMARC 全部通过，不影响送达和信誉。彻底消除只能换 Zoho Mail / 腾讯企业邮箱这类收发同源的托管服务。

**Q：测试信状态显示 suppressed？**
第一封信被硬退后，地址会进 Resend 的抑制列表，后续静默不发。让智能体执行 `resend suppressions delete 地址 --yes` 再测。

**Q：想再加地址（me@、support@）或全域转发？**
让智能体对 Cloudflare API 重复「创建路由规则」一步即可；Catch-all 规则把 matchers 换成 `{"type":"all"}`。

**Q：免费额度多少？**
Resend 每天 100 封、每月 3000 封；Cloudflare Email Routing 转发免费不限条数（合理使用）。个人与小型业务足够。

## 安全提醒

- `email-setup.env` 里两把密钥分别能操作你的 Cloudflare DNS 和以你的域名发信，**不要提交进代码仓库、不要发给别人**
- 怀疑泄露：Resend 到 API Keys 页删除重建；Cloudflare 到 API Tokens 页 Roll 重置
- 交付稳定使用一段时间后，可以把智能体用不到的权限（如 Zone Settings Edit）从 Token 里移除
