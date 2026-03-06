---
title: Claude配置飞书MCP教程
published: 2026-03-06
tags: []
category: AIHacks
draft: false
pinned: false
---

**飞书MCP**是飞书文档集成AI能力的扩展功能，通过配置企业自建应用实现文档自动化处理、数据抓取与消息推送等高级功能。用户反馈其为"AI+飞书文档的强大组合"，配置完成后可显著提升工作效率。



#### 

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
3. **集成Cloud Code**：通过`cloud mcp add`命令添加MCP配置，格式示例：

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

帮我总结一下这篇文档的内容，列出行动清单。
https://xodnytdcaw.feishu.cn/wiki/TTedwAniUiXTm9kYwb6cDJL0nsf?fromScene=spaceOverview

帮我爬取一下秋芝2046最新的20篇小红书笔记，整理的多维表格

帮我在大强会员群里发一条消息，内容是“家人们早上好”
```

如果觉得这篇教程对你有帮助，别忘了**点赞+收藏+转发**三连呀！关注我，后续分享更多实用技巧、效率工具干货，下次见～ 👋



**大强远程技术支持：[742112.xyz](https://www.742112.xyz/)**



![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)