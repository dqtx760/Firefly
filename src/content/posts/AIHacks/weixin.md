---
title: 让 Claude 跑在微信里是种什么体验？
published: 2026-03-23
tags: []
category: AIHacks
draft: false
pinned: false
---

你是否经常在外，想要问 Claude 问题却不方便打开终端？或者想在手机上随时调用 Claude？今天给大家分享一个绝杀方案——给 Claude Code 装上微信插件，直接在微信里和 Claude 聊天，爆赞！



这个插件来自 Github 开源项目 `m1heng/claude-plugin-weixin`，利用微信 iLink Bot API，通过长轮询方式接收消息，**不需要公网IP，不需要域名，不需要配置webhook**，本地就能跑，简直无敌。



项目地址https://github.com/m1heng/claude-plugin-weixin

https://github.com/cyhhao/vibe-remote  （另外一个类似 更优秀）

https://github.com/qufei1993/cc-weixin

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/clean_Gemini_Generated_Image_9kld2h9kld2h9kld.webp)

## 准备工作

首先确认你已经安装好了这些东西：

- Claude Code v2.1.80+（必须是最新版）
- Bun 运行环境（安装看这里：https://bun.sh/）
- 能正常访问 GitHub 的网络（懂的都懂）
- 微信APP版本不低于8.0.70

## 安装步骤

### 1. 添加插件市场

打开终端，先添加作者的插件市场：

```bash
claude plugin marketplace add m1heng/claude-plugins
```

如果你和我一样需要代理，可以先给 git 配置代理：

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

### 2. 安装微信插件

添加完市场后，直接安装：

```bash
claude plugin install weixin@m1heng-plugins
```

等待几分钟，如果看到 `Successfully installed` 就搞定了。

### 3. 扫码登录微信

打开 Claude Code，运行配置命令：

```
/weixin:configure login
```

终端会弹出一个二维码，**打开微信扫一扫，确认登录**即可。Credentials 会自动保存，下次不用再扫。

⚠️ 注意：这是登录 iLink Bot 服务，不是登录你的微信帐号，请放心使用。

### 4. 启动 Claude 加载插件

登录完成后，用下面这个命令启动 Claude：

```bash
claude --dangerously-load-development-channels plugin:weixin@m1heng-plugins
```

> 因为现在还是渠道预览版，非官方插件必须加上这个参数，记住就行。

### 5. 配对你的微信

启动之后：

1. 在微信里找到你登录的那个机器人，给它发任意消息
2. 机器人会回复你一个**配对码**
3. 回到 Claude Code，运行：

```
/weixin:access pair 你的配对码
```

配对成功之后，你就是授权用户了！

## 开始使用

现在你可以直接在微信上给机器人发消息，机器人会转发给 Claude Code，Claude 回复完会自动发回你的微信。

不管你是在路上，还是在被窝里，掏出手机就能问 Claude，简直不要太爽！

几个常用命令记住：

| 命令                           | 作用           |
| ------------------------------ | -------------- |
| `/weixin:configure login`      | 扫码登录       |
| `/weixin:configure status`     | 查看登录状态   |
| `/weixin:access list`          | 查看已配对用户 |
| `/weixin:access revoke <code>` | 撤销授权       |

## 常见问题

**Q: 一直连接不上GitHub怎么办？**
 A: 检查代理是否正常，或者手动克隆到 `~/.claude/plugins/` 目录。

**Q: 收不到消息怎么办？**
 A: 检查 Claude 是否启动，并且确认加载了微信插件。看一下配对码是否正确配对，确认安装了Bun

**Q: 支持多人使用吗？**
 A: 支持，你可以给多个微信号配对，都能使用。

**Q: 收费吗？**
 A: 插件本身完全免费，MIT 开源。Claude API 费用走你自己的 Claude Code，微信机器人 iLink 服务请参考官方说明。

## 写在最后

这个插件真的解决了大问题，以前出门在外想找 Claude 帮个忙特别不方便，现在直接微信里搞定，确实牛批！

全程配置下来 5 分钟搞定，不需要复杂的服务器和域名，普通人也能用上。**建议收藏**，哪天想用了翻出来直接抄作业！



**如果觉得教程对你有帮助**，随手**点赞、在看、转发**三连吧！有任何问题，欢迎在留言区评论，我会逐一回复。👏👏



如需远程配置，联系**微信：dqtx33**  远程客户端下载网址：[742112.xyz](742112.xyz)

