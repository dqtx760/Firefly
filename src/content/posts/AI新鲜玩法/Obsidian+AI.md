---
title: Obsidian+AI
published: 2026-02-03T21:22:43.314Z
description: 这几天，在gihub发现Obsidian重磅插件，直接把 AI 功能深度集成到核心里了！网上都在夸赞，确实牛批！今天我要分享的 Obsidian+AI 组合，一...
tags: ["效率工具","AI","Claude","Typora"]
draft: false
lang: zh_CN

image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215058651.webp
category: AI新鲜玩法
---



这几天，在gihub发现Obsidian重磅插件，直接把 AI 功能深度集成到核心里了！网上都在夸赞，确实**牛批**！今天我要分享的 Obsidian+AI 组合，*一次性解决这些痛点**！简单说，你的笔记不再是一个个**死文档*，而是变成了能理解、能推理、能自动化的**AI 上下文层**。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215058651.webp)

## 一.准备工作

✅已安装 Obsidian

✅安装并配置了 Claude Code





## 二.Obsidian个人配置

**我的统文件结构**

```
📁 你的 Vault
├── 📄 CLAUDE.md              # AI 配置文件
├── 📄 claude.json            # Skills 配置
├── 📁 .claude/
│   ├── 📁 commands/          # 自定义命令
│   └── 📁 skills/            # Skills 包
├── 📁 加工中/                 # 正在编辑的文章
├── 📁 1️⃣常用工具/            # 常用工具配置
├── 📁 2️⃣流量策划/            # 流量策划项目
├── 📁 3️⃣销售转换/            # 销售转换项目
└── 📁 4️⃣产品交付/            # 产品交付项目
```



### 1.外观设置

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215034732.webp)

### 2.主题推荐

设置-外观-主题-管理，搜索：

推荐主题

- Primary(推荐）
- AnuPpuccin
- Baseline
- Typora-Vue
- Zen

### 3.安装必要插件

`设置`-`第三方插件`-`关闭安全模式`---社区插件市场，搜索：

#### Floating Search  ：搜索神器

> 功能：tag: (Find tag) → 快捷键 Ctrl + F
> 用途：快速搜索标签和内容

#### Git ：Git 同步插件

> 详细教程：点此查看 →https://www.bilibili.com/video/BV1fZCyBYEuT/?spm_id_from=333.1387.favlist.content.click&vd_source=206031f494850e57fd6c92ace02b1bed
>
> 用途：版本控制、团队协作、备份恢复

![img](https://xodnytdcaw.feishu.cn/space/api/box/stream/download/asynccode/?code=NzJiOTJmYjM2NDJkYTY2YmNlMGEwNTM5MTUzMTc1MjNfUDNQaVFUUWE0SVpXc1ZpU0YxTFVzb2NNMG16N3N6QzJfVG9rZW46Qk9XYmJyMVM2b1pVSTZ4TU5yc2NLYmNQbkJnXzE3NjgzMDgwMTI6MTc2ODMxMTYxMl9WNA)

#### 图片附件管理插件

Custom Attachment Location：图像附件存储

> 功能：自定义图片存储位置
> 用途：整理附件文件夹，避免混乱

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215103569.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215104746.webp)

#### 公众号发布插件

NoteToMP：一键发布

> 功能：直接发送到公众号草稿箱
> 用途：内容创作与发布一体化

#### Claudian：AI 集成插件（重点）

**Claudian**：Claude Code 侧边栏集成

> 功能：把 Claude Code 整合到 Obsidian 侧边栏
> 用途：直接在 Obsidian 中对话，读取当前 Markdown

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215058651.webp)

**安装 Claudian 手动教程**

1. **下载文件**：
   - 前往 [Claudian Release 页面](https://github.com/YishenTu/claudian/releases/latest)
   - 下载三个文件：`main.js`、`manifest.json`、`styles.css`

2. **创建文件夹**：
   - 路径：`/path/to/vault/.obsidian/plugins/claudian/`
   - `.obsidian` 文件夹通常是隐藏的

3. **放入文件**：
   - 将下载的三个文件复制到 `claudian` 文件夹

4. **启用插件**：
   - 重启 Obsidian
   - 设置 → 第三方插件 → 找到 "Claudian" 并启用

## 三.配置 Claude Skills 系统

#### 3.1 创建 claude.json 配置文件

在 `.claude` 文件夹下创建 `claude.json`：

```json
{
  "skills": [
    "./skills/obsidian-skills/obsidian-markdown",
    "./skills/obsidian-skills/json-canvas",
    "./skills/obsidian-skills/obsidian-bases"
  ]
}
```

#### 3.2 下载Obsidian Skills 包

在 `.claude` 文件夹创建 `skills` 文件夹，然后下载：https://github.com/kepano/obsidian-skills

###### **技能应用场景展示**：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113212002494.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260113215435163.webp)

## 四、 obsidian Skills 使用指南

###### **A.基础用法**

**1️⃣obsidian-markdown**

创建符合 Obsidian 规范的 Markdown 文件

示例 1: 创建项目笔记

```Plain
创建一个名为"项目计划.md"的笔记，包含以下内容：
- Frontmatter 属性：项目状态为进行中，优先级为高
- 使用 callout 标注重要截止日期
- 创建任务清单，包含已完成和待办任务
- 添加项目架构的 Mermaid 流程图
- 链接到相关的"团队文档"笔记
```

示例 2: 创建学习笔记

```Plain
创建"JavaScript 学习笔记.md"，包含：
 - 使用 info callout 介绍学习目标
 - 代码高亮示例（JavaScript 和 Python）
 - 使用嵌套列表组织知识点
 - 添加数学公式示例
 - 创建折叠的 FAQ callout
```

**2️⃣json-canvas**

JSON Canvas 是一种开放格式，用于创建无限画布。AI 可以自动生成思维导图、流程图、项目看板等可视化内容。

示例 1: 创建思维导图

```Plain
 创建一个名为"产品开发思维导图.canvas"的文件，主题是"新功能开发"，包含：
 - 中心节点："新功能开发"（使用青色）
 - 分支节点：需求分析、设计、开发、测试、部署（5个分支）
 - 每个分支下添加 2-3 个子节点，包含具体任务
 - 使用箭头连接所有节点
 - 使用不同颜色区分不同阶段
```

示例 2: 创建项目看板

```Plain
创建"项目看板.canvas"，实现看板视图：
 - 创建 3 个分组：待办、进行中、已完成（使用红、黄、绿色）
 - 每个分组内添加 2-3 个任务卡片
 - 任务内容包含任务名和描述
 - 合理布局，确保美观
```

**示例 3: 创建流程图**

```Plain
创建"用户注册流程.canvas"：
- 节点：开始 → 输入信息 → 验证数据 → {数据有效?}
- 决策节点：Yes → 创建账户 → 发送邮件 → 结束
- 决策节点：No → 显示错误 → 返回输入
- 使用箭头和标签标注流程
- 决策节点使用黄色，开始/结束使用绿色
```

**示例 4: 创建研究资料画布**

```Plain
创建"AI研究.canvas"画布：
- 中心节点：AI 研究主题
- 周围节点链接到相关的笔记文件（使用 file 节点）
- 添加外部资源链接（使用 link 节点）
- 将相关内容用 group 节点分组
- 使用带标签的连线说明关系
```

**3️⃣obsidian-bases**

Obsidian Bases 是基于 YAML 的数据视图系统，可以将笔记转换为数据库表格、卡片视图等。AI 可以自动创建配置文件。

**示例 1: 任务管理系统**

```Markdown
创建"任务管理.base"，实现以下功能：
- 筛选所有包含 #task 标签的 Markdown 文件
- 创建公式字段：
  - days_until_due: 计算距离截止日期的天数
  - is_overdue: 判断是否过期
  - priority_label: 根据 priority 字段显示 🟥🟨🩩 图标
- 表格视图：显示任务名、状态、优先级、截止日期、距离天数
- 按状态分组排序
- 添加平均天数统计
```

**示例 2: 阅读清单**

```Plain
创建"阅读清单.base"：
- 筛选包含 #book 或 #article 标签的笔记
- 创建公式：
  - reading_time: 根据页数估算阅读时间（每页 2 分钟）
  - status_icon: 根据 status 显示 📖/✅/📚 图标
  - year_read: 提取完成日期的年份
- 卡片视图：显示封面、书名、作者、状态图标
- 表格视图：显示书名、作者、页数、预计时间、状态
- 排除已放弃的书籍
```

**示例 3: 项目进度追踪**

```Markdown
创建"项目追踪.base"：
- 筛选"Projects"文件夹下的所有 Markdown 文件
- 创建公式：
  - last_updated: 显示相对更新时间（如"3天前"）
  - link_count: 统计笔记中的链接数量
  - progress: 根据完成任务的百分比计算进度
- 表格视图：显示项目名、状态、更新时间、链接数、进度
- 按状态分组
- 添加进度条可视化（使用 icon 函数）
```

**示例 4: 每日笔记索引**

```Plain
创建"日记索引.base"：
- 筛选"Daily Notes"文件夹下文件名格式为 YYYY-MM-DD 的笔记
- 创建公式：
  - word_estimate: 估算字数（文件大小除以 5）
  - day_of_week: 提取星期几
  - has_images: 判断是否包含图片
- 表格视图：显示日期、星期、估算字数、图片数量
- 限制显示最近 30 天
- 按修改时间倒序排列
```

**示例 4: 附件**

```Plain
请根据附件内容生成一个 高颜值Obsidian Canvas，每个主题建立一个分组，设置颜色，注意，每个节点之前的距离不要太靠近，中文输出
```

###### B.高级技巧：组合使用多个 Skills

技巧 1: 生成项目看板

```Markdown
为我的项目创建完整的文档系统：
1. 创建"项目看板.canvas"可视化展示项目结构
2. 创建"任务管理.base"追踪所有任务
3. 创建"项目主页.md"作为索引，包含：
   - 项目概述（使用 callout）
   - 嵌入项目看板
   - 嵌入任务管理视图
   - Mermaid 架构图
   - 相关文档链接
```

技巧 2: 学习系统

```Markdown
创建"主题学习"系统：
1. 创建"知识地图.canvas"，用思维导图展示知识结构
2. 创建"学习资源.base"，管理所有学习资料（书籍、文章、视频）
3. 创建"学习笔记.md"模板，包含：
   - 学习目标（checklist）
   - 重要概念（callout 标注）
   - 代码示例
   - 笔记总结
```

##### 

**附：自定义命令配置**

项目命令：`项目根目录/.claude/commands/` 下，仅当前项目可用。

Slash Commands即自定义斜杠命令。

```Plain
环境准备
mkdir -p ~/.claude/commands     #创建命令目录（递归创建，不存在则自动生成）
touch ~/.claude/commands/search-web.md   # 创建命令文件（以search-web.md为例）
```

编写命令文件（Markdown 格式）

每个命令对应一个 `.md` 文件，包含元数据与执行逻辑（示例）

```YAML
---
# 元数据（YAML格式，必须放在开头）
description: "调用搜索工具查询指定关键词的网页信息" # 命令描述
argument-hint: "搜索关键词（如：Slash Commands 最佳实践）" # 参数提示
allowed-tools: ["Search"] # 允许调用的工具（如Search、Read、Edit）
---
# 命令执行逻辑（提示词模板，$ARGUMENTS为参数占位符）
请使用搜索工具查询以下关键词的最新信息，并整理成结构化摘要：
$ARGUMENTS
```

在 Claude Code 中输入 `/search-web Slash Commands 自定义方法`，自动替换 `$ARGUMENTS` 为传入参数。

## 五.其他推荐工具

### Chrome 插件剪藏工具

**Obsidian Web Clipper**：网页剪藏神器
```
功能：一键剪藏网页内容到 Obsidian
用途：收集资料、保存网页、整理收藏
下载地址：https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf
```

### 字体推荐

**中文推荐**：TsangerJinKai02（闪客金楷）
```
特色：优雅的中文显示
用途：提升阅读体验
下载：https://github.com/tw93/MiaoYan-NetNewsWire-Theme/blob/main/TsangerJinKai02-W04.ttf
```

**英文代码推荐**：JetBrains Mono

```
特色：专业的代码显示
用途：编程、技术文档
下载：https://www.jetbrains.com/lp/mono/
```

## 六、验证配置

安装完成后，打开 Claudian 插件对话界面，发送测试命令：

```
请列出你检测到的本地 skills（json-canvas / obsidian-markdown / obsidian-bases），并在常用工具创建一个测试笔记赵国强.md 包含 [[链接]]、#tag、- [ ] todo。
```

如果返回正确的技能列表并创建了文件，说明配置成功！



以上.今天的分享就到这里。Obsidian + AI 的组合，确实让知识管理效率**爆表**！



如果内容对你有所帮助，欢迎一键三连（点赞、在看、转发）。如果你有其他软件需求，也欢迎评论区留言，我们下次再见。



