# Derek Zhao Blog

> [!NOTE]
> 这是一个基于 [Fuwari](https://github.com/saicaca/fuwari) 深度二次开发的个人博客项目，集成了 Typora + PicList + GitHub Desktop 工作流，专为技术博客打造。

一个基于 Astro 5.7+ 构建的现代化个人博客主题，专注于技术分享与实践。

## ✨ 特性

- 🚀 基于 Astro 5.7+ 构建，性能卓越
- 📱 完全响应式设计，支持移动端
- 🌙 支持深色/浅色主题切换
- 📝 支持 Markdown 格式
- 🔍 内置搜索功能
- 📊 文章阅读时间统计
- 🏷️ 标签和分类系统（软件安利/技术教程/AI新鲜玩法）
- 📈 SEO 优化
- 🎨 可自定义配置
- 💬 Giscus 评论系统集成
- 📡 RSS 订阅支持
- 🎥 视频装饰组件
- 🔄 Typora + PicList + GitHub Desktop 工作流

## 🛠️ 技术栈

- **框架**: Astro 5.7.9
- **样式**: Tailwind CSS
- **交互**: Svelte 5
- **构建工具**: Vite
- **包管理**: pnpm / npm

## 📁 项目结构

```
├── public/                 # 静态资源
│   ├── avatar.jpg         # 头像
│   ├── icons/             # 图标
│   └── sponsors/          # 赞助收款码
├── src/
│   ├── components/         # 组件
│   │   ├── widget/        # 侧边栏组件
│   │   │   ├── Profile.astro       # 个人信息卡片
│   │   │   ├── CategoryList.astro  # 分类列表
│   │   │   └── VideoDecoration.astro # 视频装饰
│   │   ├── PostCard.astro  # 文章卡片
│   │   └── PostPage.astro  # 文章列表（含自动封面提取）
│   ├── content/           # 内容
│   │   ├── posts/         # 博客文章（30篇）
│   │   └── config.ts      # 内容集合配置
│   ├── layouts/           # 布局
│   │   ├── Layout.astro   # 主布局（含微信弹窗）
│   │   └── MainGridLayout.astro
│   ├── pages/             # 页面
│   │   ├── categories/[category].astro # 分类页
│   │   ├── posts/[...slug].astro      # 文章详情
│   │   └── sponsors.astro            # 赞助页
│   ├── styles/            # 样式
│   ├── utils/             # 工具函数
│   └── config.ts          # 站点配置
├── scripts/               # 脚本工具
│   ├── add-frontmatter.cjs # 自动添加 frontmatter 模板
│   ├── clean-unused-images.js # 清理未使用的图片
│   ├── del-space.js      # 删除空格
│   └── new-post.js       # 创建新文章
└── package.json
```

## 🚀 本地开发

### 环境要求

- Node.js 18+
- pnpm 或 npm

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

访问 http://localhost:4321/ 查看效果

> **注意**: 开发服务器端口已固定为 4321（配置在 `astro.config.mjs` 中），无需担心端口变化。

### 构建生产版本

```bash
# pnpm
pnpm build

# npm
npm run build
```

构建产物位于 `dist/` 目录

### 其他命令

```bash
# 创建新文章
npm run new-post <文章名称>

# 预览构建结果
npm run preview
```

## 📦 部署指南

### EdgeOne（腾讯云）

1. **连接仓库**
   - 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
   - 创建静态网站，连接 GitHub 仓库
   - 选择分支：`main`

2. **构建配置**
   ```
   框架预设: Astro
   根目录: ./
   输出目录: dist
   编译命令: pnpm run build
   安装命令: pnpm install
   ```

3. **部署**
   - 点击"开始部署"
   - 等待构建完成
   - 配置自定义域名（可选）

### Vercel

1. **导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库

2. **构建配置**
   ```json
   {
     "buildCommand": "pnpm run build",
     "outputDirectory": "dist",
     "devCommand": "pnpm dev"
   }
   ```

3. **环境变量**（可选）
   - 无需额外配置

### Netlify

1. **添加站点**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"

2. **构建配置**
   ```
   Build command: pnpm run build
   Publish directory: dist
   ```

3. **部署**
   - 点击 "Deploy site"

### Cloudflare Pages

1. **创建项目**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 进入 "Workers & Pages" → "Create application" → "Pages" → "Connect to Git"

2. **构建设置**
   ```
   构建命令: pnpm run build
   构建输出目录: dist
   ```

3. **环境变量**
   ```bash
   NODE_VERSION=18
   ```

## 📝 使用指南：Typora + PicList + GitHub Desktop 工作流

### 工作流概述

```
Typora（写作） → PicList（上传图片） → GitHub Desktop（提交部署） → 自动发布
```

### 详细步骤

#### 1. 安装必备工具

- **Typora**: https://typora.io/ （Markdown 编辑器）
- **PicList**: https://github.com/Kuingsmile/PicList （图床工具）
- **GitHub Desktop**: https://desktop.github.com/ （Git 客户端）

#### 2. 配置 PicList 图床

1. 打开 PicList，配置图床（支持对象存储服务）
2. 配置上传后自动复制 Markdown 格式链接
3. 设置图片 URL 格式为完整 URL

#### 3. 在 Typora 中写作

1. 创建新 Markdown 文件
2. 添加文章 frontmatter：

```markdown
---
title: 文章标题
published: 2026-02-04
description: 文章摘要（可选，第一段自动提取）
tags: [标签1, 标签2]
category: 软件安利
draft: false
---
```

3. 插入图片时直接使用 PicList 上传（快捷键上传）
4. 图片会自动上传到图床，Markdown 中插入的是图床 URL

#### 4. 放置文章

将写好的 `.md` 文件放入项目的 `src/content/posts/` 目录

#### 5. 使用 GitHub Desktop 提交

1. 打开 GitHub Desktop
2. 查看文件变更
3. 填写提交信息
4. 点击 "Push" 推送到 GitHub

#### 6. 自动部署

- EdgeOne/Vercel/Netlify 会自动检测到推送
- 触发自动构建
- 构建完成后自动发布

### 文章 Frontmatter 模板

```yaml
---
title: 文章标题
published: 2026-02-04
description: 文章描述（留空则自动提取第一段）
tags: [标签1, 标签2]
category: 软件安利  # 可选：软件安利/技术教程/AI新鲜玩法
draft: false
image: https://图片URL（可选，留空则自动提取第一张）
---

第一段文字会自动成为文章摘要...

文章正文...
```

### 分类说明

| 分类 | 说明 | 示例 |
|------|------|------|
| 软件安利 | 软件推荐、工具介绍 | Typora、PicList、快捷键 |
| 技术教程 | 技术教程、部署指南 | AList部署、内网穿透 |
| AI新鲜玩法 | AI 相关内容 | Claude、ChatGPT、提示词 |

### ⚠️ Frontmatter 注意事项

#### 1. 冒号后必须有空格（YAML 语法要求）

**错误写法：**
```yaml
title:文章标题
published:2026-02-04
category:软件安利
```

**正确写法：**
```yaml
title: 文章标题
published: 2026-02-04
category: 软件安利
```

#### 2. 日期格式必须使用连字符

**错误格式：** `published: 2026/02/04`（会被当作字符串，导致构建失败）

**正确格式：** `published: 2026-02-04`（ISO 格式）

#### 3. 标签必须使用数组格式

**错误写法：** `tags: 标签1, 标签2`

**正确写法：** `tags: [标签1, 标签2]`

### 🖥️ 使用 .bat 脚本简化工作流

创建桌面快捷脚本 `启动博客并添加模板.bat`：

```batch
@echo off
chcp 65001 >nul
cd /d D:\project2026\fuwari

echo ========================================
echo    1. 检查开发服务器...
echo ========================================

:: 检查端口4321是否被占用
netstat -ano | findstr ":4321" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 开发服务器已在运行
) else (
    echo ✗ 开发服务器未运行，正在启动...
    start /B npm run dev >nul 2>&1
    echo   等待服务器启动...
    timeout /t 5 /nobreak >nul
    echo ✓ 开发服务器已启动
)

echo.
echo ========================================
echo    2. 为文章添加 Frontmatter 模板...
echo ========================================

node scripts/add-frontmatter.cjs

echo.
echo ========================================
echo    3. 打开网站...
echo ========================================

start http://localhost:4321/

echo.
echo ✓ 所有任务完成！
pause
```

**使用方法：**
1. 在 Typora 写完文章后，保存到 `src/content/posts/` 目录
2. 双击运行桌面上的 `启动博客并添加模板.bat`
3. 脚本会自动：
   - 启动开发服务器（如果未运行）
   - 为没有 frontmatter 的文章添加模板
   - 打开浏览器预览

**添加 Frontmatter 模板脚本：**

也可以单独运行：
```bash
npm run add-frontmatter
```

## 🎨 自定义配置

### 站点配置

编辑 `src/config.ts` 文件：

```typescript
// 博客标题
export const siteConfig: SiteConfig = {
  title: "Derek Zhao Blog",
  subtitle: "Derek Zhao",
  // ...
};

// 个人信息
export const profileConfig: ProfileConfig = {
  name: "大强同学",
  bio: "人间忽晚，山河已秋。",
  avatar: "/avatar.jpg",
  // 社交链接...
};

// 导航栏
export const navBarConfig: NavBarConfig = {
  links: [
    { name: "电视喵", url: "https://tv.dqtx.cc/" },
    // ...
  ],
};
```

### 主题颜色

```typescript
themeColor: {
  hue: 250,        // 主色调 (0-360)
  fixed: false,    // 是否固定颜色
}
```

### Giscus 评论配置

编辑 `src/pages/posts/[...slug].astro` 中的 Giscus 配置：

```astro
<div id="giscus-container"
    data-repo="你的用户名/仓库名"
    data-repo-id="R_kgDOxxxxxxxxx"
    data-category="Announcements"
    data-category-id="DIC_kwDOxxxxxxxxx"
    data-mapping="pathname"
    data-lang="zh-CN"
    // ...
></div>
```

## 🤝 鸣谢

- **Fuwari 原项目**: [https://github.com/saicaca/fuwari](https://github.com/saicaca/fuwari)
- **AcoFork 的 Fork**: [https://github.com/afoim/fuwari](https://github.com/afoim/fuwari)

感谢原作者和贡献者的优秀工作！

## 📄 许可证

[MIT License](LICENSE)

---

**博客地址**: [https://blog.acofork.com](https://blog.acofork.com)
