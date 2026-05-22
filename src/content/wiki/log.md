# Wiki Operation Log

## 2026-05-01

- **23:30** — 初始生成 Wiki 结构
  - 扫描 posts/ 目录，识别 6 个分类、105 篇文章
  - 生成 KNOWLEDGE.md 根索引
  - 创建 .newtype/wiki/ 完整结构
  - 写入 meta.json 初始快照

## 2026-05-23

- **00:00** — 更新 Wiki 统计与分类索引
  - 重新扫描 posts/ 目录，识别 4 个分类、121 篇已发布文章
  - 更新 sources/ 下 AIHacks、Software、Technical、Workflow 分类页
  - 更新 overview、index、schema、purpose、目录、meta 和 content-matrix
  - 保持博客文章链接使用 ../../content/posts/...md 格式，确保网页渲染后正常跳转
- **01:00** — 修复 wiki 博客链接跳转问题（broken=181→0）
  - 将 post.slug / entry.slug 全局替换为 post.id / entry.id（Astro 5 Content Layer 兼容）
  - 重写 wiki.ts 的链接转换逻辑，改为按真实 post id 规则映射，不再用原始文件名硬拼 URL
  - 删除 sources/xenia.md、sources/zen.md（Xenia/Zen 非 posts 目录，不属于博客编译范围）
  - 删除 entities/obsidian-workflow.md、concepts/dataview-templates.md、synthesis/dependencies.md
  - 更新 index、目录、purpose 中指向已删除页面的入口引用
