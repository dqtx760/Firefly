---
title: 域名邮箱搭建：Cloudflare + Gmail + Resend
published: 2026-09-03
tags:
  - cloudflare
  - gmail
  - resend
  - email
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-domain-email-setup-20260903-233000.webp
---
想用自己域名的邮箱发简历、发商务邮件，又不想花钱买企业邮箱，这篇教你用 Cloudflare + Gmail + Resend 免费搭一个。

方案分工很清楚：

- **收件**：Cloudflare Email Routing，把发到 `you@你的域名` 的邮件自动转发到你的 Gmail
- **发件**：在 Gmail 里挂 Resend 的 SMTP，直接用域名邮箱身份发信
- **送达率**：Resend 会在 DNS 里配好 SPF/DKIM，正常发不进垃圾箱

全程不花钱，Resend 免费额度每天 100 封，可以绑定三个域名，个人使用绰绰有余。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-domain-email-setup-20260903-233000.webp)

### 前提条件

开始前确认三件事：

1. 一个域名，并且 DNS 已托管在 Cloudflare
2. 一个 Gmail 账号
3. 一个 Resend 账号，[resend.com](https://resend.com) 免费注册

### 一、Resend 添加域名并配置 DNS

1. 登录 Resend，进入 **Domains** → **Add Domain**，输入你的根域名（例如 `dqtx.cc`），区域保持默认。
2. 添加后 Resend 会给你一组 DNS 记录，一般是两条：
   - 一条 **TXT** 记录（SPF，名称类似 `send` 或直接 `@`）
   - 一条 **TXT** 记录（DKIM，名称类似 `resend._domainkey`）
3. 打开 Cloudflare 控制台 → 选中你的域名 → **DNS** → **Records**，把 Resend 给的记录逐条添加。类型选 TXT，名称和内容照抄 Resend 的值。
4. 回到 Resend 的 Domains 页面点 **Verify**，状态变成 **Verified** 就说明 DNS 生效了。

> DNS 记录添加后可能要等几分钟才会验证通过，等一下再点 Verify。


### 二、创建 Resend SMTP 密钥

1. 进入 **API Keys** → **Create API Key**，权限选 **Sending access**，创建后复制保存，格式是 `re_` 开头的一串。**这个密钥只显示一次**，关掉页面就拿不到了。
2. 你要用的 SMTP 参数就四个，记下来：
   - 服务器：`smtp.resend.com`
   - 端口：`587`（或 `465`）
   - 用户名：`resend`
   - 密码：刚才那个 `re_` 开头的 API Key
   
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260903223757007.webp)

### 三、Cloudflare 开启邮件转发（收件）
1. Cloudflare 控制台 → 左侧菜单**「构建」→「电子邮件服务」→「电子邮件路由」**→ 在列表里点你的域名 → 点右上角**「接入域名」**，按提示启用。启用时它会自动把收件用的 MX 记录加上。
   > 注意：入口在**账号级左侧菜单**，不在某个域名的设置页里。启用完成的标准：列表里你的域名状态显示「已启用」、DNS 记录显示「已锁定」。
2. 先添加**目标地址（Destination address）**：填你的 Gmail 地址，Cloudflare 会发一封验证邮件到这个 Gmail，去收件箱点确认。
3. 添加**自定义地址（Custom address）**：比如 `hi@dqtx.cc`，动作选转发到你刚验证的 Gmail。
4. 想让所有 `*@dqtx.cc` 都能收，就开 **Catch-all**，同样转发到 Gmail。

   > 避坑：Gmail 设置里的「转发和 POP/IMAP」**不需要配置**。收件转发由 Cloudflare 全权负责，在 Gmail 里再加一层转发（比如转发到 `hi@你的域名`）只会让邮件绕一圈回自己，属于多余配置，保持「停用转发功能」即可。

到这里，收件已经通了：任何人发到 `hi@dqtx.cc`，邮件会自动落进你的 Gmail。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260903223644735.webp)
### 四、Gmail 添加发件身份（发件）

1. 打开 Gmail → 右上角齿轮 → **查看所有设置** → **账号和导入**。
2. 找到「用这个地址发送邮件」，点**添加其他电子邮件地址**。
3. 弹窗里填写：
   - 名称：你希望收件人看到的显示名
   - 电子邮件地址：`hi@dqtx.cc`
   - SMTP 服务器：`smtp.resend.com`
   - 端口：`587`
   - 用户名：`resend`
   - 密码：`re_` 开头的 API Key
   - 连接安全选 **TLS**
4. 提交后，Gmail 会发一封验证邮件到 `hi@dqtx.cc`。因为它会被 Cloudflare 转发到你的 Gmail，所以你直接在 Gmail 收件箱里就能收到。
5. 打开这封邮件，点确认链接（或把验证码填回 Gmail 弹窗），发件身份就配好了。
6. 配好的标志：「用这个地址发送邮件」列表里会出现 `hi@dqtx.cc`，下方注明「邮件通过 smtp.resend.com 发送，使用 TLS 的安全连接（端口 587）」。写邮件时，「发件人」栏点开就能切换身份。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260903224015414.webp)

### 五、验证闭环

配置完别急着用，跑一遍完整测试：

1. **测收**：用 QQ 邮箱或另一个邮箱发一封到 `hi@dqtx.cc`，看 Gmail 能不能收到。
2. **测发**：在 Gmail 写信时，发件人下拉切换成 `hi@dqtx.cc`，发一封给自己的 QQ 邮箱。
3. **测送达**：检查那封发出的信有没有进对方收件箱。如果进了垃圾箱，回到 Cloudflare DNS 补一条 **DMARC** 记录：类型 TXT，名称 `_dmarc`，内容 `v=DMARC1; p=none;`。

三项都过了，这个域名邮箱就算真正交付了。

### 几个注意事项

- **Resend 免费额度**：每天 100 封、每月 3000 封。域名邮箱用于个人收发完全够，群发营销邮件另说。
- **收件没有存储在服务器**：Cloudflare 只做转发，不发垃圾邮件广告，也不存你的邮件。
- **API Key 泄露处理**：Resend 的 API Key 有发信权限，别提交进代码仓库。泄露了就去 API Keys 页面删掉重建。
- **换域名也能用**：同一套流程换个域名再做一遍就行，Resend 和 Cloudflare 都支持多个域名。
- **126/QQ 会显示「由 xxx 代发」**：第三方 SMTP 发信时，回执地址在 `send.你的域名` 子域上，网易系客户端会标注一句「由 …@send.dqtx.cc 代发」。这是正常现象，SPF/DKIM/DMARC 全部通过，不影响送达；Gmail、Outlook、苹果邮件不显示这个标注。想彻底消除只能换收发同源的托管邮箱（Zoho Mail 免费版、腾讯企业邮箱），个人使用没必要。

以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

*\>/ 如果你正想搭自己的 AI 工作流，域名邮箱只是第一步。更多 Agent、Obsidian 与自动化工作流实操，访问主页：[dqtx.cc](https://www.dqtx.cc/)*
