---
title: OpenCode Zen 的 Jev 1.13 免费
published: 2026-09-20
tags:
  - AI
  - OpenCode
  - Jev
  - 提示词
  - 免费
category: AIHacks
draft: false
pinned: false
image: 
---
OpenCode Zen 上线了一个**完全免费**的判断模型 **Jev 1.13 Free** 

**不生成文本**，只回答「是/否、选哪个、几分」，还附概率。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-jev-113-free-20261011-170944.webp)

---

## 三个 primitive（先背这个）

| 类型 | 问什么 | 返回 | 像代码里的 |
|---|---|---|---|
| `noul` | 这是不是 X？ | 0-1 概率 | `if (isX(state)) ...` |
| `choice` | 这是哪个？ | 每个选项的概率 | `switch (classify(state)) ...` |
| `score` | 这几分？ | 0-N 级 + 概率 | `if (severity(state) >= 3) ...` |

## 啥时候该调 Jev（决策准则）

三个问题全 ✓ → 用 Jev：

1. 卡点是不是"语义判断"？不是生成 / 对话 / 解释
2. 候选答案能不能枚举？yes/no、几个分类、几个分数级
3. 能容忍 ~95% 准？不要求 100%

有一个 ✗ → 用别的（正则、prompt、专家模型都行）。

---

## 三步走

1. 注册 OpenCode Zen，拿 API key → https://opencode.ai/auth
2. 复制下面整段提示词
3. 把 `<你的 API Key>` 替换成你的 key，发给任意 Agent

---

## 配置提示词
直接复制发给 Agent

````text
## 任务

帮我做两件事：
1. 安装 TypeSafe AI 官方 skill（用于 System One 模型 / Jev），接入 OpenCode Zen
2. 基于这个 skill 的能力，扫一遍我当前的工作流，找出 3 个最适合用 Jev 提速的场景

## 这个 skill 是什么

Jev 是 OpenCode Zen 的 System One 模型，**把"语义判断"变成 typed 函数调用**。
不生成文本，直接返回 typed value + 概率。代码拥有 workflow，模型提供 programmable common sense。

## 三个 primitive（背下来）

- `noul`：是/否 + 概率（0-1）—— "这是不是 X？"
- `choice`：多选一 + 概率分布 —— "这是哪个？"
- `score`：打分（0-N 级）+ 概率 —— "这几分？"

## 决策准则（什么时候调 Jev）

三个问题全 ✓ → 用 Jev：
1. 卡点是不是"语义判断"？不是生成 / 对话 / 解释
2. 候选答案能不能枚举？yes/no、几个分类、几个分数级
3. 能容忍 ~95% 准？不要求 100%

## 参考

- Skill 仓库：https://github.com/typesafe-ai/skills
- 实时文档：https://docs.typesafe.ai/llms.txt
- OpenCode Zen 文档：https://opencode.ai/docs/zh-cn/zen/

## 步骤 1：安装 skill

把下面这个文件下载到 agent 的 skills 目录：
https://raw.githubusercontent.com/typesafe-ai/skills/main/skills/typesafe-ai/SKILL.md

按你 agent 的位置选：
- OpenCode 全局：`~/.config/opencode/skills/typesafe-ai/SKILL.md`
- OpenCode 项目级：`<project>/.opencode/skills/typesafe-ai/SKILL.md`
- Claude Code：`claude plugin marketplace add typesafe-ai/skills && claude plugin install typesafe@typesafe-ai`
- 其他 agent：`npx skills add typesafe-ai/skills --skill typesafe-ai -g`

## 步骤 2：配置 OpenCode Zen

在 `~/.config/opencode/opencode.json` 的 `provider` 里加：

```json
{
  "opencode": {
    "apiKey": "<你的 API Key>"
  }
}
```

如果用别的客户端，按它的 schema 接入 OpenCode Zen（模型 ID `opencode/jev-1.13-free`，端点 `https://opencode.ai/zen/v1/systemone`）。

## 步骤 3：跑通第一个 judgment（验证 key）

```bash
curl https://opencode.ai/zen/v1/systemone \
  -H "Authorization: Bearer <你的 API Key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"jev-1.13-free","state":"我的付款连续 3 天失败，快救我。","questions":{"is_urgent":{"type":"noul","instructions":"这个请求是否需要紧急处理？"}}}'
```

期望返回形如 `{"answers":{"is_urgent":{"type":"noul","noul":0.96}},"cost":"0"}`。

## 步骤 4：扫我的工作流，找出 3 个能用 Jev 的场景

按下面格式输出 3 个场景，每个都给可立刻跑的 prompt：

```
场景 N：<名字>
- 卡点：<我代码/工作流里卡在哪>
- primitive：<noul / choice / score>
- 预期 prompt（state + questions）：<具体内容>
- 预期收益：<节约多少 / 解决什么>
```

参考场景（你可以想到更好的）：
- 评论是否需要人工审核 → noul
- 文章应该归到哪个分类 → choice
- 标题党检测 + 吸引力打分 → noul + score
- 工单路由到哪个部门 → choice
- 简历与 JD 匹配度 → score
- 搜索词背后的用户意图 → choice
- 文章开头前 200 字抓不抓人 → score

## 我的 OpenCode Zen API Key

<你的 API Key>

## 注意

Jev 是 System One 模型，**不生成文本** —— 不要把它设为默认 chat model，会破坏 TUI 对话。
````

---

## Jev vs 普通 LLM 的差别（一句话）

|         | 普通 LLM                  | Jev                       |
| ------- | ----------------------- | ------------------------- |
| 怎么问     | 写 prompt                | 按 schema 问                |
| 怎么回     | 文本，要解析                  | typed value + 概率          |
| 你代码要做的事 | `JSON.parse(text)` 还要容错 | `data.answers.x.noul` 直接用 |
| 适合      | 生成、对话、解释                | 分类、判断、打分                  |

typed 在协议层 — 这就是为啥 skill 说 "use it like a programming primitive"。

---

**彩蛋**：新用户订阅 opencode go 走这个链接，双方各拿 $5 立减：
https://opencode.ai/go?ref=9AYD2ZQFJG

装好了、用上了，欢迎留言告诉我你用 Jev 干了啥 👇