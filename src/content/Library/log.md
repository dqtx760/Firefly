# Library操作日志

> 只追加写入（Append-only）。格式：`## [YYYY-MM-DD] <动作> | <描述>`
> 动作类型：ingest / query / lint / sync

---

<!-- 日志从这里开始 -->

## [2026-05-27] ingest | 首次试编译 3 篇 AI 知识管理相关素材
- **处理文件**:
  - `01-输入/01-Clipings/把 Claude Code 搬进了浏览器.md`
  - `01-输入/02-get笔记/notes/2026-05-07/memo@卡帕西AI知识管理框架lolm wiki解读：Obsidian搭建实例+三个实用使用建议_37.md`
  - `01-输入/02-get笔记/notes/2026-04-18/memo@个人本地知识库与大模型结合的实践应用：效率提升与自我管理新范式_107.md`
- **创建页面**:
  - Sources: [[摘要-the-vibe-companion]], [[摘要-karpathy-lolm-wiki]], [[摘要-本地知识库大模型实践]]
  - Entities: [[The_Vibe_Companion]], [[Karpathy]]
  - Concepts: [[AI_Knowledge_Management]], [[Lolm_Wiki_Framework]], [[Local_Knowledge_Base_LLM]]
- **冲突**: 无
- **备注**: 首次编译，Library 从零开始建立，3 篇素材围绕 AI+知识管理主题，形成自然关联网络

## [2026-05-27] ingest | 编译微信读书笔记《拆解一切问题》
- **处理文件**:
  - `01-输入/06-微信读书/个人成长/拆解一切问题.md`
- **创建页面**:
  - Sources: [[摘要-拆解一切问题]]
  - Entities: [[拆解一切问题]]
  - Concepts: [[拆解问题方法论]], [[五种拆解思维]]
- **冲突**: 无
- **备注**: 首次编译微信读书目录，书籍为问题解决方法论类，提取核心框架与五种思维工具

## [2026-05-27] ingest | 编译 04-选题 目录素材（2 篇有效，1 篇空文件跳过）
- **处理文件**:
  - `01-输入/04-选题/谷歌账号注册保姆级教程.md`
  - `01-输入/04-选题/苹果美区ID注册教程.md`（空文件，跳过）
  - `01-输入/04-选题/get-to-obsidian.md`
- **创建页面**:
  - Sources: [[摘要-谷歌账号注册保姆级教程]], [[摘要-Get笔记同步到Obsidian]]
  - Entities: [[谷歌]], [[Get笔记]], [[get-to-obsidian]], [[Obsidian]]
  - Concepts: [[谷歌账号注册]], [[知识同步工作流]]
- **冲突**: 无（均为新建页面）
- **备注**: 苹果美区ID注册教程文件为空，需后续补充内容再编译

## [2026-05-27] ingest | 编译 01-Clipings 目录素材（6 篇）
- **处理文件**:
  - `01-输入/01-Clipings/Windows 无法安装 Codex App？我解决这三个问题才搞定。.md`
  - `01-输入/01-Clipings/2026年登陆注册Codex如何解决手机号码登陆验证的问题？（附最新图文教程解决办法）.md`
  - `01-输入/01-Clipings/gcli，一个 Gmail 只读 CLI.md`
  - `01-输入/01-Clipings/Post by @geekbb on X.md`
  - `01-输入/01-Clipings/数字月牙湖，给老家做了个网站.md`
  - `01-输入/01-Clipings/在微信里使用 Claude Code，刚刚在 GitHub 上开源了这个 Skill 。.md`
- **创建页面**:
  - Sources: [[摘要-Windows安装Codex App问题解决]], [[摘要-Codex手机号验证问题解决]], [[摘要-gcli-Gmail只读CLI]], [[摘要-markamd-Markdown编辑器]], [[摘要-数字月牙湖网站]], [[摘要-微信使用Claude Code]]
  - Entities: [[Codex_App]], [[gcli]], [[markamd]], [[数字月牙湖]], [[wechat-claude-code]], [[Superpowers]], [[ClawBot]]
  - Concepts: [[Windows服务修复]], [[接码平台]], [[AI_Agent邮件处理]], [[数字乡村]], [[微信Bot协议]], [[并行Agent开发]]
- **冲突**: 无（均为新建页面）
- **备注**: 涵盖 Windows 故障排除、AI 工具介绍、数字乡村实践、微信 Agent 集成等多个主题

## [2026-05-27] ingest | 编译 03-微信 目录素材（7 篇有效，1 篇消息跳过，1 篇已存在增量合并）
- **处理文件**:
  - `01-输入/03-微信/3.9元无限Token，Codex、Claude Code、龙虾都能用.md`
  - `01-输入/03-微信/剪辑 Agent 字幕升级：99% 正确率的字幕，一条指令直接推进剪映.md`
  - `01-输入/03-微信/发现了 4 个好玩 SKills，已经在 GitHub 上开源了。.md`
  - `01-输入/03-微信/国产模型API接到Codex之后，还能跑通这10个核心玩法.md`
  - `01-输入/03-微信/数字月牙湖，给老家做了个网站.md`（已存在源摘要，增量合并 sources 字段）
  - `01-输入/03-微信/最值得推荐的20个宝藏Skills，小众但真香.md`
  - `01-输入/03-微信/用 Cursor 搞了个AI字幕校对的工具，处理剪映字幕识别不准确的问题.md`
  - `01-输入/03-微信/消息_2026-05-26.md`（系统同步消息，跳过）
  - `01-输入/03-微信/效率狂飙！我珍藏的10个苹果神级快捷指令.md`（纯工具推荐，低知识密度，跳过）
- **创建页面**:
  - Sources (6): [[摘要-讯飞星辰Astron-Coding-Plan体验]], [[摘要-剪辑Agent字幕升级]], [[摘要-四个好玩的开源Skills]], [[摘要-国产模型API接Codex核心玩法]], [[摘要-20个宝藏Skills推荐]], [[摘要-AI字幕校对工具]]
  - Sources 更新 (1): [[摘要-数字月牙湖网站]]（补充 03-微信 来源路径）
  - Entities (14): [[Astron-Coding-Plan]], [[CC-Switch]], [[Step-Plan]], [[videocut-skills]], [[Humanizer-zh]], [[add-skill]], [[ljg-skills]], [[huashu-skills]], [[khazix-writer]], [[guizang-ppt-skill]], [[obsidian-skills]], [[soul.skill]], [[impeccable]], [[tacit-mining]]
  - Concepts (5): [[Tokenmaxxing]], [[Coding-Plan-选型方法论]], [[AI字幕校对]], [[Claude-Code-Skills生态]], [[隐性知识挖掘]]
- **冲突**: 无
- **备注**: 本批素材主题集中在 AI Coding Plan（讯飞/阶跃）、Claude Code Skills 生态、字幕自动化三大方向。苹果快捷指令文章为纯工具合集，知识密度低，跳过不编译

## [2026-05-27] ingest | 批量编译 02-get笔记 目录（90+ 文件，筛选 30 篇高质量内容）
- **处理文件**: `01-输入/02-get笔记/notes/` 下 30 篇高质量笔记
- **跳过内容**: 游戏卡法教学、语音包介绍、食物菜谱、彩票模拟器、个人琐碎记录等非知识性内容
- **创建 Sources（16 页）**:
  - [[摘要-NotebookLM高阶玩法与进化]]（4 篇合并）
  - [[摘要-Cloud-Code深度应用]]（2 篇合并）
  - [[摘要-Obsidian加AI自动化内容创作]]
  - [[摘要-Gemini-CLI应用指南]]
  - [[摘要-Codex-Strong浏览器自动化]]
  - [[摘要-碎片知识系统化方法论]]（2 篇合并）
  - [[摘要-自媒体内容创作突破]]
  - [[摘要-普通人AI实战指南]]
  - [[摘要-飞书MCP配置指南]]
  - [[摘要-New-Type-OS系统]]
  - [[摘要-Nano-Banana图像编辑]]（3 篇合并）
  - [[摘要-高转化率获客策略]]
  - [[摘要-传播点与AI文案创作]]（2 篇合并）
  - [[摘要-AI伦理与家庭冲突]]
  - [[摘要-AI视频创作工作流]]
  - [[摘要-开源AI工具集]]（3 篇合并）
- **创建 Entities（6 页）**:
  - [[NotebookLM]], [[Claude_Code]], [[ANTIGRAVITY]]
  - [[AI编程工具合集]]（Gemini CLI / Codex Strong / New Type OS）
  - [[AI图像编辑工具]]（Nano Banana / 千万模型）
  - [[开源AI工具集]]（FireCrawl / OCRmyPDF / Index TTS2）
  - [[飞书MCP]]
- **创建 Concepts（9 页）**:
  - [[MCP协议]], [[碎片知识系统化]], [[AI内容创作工作流]]
  - [[智能躯干与超级大脑协同系统]], [[树形结构内容创作法]]
  - [[获客沉没成本策略]], [[AI实战方法论]]
  - [[传播点与爆款创作]], [[AI文案创作框架]]
- **更新页面**: [[Karpathy]]（新增关联连接）, [[AI_Knowledge_Management]]（新增关联连接）
- **冲突**: 无
- **备注**: 同一主题多篇笔记合并为一个来源摘要（NotebookLM 4 篇、Cloud Code 2 篇、Nano Banana 3 篇、碎片知识 2 篇、传播点+文案 2 篇、开源工具 3 篇），避免过度碎片化

## [2026-05-27] ingest | 并行编译汇总（首次全流程测试）

- **执行方式**: 7 个 Agent 并行，`run_in_background: false`
- **并行代理**: 7 个，其中 6 个有文件，1 个为空（05-口喷稿）
- **总处理文件**: 约 50 篇有效内容（02-get笔记 筛选 30 篇，其余目录约 20 篇）
- **跳过文件**: 约 60 篇（纯个人琐碎、空文件、系统消息）
- **新建页面**: Sources 32 + Entities 33 + Concepts 24 = **89 页**
- **更新页面**: 4 页（Karpathy、AI_Knowledge_Management、摘要-数字月牙湖网站、get-to-obsidian）
- **冲突**: 无
- **去重**: Agent-04 与 Agent-07 均处理了 `get-to-obsidian.md`（同一文件在两个目录），实体页面已存在，Agent-07 做了增量合并
- **index.md**: 已汇总全部新页面到对应分类下
- **归档**: 待执行

## [2026-05-28] ingest | 单文件编译 Craft Agent 素材
- **处理文件**:
  - `01-输入/01-Clipings/面向普通人的AI工作工具Craft Agent使用演示与推荐 - 得到大脑.md`
- **创建页面**:
  - Sources: [[摘要-Craft-Agent使用演示]]
  - Entities: [[Craft Agent]]
  - Concepts: [[普通人AI工具选型]]
- **冲突**: 无
- **备注**: 得到大脑视频笔记，介绍免费开源 AI 工作工具 Craft Agent，提取产品实体、来源摘要和普通人工具选型方法论

## [2026-05-28] query | 查找花叔 skill GitHub 链接
- **检索页面**: [[huashu-skills]]
- **输出**: 直接回答，GitHub 为 github.com/alchaincyf/huashu-skills

## [2026-05-28] query | 了解 Craft Agent
- **检索页面**: [[Craft Agent]], [[摘要-Craft-Agent使用演示]], [[普通人AI工具选型]]
- **输出**: 直接回答，综合产品介绍、功能对比、使用场景

## [2026-05-29] ingest | 并行编译 2 篇有效内容（3 篇跳过）
- **处理文件**:
  - `01-输入/01-Clipings/Claude Code 为什么放弃 RAG 用 Grep 搜索代码？大型代码库最佳实践全解析.md`
  - `01-输入/03-微信/GitHub - op7418-guizang-social-card-skill- 🪧 Claude Code - Codex skill — generate Xiaohongshu car....md`
- **跳过文件**:
  - `01-输入/03-微信/效率狂飙！我珍藏的10个苹果神级快捷指令.md`（纯工具合集，低知识密度）
  - `01-输入/03-微信/消息_2026-05-26.md`（系统同步消息，无知识内容）
  - `01-输入/07-Daily/2026-05-28.md`（空模板，无实际内容）
- **创建页面**:
  - Sources (2): [[摘要-ClaudeCode-GrepOverRAG最佳实践]], [[摘要-归藏社交卡片Skill]]
  - Entities (1): [[guizang-social-card-skill]]
  - Concepts (3): [[GrepOverRAG设计哲学]], [[ContextWindow管理]], [[ClaudeCode最佳实践]]
- **更新页面**:
  - [[Claude_Code]]（新增关联：GrepOverRAG设计哲学、ContextWindow管理、ClaudeCode最佳实践）
  - [[guizang-ppt-skill]]（新增关联：guizang-social-card-skill 姊妹项目）
  - [[Claude-Code-Skills生态]]（新增关联：guizang-social-card-skill）
- **冲突**: 无
- **归档**: 已完成（2 篇编译文件移入 01-输入/archive/）
