---
title: Manus 新推出的 Cue
published: 2026-09-30
tags:
  - AI
  - Agent
  - Manus
  - Cue
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/2799e68cacd27c4c5d0c59521f6c3e67.webp
---
刚体验了一下 Manus 新推出的 Cue：它不只是一个聊天机器人，而是一个可以拥有自己邮箱和电脑的个人 Agent。

你可以直接给它发邮件派活，也可以把多个 Agent 拉进群聊，让它们分工完成任务。**邀请码**：E9W6Z
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/2799e68cacd27c4c5d0c59521f6c3e67.webp)


可能你会问，Cue 和 Meta 的 Muse有什么不一样？Meta Muse是一个长期陪伴你的超级个人助理，Manus Cue更像一支可以分工协作的 AI 团队

| 产品        | 更像什么            | 主要特点                     |
| --------- | --------------- | ------------------------ |
| Meta Muse | 一个长期陪伴你的超级个人助理  | 浏览网页、处理日常事务、连接个人应用、后台执行  |
| Manus Cue | 一支可以分工协作的 AI 团队 | Agent 身份、邮箱、电脑、原生群聊、电话协作 |

## 使用指南


当前 Cue 需要邀请码才能体验，仅支持**Android**/ **macOS**，想体验的，可以访问cue.im会弹出适配你设备的下载版本


首次打开后，按照页面完成注册，不过需要📱验证，自己木有的话，可以后台回复ma获取自用渠道。

接🐎成功后，需要一个邀请码才可以使用

可以填写我的**邀请码**：

```
E9W6Z
```

然后进去就可以使用了。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260930021817873.webp)


Windows微软商店下载
https://apps.microsoft.com/detail/9pdxfbwzntnj?hl=zh-CN&gl=CN

Windows离线下载安装

下载ManusAI.CuebyManus_1.0.11.0_neutral_~_vajzd2mq3s8wj.msixbundle

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261015104257008.webp)


示例：

下载目录：D:\software

```
cd D:\software
Add-AppxPackage -Path "D:\software\ManusAI.CuebyManus_1.0.11.0_neutral_~_vajzd2mq3s8wj.Msixbundle"
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261015104725489.webp)

安装后了打不开于是让我怀疑 Windows 的**系统网络栈（WinHTTP）代理**配置有问题，而 AppX 激活用的是它。

查询 WinHTTP 系统代理配置
```
netsh winhttp show proxy
```

发现端口了跟我现在的不一致，于是我设置成了我现在端口，修复动作

把 WinHTTP 代理指到了实际在用的 7897 端口。

```
netsh winhttp set proxy "127.0.0.1:7897"
```


安装好之后呢，打开你直接登录就可以了

我使用谷歌账号登录之后呢，不过它需要一个手机的验

我使用的是hero-sms英格兰的接🐎

复制号码粘贴的的时候，不要粘贴前两位区号

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261015112527166.webp)


### 延伸

|代理类型|谁来用|存在哪里 / 在哪看|
|---|---|---|
|**WinHTTP 代理**（我们刚修的）|Windows 系统网络栈、AppX 应用激活、系统服务|**注册表**里存的是二进制，不用直接看；用命令 `netsh winhttp show proxy` 查看（最直观）|
|**WinINET 代理**（浏览器那套）|浏览器、IE 内核应用、很多普通程序|“Internet 选项 → 连接 → 局域网设置”，或注册表 `HKCU\...\Internet Settings` 的 `ProxyEnable` / `ProxyServer`|
|**环境变量 HTTP_PROXY / HTTPS_PROXY**|命令行工具：curl、git、pip、node、python 等|系统 / 用户环境变量（`系统属性 → 环境变量`），就是你之前看到 `HTTP_PROXY=http://127.0.0.1:7897` 的那个地方|
