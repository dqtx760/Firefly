---
title: Newtype-os完整工作流指南
published: 2026-03-30
tags: []
category: AIHacks
draft: false
pinned: false
---

你有没有过这样的经历:



想写一篇深度文章，但光是调研就花了一整天？

网上资料查了一堆，结果自己先搞乱了？

写完之后自己都不想看第二遍，更别说发出来了？



我一直觉得，AI 时代最缺的已经不是「能帮你写东西的工具」了，而是**一套完整的工作流**。



直到我发现了 **newtype-os**。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_1zejbk1zejbk1zej.webp)



## 1.它是什么？



简单说，它是一个**多智能体协作系统**，内置 8 个 AI Agent，相当于给你的终端装了一整个内容团队：



* **Chief（主编）**：你只需要跟它说话，它来协调一切

* **Deputy（副主编）**：执行层，调度下面的专家

* **Researcher（研究员）**：帮你调研、找资料

* **Fact-Checker（事实核查员）**：验证信息来源

* **Archivist（档案员）**：从你的知识库里检索内容

* **Extractor（提取师）**：把 PDF、网页、图片转成 Markdown

* **Writer（写手）**：把素材变成初稿

* **Editor（编辑）：** 帮你改稿、润色



同时项目深度集成多款 MCP 实用工具，核心亮点是打通微信生态，复用此前拆解的 WeClaw 项目能力，支持移动端远程操控、随时发指令。



全程只需和Chief 主编用自然语言提需求，无需手动操作、不用分步对接，系统会自动串联所有 Agent 分工协作，一站式完成从调研、取材、撰稿到精修的全流程创作。





## 2.能做什么？



举几个具体例子：



**场景 1：写一篇深度文章**



```plain&#x20;text
> 我想写一篇关于 AI Agent 架构趋势的文章

Chief：好的，我帮你调研一下最新的动态...
[自动调用 Researcher 调研]
[自动调用 Fact-Checker 验证]
[自动调用 Writer 写作]
[自动调用 Editor 润色]

完成！生成了完整的文章草稿
```



一条命令，从调研到成稿，全部搞定。



**场景 2：快速查资料**



```plain&#x20;text
> 帮我查一下 MCP 协议最近有什么新动态

Chief：[调用 Researcher 搜索] [调用 Fact-Checker 验证]
找到了 3 篇最新文章，主要内容是...
```



**场景 3：管理知识库**



```plain&#x20;text
> 之前我写的关于 xxx 的笔记在哪？

Chief：[调用 Archivist 搜索你的 Obsidian 笔记]
找到了，在 xx 文件里，需要我调取出来吗？
```



**场景 4：提取网页内容**



```plain&#x20;text
> 把这个 PDF 的内容提取出来

Chief：[调用 Extractor]
已提取完成，保存在 xxx.md
```



**场景 5：微信远程控制**



装好 WeChat 集成后，直接在微信上发消息给机器人， Chief 就会帮你干活。



## 3.有什么内置技能？



系统还自带了一些「专业技能」：



* **Super Analyst**：12 种分析框架（SWOT、波特五力、第一性原理等）

* **Super Writer**：6 种写作方法

* **Super Fact-Checker**：系统化事实核查

* **Super Editor**：4 层改稿（结构→段落→句子→词）

* **Super Obsidian**：Obsidian 笔记管理



需要用的时候，Chief 会自动加载相应的技能。



## 4.怎么安装？



**安装命令**

```bash
npm install -g @newtype-os/cli
nt        # 启动后直接说话
nt inut   #初始化配置，注入技能到其他 AI工具
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260330163220785.webp)





**附相关命令：**

```plain&#x20;text
/connect        #连接模型供应商
/agent-models   #Agent模型分配
/init-deep      #ai读取仓库所有文章 创建知识文档
/init-sou       #创建定义Chief性格（表人格）的soul.md文档
```

## 5.适合谁？

✅ 适合人群

1. 频繁写文章、做内容的人

2. 需要调研+写作完整流程的

3) 用 Obsidian 管理知识的

4) 想用微信远程指挥的



❌ 不适合人群

1. 偶尔写一次的

2. 只想要简单问答的

3) 不用知识管理工具的

4) 只需要基础 AI 聊天的





## 6.我的感受



用了一段时间，最大的感受是：**终于可以把「创作」这件事，真正变成一件只需要动嘴不动手的事。**



以前写一篇文章，要自己查资料、自己整理、自己写、自己改，来来回回折腾好几遍。现在只需要告诉 Chief 要写什么，它会把后面的事情全部安排好。



当然，它不是完美的。生成的内容还是需要自己过一遍，核心观点还是需要自己把控。但至少，**那些繁琐的体力活，有人帮你干了。**



**PS.**

- 远程服务微信：dqtx33  

- 付费社群：[点此加入](https://t.zsxq.com/d4zSX)
