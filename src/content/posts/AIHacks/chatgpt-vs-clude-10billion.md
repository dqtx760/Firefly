---
title: ChatGPT月活破10亿，但我越来越离不开Claude了
published: 2026-06-03
tags:
  - ai-tools
  - chatgpt
  - claude
category: AIHacks
draft: true
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-chatgpt-claude-breadth-depth-20260603-150000.webp
---
昨天看到一个数据，直接给我整不会了。

Sensor Tower 发布的最新报告，ChatGPT 全球月活突破 10 亿。10 亿，这是什么概念呢，TikTok 达到这个数字用了好几年，ChatGPT 比它们都快。

然后我顺手看了一眼 Anthropic 的 Claude，月活 5600 万。

10 亿和 5600 万，差了快 20 倍。

这数字要是放在创业公司融资 PPT 里，投资人直接就走了。但问题是，我身边那些真正每天重度使用 AI 的人，包括我自己，打开 Claude 的频率越来越高。

我自己也不知道什么时候开始变成这样的。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-chatgpt-claude-breadth-depth-20260603-150000.webp)



### 10 亿人的选择，没毛病

先说 ChatGPT。

我觉得 10 亿月活这个数字没有任何悬念。你想想看，大多数人第一次接触 AI 就是 ChatGPT，它已经变成了一个动词，就像「百度一下」一样，大家会说「你 ChatGPT 一下」。

从产品本身来说，ChatGPT 现在已经是个超级 App 了。聊天、画图、搜索、语音、视频，你想要的功能它全有，而且不用装别的软件。对于大部分人来说，这就够了。

最近 OpenAI 的动作也特别密集。Codex 出了 Python SDK，一行命令就能嵌进自己的项目里。还有个叫 Codex Sites 的功能，能把你的工作成果直接变成交互式网站，团队一个链接就能用。虽然听着有点花哨，但说真的，确实方便。

然后是成本。GPT 5.5 的运行成本比 Claude Opus 4.8 低了 40%。你别觉得这个数字没感觉，对于大企业来说，这差距很要命。Uber 因为四个月内 AI 预算超支，直接限制员工使用。Salesforce 花了 3 亿美元买 Anthropic 的 tokens，然后冻结了工程招聘。你看，连这种巨头都在精打细算，普通公司更不用说了。

所以 ChatGPT 就是那种，你找不到理由不用它的产品。就像微信，它不一定在哪个功能上是最强的，但你就是离不开。

我完全理解 10 亿人为什么选它。

![ChatGPT生态](https://gitee.com/da-qiang-classmate/typora/raw/master/image/02-comparison-chatgpt-ecosystem.webp)

### 我为什么开始频繁打开 Claude

但我不知道从什么时候开始，我自己打开 Claude 的频率越来越高了。

一开始只是想试试，毕竟到处都在说 Claude 代码写得好。试了几次之后，就发现了一些不一样的东西。

上周我让 Claude 帮我处理一份很长的技术文档，大概 50 页。ChatGPT 也能处理，总结出来也还行，但就是差了点意思。Claude 读完之后，不仅帮我总结了要点，还指出了文档里前后矛盾的地方，甚至提醒我某个前提假设可能有问题。

怎么说呢，就是两个人都听了你的汇报，一个人只是重复了一遍你说的话，另一个人真的理解了你在说什么。

这种感觉在写代码的时候特别明显。

我之前一直用 ChatGPT 写代码，觉得挺好的。直到有一次，我用 Claude Code 处理一个涉及 50 多个文件的代码重构，它能准确理解整个项目的上下文，给出的重构方案不会破坏现有的逻辑。同样的任务，ChatGPT 经常需要我反复纠正上下文，有时候改到最后反而改出新问题。

最近 Anthropic 发布了 Claude Opus 4.8，在 SWE-Bench Verified 这种需要真正理解代码库的测试里表现很稳。但让我印象更深的是日常体验，Claude 写出来的代码就是很「干净」，注释到位，边界条件都考虑到了，不会为了显得厉害而故意写复杂的东西。

ChatGPT 有时候会这样，给你的方案看着很专业，但其实过度设计了。Claude 不会，它倾向于用最简单的方式解决问题。

还有一点，Claude 更愿意说「我不确定」。这听起来好像是缺点，但用多了你就知道，一个敢承认自己不确定的 AI，比一个啥都敢说但经常说错的 AI，靠谱太多了。

今天 Anthropic 还发了一份挺有意思的研究，他们分析了 832 个 AI 恶意账户，发现中高风险攻击者半年内从 33% 跃升到了 56%。这种研究不是谁都能做的，需要对自己产品的安全边界有很深的理解。

能做出这种研究的公司，你用它的产品会放心很多。

![Claude深度理解](https://gitee.com/da-qiang-classmate/typora/raw/master/image/03-comparison-claude-depth.webp)

### 为什么偏偏是 Claude

这就让我好奇了，为什么是 Claude 呢？Google 的 Gemini、Meta 的 Llama，按理说都有机会，但 Claude 就是那个让人用了之后会主动跟朋友推荐的。

我觉得核心是两个字，克制。

ChatGPT 什么都要做，什么都要有。Claude 不是，它专注于把几件事做到极致。它不急着加新功能，而是不断在深度上打磨。

在一个所有人都想做「AI 全家桶」的时代，这种克制反而成了稀缺品。

而且 Anthropic 今天的生态也不小了。Claude Partner Network 推出了分级体系，超过 4 万家企业申请加入，1 万多顾问获得了认证。Accenture 培训了 3 万人，Deloitte 覆盖了 47 万人。

这不是一个小众产品的数据。

更有意思的是，Anthropic 已经秘密递交了 IPO 申请，在上市竞赛中领先于 OpenAI。一家成立才三年多的公司，跑在了老大哥前面。

你说这世界变化快不快。

![克制与专注](https://gitee.com/da-qiang-classmate/typora/raw/master/image/04-comparison-restraint-focus.webp)

### 5600 万月活背后，有两种完全不同的逻辑

回到开头那两个数字，10 亿和 5600 万。

ChatGPT 的 10 亿，靠的是先发优势和生态壁垒。大多数人第一次用 AI 就是 ChatGPT，形成了路径依赖，这是互联网产品最经典的护城河。

Claude 的 5600 万，靠的是产品力和口碑传播。用过的人主动推荐，因为它在特定场景下确实更好。

这让我想起一个规律，工具类产品的竞争，最终比的不是谁用户多，而是谁在关键场景下不可替代。

Photoshop 的用户数远超 Figma，但设计师的主力工具早就换了。不是 Figma 更全面，而是它在「协作」这个场景下做到了极致。

Claude 也是一样，它不需要在通用场景打败 ChatGPT，只需要在深度思考、代码质量、长文理解这几个关键场景做到最好，就能持续增长。

而且你看，它的资本化节奏也跟上了。IPO、Partner Network、企业级信任，Claude 的增长不是短期热度，是有结构支撑的。

![两条增长路径](https://gitee.com/da-qiang-classmate/typora/raw/master/image/05-comparison-growth-paths.webp)

### 所以你需要二选一吗

不需要。

但你需要想清楚两件事。

第一，你的核心场景是什么。如果你只是偶尔用 AI 查个资料、翻译个文档，ChatGPT 完全够用，没必要折腾。如果你是程序员、研究者、内容创作者，日常工作涉及大量长文处理和代码编写，Claude 值得认真试一试。

第二，你愿意为质量付多少成本。Claude 的 API 成本比 ChatGPT 高 40%，但如果你的时间值钱，比如一次代码重构省下两小时 debug，或者一份分析报告少改三遍，这个差价早就赚回来了。

最后说一句我自己的感受。

今天最好的 AI 玩家，不是在卷参数，而是在卷「谁更懂你的场景」。ChatGPT 赢在广度，Claude 赢在深度。认清这个区别，比纠结「哪个更强」有用得多。

如果你两个都用过，你肯定知道我在说什么。

![两个工具互补](https://gitee.com/da-qiang-classmate/typora/raw/master/image/06-comparison-both-tools.webp)

>>>**参考资料**

1. [ChatGPT月活突破10亿，史上最快（含Anthropic IPO进展）](https://www.ithome.com/0/959/083.htm)
2. [Claude Partner Network扩展至4万家企业](https://www.anthropic.com/news/services-track-partner-hub)
---
以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：大强同学*
*\>/ 更多干货，请访问：[dqtx.cc](https://www.dqtx.cc/)*
