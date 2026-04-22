---
title: Claude配置飞书MCP教程
published: 2026-03-06
tags:
  - MCP
  - Claudecode
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306075245649.webp
---

平时用飞书文档做笔记、整理资料、写方案的朋友，一定要试试这个**超好用的**组合 ——Claude + 飞书 MCP\**。**它就像给飞书文档装了个**智能外挂**，不用复杂操作，**你只要在 Claude 里说一句话，内容就能自动同步、推送到飞书文档**，，还能直接生成、写入多维表格。



配置好以后，写文档、做总结、搞自动化效率直接翻倍，真正实现**AI 帮你打工**。今天就把完整配置教程分享给大家，看完就能上手。



## 一.准备阶段

1. **访问飞书开发者后台**：通过`open.feishu.cn`进入企业自建应用创建界面
2. **创建应用**：输入应用名称（如"飞书MCP Demo"）并完成基础信息配置
3. **添加机器人能力**：在应用管理界面中启用"机器人"功能模块

## 二.权限配置

权限管理-开通权限

**应用身份权限**

**用户权限身份权限**

- 云文档
- 消息与群组
- 多维表格

## 三.应用发布与认证

1. 创建应用版本：填写版本号（如v1.0.0），保存-申请线上发布
2. 审批：[点此通过审核](https://xodnytdcaw.feishu.cn/admin/appCenter/audit/7613811822572129487)

2. 获取凭证信息：审批通过后在"凭证与基础信息"中获取App ID和App Secret
3. 安全设置配置：添加重定向URL

```
http://localhost:3000/callback
```

## 四.本地环境配置

1. **安装依赖**：确保已安装Node.js环境
2. **登录认证**：执行命令行工具登录`openapi mcp`，替换`your fid`和`app secret`

```
npx -y @larksuiteoapi/lark-mcp login -a <your_app_id> -s <your_app_secret>
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306075245649.webp)



## 五.Claude中集成

告诉Claude：帮执行这个命令

⚠️App ID与App Secret换你自己的

```
claude mcp add-json --scope=user lark-mcp '{
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "<your_app_id>",
        "-s",
        "<your_app_secret>",
        "--oauth"
      ]
    }'
```



验证

```
claude mcp list
```

## 六.案例

```
帮我创建一个飞书文档，标题是“如何建立自己的人生清单”。

帮我总结一下这篇文档的内容，列出避坑要点清单。
https://xodnytdcaw.feishu.cn/wiki/TTedwAniUiXTm9kYwb6cDJL0nsf?fromScene=spaceOverview

帮我爬取一下秋芝2046最新的20篇小红书笔记，整理的多维表格

帮我在大强会员群里发一条消息，内容是“家人们早上好”
```

如果觉得这篇教程对你有帮助，别忘了**点赞+收藏+转发**三连呀！关注我，后续分享更多实用技巧、效率工具干货，下次见～ 👋



**大强远程技术支持：[742112.xyz](https://www.742112.xyz/)**



![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)