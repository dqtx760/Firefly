---
title: WorkBuddy安装使用教程
published: 2026-05-11
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511220313821.webp
---
使用 AI Agent 时，两大痛点让人抓狂：

1. **命令交互反直觉**：斜杠命令一输就触发，需求还没写完，思路已被打断，反复修正苦不堪言。

2. **跨工具协作割裂**：想处理微信消息、整理聊天记录？必须配置插件、折腾接口，门槛高到让人放弃。

WorkBuddy 一击致命：先写需求、再挂技能，彻底杜绝误触；原生打通微信，零配置自动处理消息——让 AI Agent 不再是玩具，而是你办公和社交中无法离开的本能。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511220313821.webp)


### 下载&安装
https://www.codebuddy.cn/home/

首次打开需要微信登录，手机验证后即可使用

新用户赠送2500个积分：
- 基础体验包
- 活动赠送包，有效期30天

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511174010897.webp)

全局记忆文件位置
```
C:\Users\Administrator\.workbuddy\BOOTSTRAP.md
```

### API定价&设置

他们家的API购买地址
https://www.codebuddy.cn/profile/plan

个人专业版一个月58元，一年696元。

也可以接入其他厂商模型

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511180600420.webp)



### 微信集成方法

官网文档
https://www.codebuddy.cn/docs/workbuddy/WeixinBot-Guide

设置---Claw设置---微信助手集成-配置

扫码后即可在微信上发消息，电脑端会同步接收，稍后消息也会传到手机上，非常丝滑
⚠️但是你电脑上发消息不会同步到微信

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511180317180.webp)

### 导入skills技能

我自己有个中央仓库
C:\Users\Administrator\AISkills，里面有几百个技能

通过创建目录软链接就可以把AISkills给WorkBuddy使用。

执行前需要先处理一个问题：
**`.workbuddy\skills` 这个空文件夹必须先删除**，因为 `mklink` 要求链接路径不能已存在。

```
:: 1. 先删除空的 skills 文件夹
rmdir "C:\Users\Administrator\.workbuddy\skills"

:: 2. 创建符号链接（让 .workbuddy\skills 指向 AISkills）
mklink /D "C:\Users\Administrator\.workbuddy\skills" "C:\Users\Administrator\AISkills"
```

在这个步骤中：

```
.workbuddy\skills  →→→  AISkills
   (符号链接)            (真实目录)
```

| 路径                                         | 角色                      |
| ------------------------------------------ | ----------------------- |
| `C:\Users\Administrator\AISkills`          | **原始真实目录**（已有你的技能文件）    |
| `C:\Users\Administrator\.workbuddy\skills` | **符号链接目录**（指向 AISkills） |

像WorkBuddy这类图形化Agent，在技能调用的交互设计上非常人性化：你可以**先完整写完需求（比如 “推特上查询最新 Agent 进展”），再从技能列表中点选 `web-access` 这类工具触发调用**。

而不是像 Claude Code 那样先输入斜杠触发指令，再回头补充需求。这种「先写需求，后挂技能」的模式，从根本上避免了指令发送不完整、误操作触发无效调用的问题。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260511184406984.webp)

**以上就是我个人对这款软件的使用感受。**

从「命令误触」到「先写需求再挂技能」，从「跨工具割裂」到「微信零配置打通」——WorkBuddy 把 AI Agent 从折腾的玩具变成了顺手的生产力工具。

如果你也有什么私藏神器，欢迎在评论区留言推荐，互相种草！觉得有帮助的话，点个赞再走呗～


