# QWEN.md - 项目指令集

## 项目概述

基于 **Astro 5.7+** 深度二次开发的**个人技术博客**，集成 Typora + PicList + GitHub Desktop + Gitee 图床工作流，专为技术博客打造。

- **博客地址**: https://dqtx.cc
- **GitHub**: https://github.com/dqtx760/Firefly
- **技术栈**: Astro 5.7.9 + Tailwind CSS 3.4+ + Svelte 5.28+ + Vite + pnpm 9.14+

---

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发服务器 (端口固定 4321)
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 创建新文章
pnpm new-post

# 添加 frontmatter 模板
pnpm add-frontmatter

# 按分类组织文章
pnpm organize-posts

# 清理未使用的图片
pnpm clean

# 删除文件名空格
pnpm del-space

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

---

## 项目结构

```
fuwari/
├── src/
│   ├── components/          # 组件 (Astro/Svelte)
│   ├── content/posts/       # 博客文章 (*.md)
│   │   ├── 软件安利/        # 分类目录
│   │   ├── 技术教程/
│   │   └── AI新鲜玩法/
│   ├── data/friends/        # 友链数据
│   ├── layouts/             # 布局文件
│   ├── pages/               # 页面路由
│   ├── styles/              # CSS 样式
│   ├── utils/               # 工具函数
│   ├── plugins/             # 自定义插件
│   └── config.ts            # 站点配置
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
└── astro.config.mjs         # Astro 配置
```

---

## 站点配置

编辑 `src/config.ts`:

- **siteConfig**: 站点标题、副标题、描述、主题色 (hue: 250 纯蓝色系)
- **navBarConfig**: 导航栏链接
- **profileConfig**: 头像、名称、简介、社交链接
- **umamiConfig**: Umami 分析配置

---

## 文章规范

### Frontmatter 必填字段

```yaml
---
title: 文章标题
published: 2026-02-04  # ISO 格式 (必须用连字符)
category: 软件安利     # 软件安利 | 技术教程 | AI新鲜玩法
draft: false          # 必须小写
---
```

### 注意事项

- YAML 冒号后必须加空格: `title: 文章`
- 日期格式: `2026-02-04` (不是 `2026/02/04`)
- 标签格式: `tags: [标签1, 标签2]`

---

## 分类说明

| 分类 | URL 路径 |
|------|----------|
| 软件安利 | /categories/Software/ |
| 技术教程 | /categories/Technical/ |
| AI新鲜玩法 | /categories/AIHacks/ |

---

## 自定义特性

- **冷紫蓝渐变主题** (hue: 250)
- **霞鹜文楷字体** (LXGW WenKai)
- **Giscus 评论** (GitHub Discussions)
- **Swup 页面切换动画**
- **Expressive Code** 代码高亮
- **Katex 数学公式支持**
- **自定义 rehype 组件**: note, tip, important, caution, warning, github, url

---

## 开发约定

1. 使用 **pnpm** 作为包管理器
2. 代码格式化: `pnpm format` (Biome)
3. 代码检查: `pnpm lint` (Biome)
4. 开发服务器端口固定为 **4321**
5. 静态资源放 `public/` 目录
6. 文章图片放 `src/content/assets/images/`

---

## 部署

推荐部署到 **EdgeOne（腾讯云）**：

```
框架预设: Astro
根目录: ./
输出目录: dist
编译命令: pnpm run build
安装命令: pnpm install
```