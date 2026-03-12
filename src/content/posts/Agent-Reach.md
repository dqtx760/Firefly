---
title: 给AI装上“眼睛”：Agent-Reach使用真实体验
published: 2026-03-12
tags: []
category: 
draft: false
pinned: false
---

## 引言

平时做AI开发或者找技术资料的时候，你是不是也经常遇到这种情况：想做一个OpenClaw的落地项目，得先开B站刷教程找实操步骤，开GitHub找相关的开源仓库和issue，开微信搜一搜翻公众号的踩坑经验，开推特看看海外开发者的最新玩法，来回切换七八个网站，半小时过去了还没整理好有用的信息。遇到需要翻墙的平台还得折腾代理，搜到的内容要么是HTML垃圾代码，要么是需要登录才能看，好不容易找到的信息还散落在各个平台，整理起来又要花半天时间。大多数人都以为跨平台找资料就是这么麻烦，只能自己慢慢折腾，但其实用Agent Reach，你只需要一句话，就能让AI帮你搞定14个主流内容平台的搜索和内容提取，10秒就能出结果，至少能帮你省90%的找资料时间。



**项目地址**https://github.com/Panniantong/Agent-Reach

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/diaoy.webp)

## 为什么用它？
AI Agent 写代码、改bug的能力已经很强了，但一涉及到网上找资料就总是抓瞎：看不了YouTube/B站的字幕内容、搜不了推特/小红书的用户讨论、爬回来的网页满是HTML垃圾代码、普通搜索引擎的结果质量差还广告多，而且每个平台都要单独装工具、调配置、搞登录认证，光是让AI能正常读个推特就得折腾大半天。Agent Reach 把这些选型和配置的活儿都提前做完了，你不需要懂技术细节，只需要一句话安装，装完直接让AI帮你搜遍14个平台，不用自己记任何命令。

## 30秒快速安装
✅ 支持 Claude Code / OpenClaw / Cursor / Windsurf 所有能跑命令行的AI Agent
⚠️ OpenClaw用户注意：安装前先开启exec权限，运行`openclaw config set tools.profile "coding"`即可，或者在`~/.openclaw/openclaw.json`中设置`"tools": { "profile": "coding" }`，设置后重启Gateway并开启新对话即可，其他平台的用户不需要做任何前置操作。

不需要手动敲复杂命令，直接给AI发这句话就行，全程自动安装依赖、配置环境，不用你动手操作：
```
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```
安装完成后可以让AI运行命令验证是否安装成功：
```
帮我运行 agent-reach doctor 查看所有可用渠道
```

## 支持的平台
| 平台 | 状态 | 功能 |
|------|------|------|
| 任意网页 | ✅ 开箱即用 | 自动提取正文内容，过滤HTML垃圾代码 |
| 全网语义搜索 | ✅ 开箱即用 | AI语义搜索比普通搜索引擎精准10倍，完全免费无API调用限制 |
| YouTube/B站 | ✅ 开箱即用 | 自动提取视频字幕、按播放量搜索相关视频 |
| GitHub | ✅ 开箱即用 | 搜索开源仓库、读取Issue和PR内容 |
| 微信公众号/微博 | ✅ 开箱即用 | 搜索相关文章、提取全文内容 |
| RSS订阅 | ✅ 开箱即用 | 订阅RSS源，有更新自动推送 |
| 推特/小红书/抖音 | ⚙️ 简单配置 | 搜索内容、读取帖子、解析抖音无水印下载链接 |
| Reddit/LinkedIn/小宇宙 | ⚙️ 简单配置 | 搜索帖子、读取用户Profile、播客音频转文字 |

🔒 安全提醒：需要登录的平台建议用小号导出Cookie配置，所有Cookie只会存在你本地设备，不会上传到任何第三方服务器，代码完全开源可审查。

## 测试话术参考
装完直接让AI执行就行，不用记任何命令：
| 场景 | 话术 |
|------|------|
| 搜B站视频 | 帮我搜B站上「OpenClaw教程」相关视频，按播放量列前5个 |
| 全网搜资料 | 用语义搜索查一下2026年AI创业公司Top10 |
| 读公众号文章 | 搜「AI Agent落地」相关的最新公众号文章 |
| 搜GitHub代码 | 搜Star最高的MCP server开源项目 |
| 看视频内容 | 提取这个YouTube链接的字幕并总结核心内容 |

## 常见踩坑
### 1. Claude找不到agent-reach技能
原因是Claude扫描技能只会识别根目录下的SKILL.md文件，而agent-reach默认的SKILL.md嵌套在`agent_reach/skill/`目录下，Claude扫描不到，只需要把`~/.claude/skills/agent-reach/skill/SKILL.md`复制一份到agent-reach根目录就能解决。
### 2. 服务器访问B站/Reddit返回403
这是因为平台会封锁数据中心IP，配置住宅代理就能解决：运行`agent-reach configure proxy http://user:pass@ip:port`即可，本地家用网络使用不需要配置代理。
### 3. 卸载
如果不需要使用了，直接运行`agent-reach uninstall`就能一键清除所有相关文件和配置，包括本地存储的Cookie信息。

## 总结
总的来说，Agent-Reach是一款专门为AI Agent打造的跨平台搜索神器，核心价值就是帮你省掉折腾各种工具、配置、代理的时间，让你能用最短的时间找到需要的高质量资料。不管你是AI开发者、技术博主、内容创作者还是普通的AI工具爱好者，都能零门槛快速上手，不用懂复杂的技术细节，一句话就能让AI帮你搞定全网14个平台的内容搜索。如果你平时经常需要跨平台找资料，一定要试试这个工具，至少能帮你提升10倍的找资料效率。



<u>**以上，既然看到这里了，如果觉得教程对你有帮助，随手点个赞、收藏、转发三连吧！有任何问题，欢迎在留言区评论，我会逐一回复。👏👏**</u>



**🛠️ 大远程技术支持**

如果你在安装、配置或使用中遇到任何问题，不想自己折腾

随时可以找我提供 **1 对 1 远程技术支持**：[742112.xyz](742112.xyz)



🚀 **关于的知识星球**

为了帮你节省更多时间，我把私藏的软件安装包、激活工具、效率工作流和独家教程，都整理进了我的知识星球「<u>大强・效率空间站</u>」：68元/年，承包你一整年的效率提升。👇 微信扫码：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)
