---
title: Muse + Tailscale配置指南
published: 2026-10-10
tags:
  - tailscale
  - muse
  - ai-agent
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-muse-tailscale-devices-20261010-215831.webp
---
今天分享一个真香组合：Muse + Tailscale，让你的 AI 助手直接连进你家的内网。

什么意思呢？就是把家里的电脑、NAS、迷你主机都连到同一张私人网络里，再把 Muse 也拉进来。

从此你躺在沙发上跟它说一句"去我 NAS 上找张壁纸发我"，它自己进去翻、挑好发你，全程不用你动手。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-muse-tailscale-devices-20261010-215831.webp)



### 一、让 Muse 先连

前提很简单：看这篇文章的你，肯定已经用上 Muse 了。

第一步，给 Muse 发一段提示词，让它本身先去连接。你可以直接说：

```
请把这台电脑加入我的 Tailscale 网络
```

Muse 会按你的指令，跳到对应平台（Tailscale 后台）让你登录同一账号。登录完，Muse 所在的机器就进了你的私网。

### 二、各设备装上软件

去 [tailscale.com](https://tailscale.com)注册，我是用GitHub直接注册登录的

接下来，家里那些你想让 Muse 管理的设备，每台都下载安装这个软件（Tailscale 客户端）就行。Windows、macOS、Linux、群晖、手机都能装，装完登录同一个账号，下载的话去这：tailscale.com/download

设备自动进网，后台列表里能看到它在线。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261010213949534.webp)


### 三、访问家里的某个文件夹

如果想让 Muse 读写家里某台设备的某个文件夹，

在那台家里设备上，**用 Tailscale 的 serve 功能把这个文件夹挂成内网地址**

1,先去Tailscale管理后台→DNS页面，把 HTTPS打开（一次性的，为了自动发证书)。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261010172409405.webp)

2, 在那台想让muse控制的电脑上打开PowerShell，跑这两条(8443端口不用管理员权限，443才要)：

--bg 的意思是后台持久化，重启电脑后还在，不用每次重开。
```
& "C:\Program Files\Tailscale\tailscale.exe" serve --bg --https=8443 "D:\data\images\壁纸"
& "C:\Program Files\Tailscale\tailscale.exe" serve status
```

3，测试

比如，我让Muse帮我找一下，在我那个壁纸文件夹当中找一个小姐姐的壁纸
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/d8c143fab280dcf3b140a2b3c236dc6b.webp)



### 收个尾吧！

自动上次muse邪修教程发布后，我也深度玩这个软件有一段时间了，也帮很多朋友用上了，确实非常的智能。

不过上次留的兑换码，已经用完，**补个新的**：3T02ZM

你让Muse帮你做哪些事？欢迎在评论区聊聊。
