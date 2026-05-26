---
title: Obsidian联动notebooklm
published: 2026-05-26
tags:
  - obsidian
  - notebooklm
  - workflow
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-obsidian-notebooklm.webp
---
NotebookLM 的 AI 能力对 Obsidian 是极好的补充——Deep Research、Audio Overview、PPT 生成，每一样都实用。但问题是每次都要开网页、手动传文件，笔记一多简直是灾难。

今天教你用 Claude Code 把 NotebookLM 的全部功能塞进 Obsidian。不用打开浏览器，不用花一分钱 API Token，在笔记库里一句话就能跑 Deep Research、自动生成 PPT 和播客音频。

### 环境准备

开始之前，确保你的环境有以下东西：

- **Claude Code**：https://claude.com/product/claude-code
- **NotebookLM-py：https://github.com/teng-lin/notebooklm-py
- **Obsidian**：https://obsidian.md/zh/

装上之后，你只需要在 Claude Code 中用自然语言描述需求，剩下的全自动——创建笔记本、导入资料、生成内容、导出文件，全在 Obsidian 内部完成。

下面用三个案例，从简单到复杂，展示这套工作流的实际威力。

### 场景案例

#### 案例一：Deep Research + 自动生成 PPT

```
使用 notebooklm skill，对 'OpenClaw vs Hermes Agent' 进行Web深度研究（Deep Research）。将搜集到的相关信源自动建立 NotebookLM，把所有被引用文献的全文（Markdown 格式）导出并存放到 /notebooklm/research/ 目录，最后生成一份演示文稿（Slide Deck），存入当前项目的根目录。
```




#### 案例二：本地笔记 → 测验 + 播客 + 信息图

```
读取我本地 /notes/ 文件夹下的所有有关 claude code 的笔记。使用 notebooklm skill，利用这些笔记在 NotebookLM 中创建一个笔记本，并生成一套困难难度的 Quiz 测验，一部辩论格式的音频（Audio Overview），和一份资讯图表（Infographic），将生成的测验以 Markdown 格式保存到项目根目录中，将生成的音频和资讯图表下载到项目根目录中。注意：测验、音频和资讯图表都要使用中文。
```


#### 案例三：零基础 AI 学习——从规划到落地页全自动

```
我是一个完全零基础的AI小白，希望从几个不同维度学习AI，既能赶上时代潮流，也能在未来从事相关工作。结合2026年AI发展的趋势，请为我推荐3到4个必须彻底掌握的具体领域，以及1到2个未来需要进阶的潜在领域。请给出这5个不同方向的主题，并分别做出简要解释。

同时在NotebookLM上分别创建5个涵盖不同领域的独立笔记本。针对每个主题，都要使用其“源文件”（Sources）功能，并确保每个笔记本都包含内容丰富、来源多样的资料。同时，请务必注意信息的时效性与可靠性。

帮我将你搜集到的内容全部自动导入到各自的笔记本里面，并且针对每一个笔记本都帮我制作一张信息图，并把链接也发过来让我可以直接点击

另外，请根据我nbookLM里面的内容，帮我制定一个一个月的学习计划，包含我一定需要看到的youtube链接，并且我需要你帮我筛选一下视频的质量。我需要发布时间在6个月以内播放量在1万以上的视频。同时请直接在左侧的项目中帮我创建这份计划书。

同时根据我从NotebookLM中提取的内容，这份以及这份学习计划，帮我创建一个可以交互的落地页，我需要简单的功能是可以进学习进度的追踪，自由标记我的学习进度，页UI要好看，内部链接点击可以直接跳转。另外，有完善动画，登录界面，一键部署github，部署Vercel。搞完直接使用内部的浏览器帮我打开我要测试一下功能
```



### 写在最后

三个案例，从简单到复杂，核心就一句话：**把「手动操作网页」变成「一句话指令」**。

以前用 NotebookLM：打开浏览器 → 登录 → 创建笔记本 → 一个一个上传文件 → 手动点生成 → 手动点导出。笔记多了以后，光管理笔记本就能把你耗死。

现在你只需要在 Obsidian 里敲一行自然语言，Claude Code 帮你跑完所有步骤。

