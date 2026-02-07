---
title: GitHub + EdgeOne 搭建个人博客的过程
published: 2026-02-06
tags: [博客, Astro, EdgeOne, GitHub, 部署]
category: Technical
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260206033446484.webp
---

> 想要一个属于自己的博客，但不知道从哪里开始？本文详细记录了从零开始搭建个人博客的全过程，包括踩过的各种坑和解决方案。

## 为什么选择 Fuwari 主题？

在决定搭建博客之前，我对比了多个静态博客生成器：

| 工具 | 优点 | 缺点 |
|------|------|------|
| Hexo | 插件丰富、中文文档多 | 生成速度慢、配置复杂 |
| Hugo | 构建极快 | 学习曲线陡峭 |
| VuePress | Vue 生态友好 | 主要用于文档 |
| **Astro** | **性能卓越、配置简单** | **相对较新** |

最终选择了基于 **Astro 5.7+** 的 **Fuwari** 主题，原因很简单：
- 零配置即可使用
- 完美适配移动端
- 内置深色模式
- 性能评分接近满分

## 一、前期准备

### 1.1 所需账号

在开始之前，你需要准备：

| 服务 | 用途 | 是否必需 |
|------|------|----------|
| GitHub 账号 | 代码托管 | 必需 |
| EdgeOne 账号 | 静态网站部署 | 必需 |
| Gitee 账号 | 图床（可选） | 可选 |

### 1.2 环境要求

```bash
# 检查 Node.js 版本（需要 18.0+）
node -v

# 推荐：使用 pnpm 作为包管理器
npm install -g pnpm
```

## 二、克隆与配置

### 2.1 克隆项目

```bash
# 克隆 Fuwari 项目
git clone https://github.com/saicaca/fuwari.git my-blog
cd my-blog

# 安装依赖
pnpm install
```

### 2.2 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:4321/ 即可看到效果。

### 2.3 基本配置

编辑 `src/config.ts` 文件：

```typescript
// 站点基本信息
export const siteConfig: SiteConfig = {
  title: "你的博客标题",
  subtitle: "副标题描述",
  lang: "zh_CN",
  url: "https://your-domain.com",
  author: "你的名字",
};

// 个人信息卡片
export const profileConfig: ProfileConfig = {
  name: "你的名字",
  bio: "个性签名",
  avatar: "/avatar.jpg",  // 头像放在 public/ 目录
  email: "your-email@example.com",
  socialLinks: {
    github: "https://github.com/your-username",
    // 添加更多社交链接...
  },
};
```

## 三、部署到 EdgeOne

### 3.1 为什么选择 EdgeOne？

对比了多个部署平台：

| 平台 | 优点 | 缺点 | 选择 |
|------|------|------|------|
| Vercel | 体验好、速度快 | 国内访问慢 | ❌ |
| Netlify | 功能强大 | 国内访问慢 | ❌ |
| **EdgeOne** | **国内访问快、免费额度充足** | **需要备案域名** | ✅ |

### 3.2 部署步骤

#### 步骤 1：创建 GitHub 仓库

```bash
# 初始化 git 仓库
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

#### 步骤 2：EdgeOne 配置

1. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
2. 选择「静态网站」→「新建站点」
3. 连接 GitHub 仓库，选择分支：`main`

#### 步骤 3：构建设置

```
框架预设: Astro
根目录: ./
输出目录: dist
编译命令: pnpm run build
安装命令: pnpm install
```

#### 步骤 4：开始部署

点击「开始部署」，等待 1-2 分钟即可完成。

## 四、踩过的坑（重点！）

### 坑 1：YAML Frontmatter 格式错误

**现象**：文章发布后只显示标题，没有封面、摘要、正文。

**原因**：YAML 格式极其严格，任何一个空格错误都会导致解析失败。

#### ❌ 错误写法

```yaml
---
title:文章标题
published:2026/02/04
category:软件安利
tags: 标签1, 标签2
draft: True
---
```

#### ✅ 正确写法

```yaml
---
title: 文章标题           # 冒号后必须有空格
published: 2026-02-04     # 日期必须用连字符
category: 技术教程         # 冒号后必须有空格
tags: [标签1, 标签2]      # 必须用数组格式
draft: true               # 布尔值必须小写
---
```

**YAML 四大黄金规则**：

1. **冒号后必须有空格**
   ```yaml
   title: 文章标题  # ✅ 正确
   title:文章标题   # ❌ 错误
   ```

2. **日期必须用连字符**
   ```yaml
   published: 2026-02-04  # ✅ 正确
   published: 2026/02/04  # ❌ 错误
   ```

3. **标签必须用数组格式**
   ```yaml
   tags: [Astro, 教程, 前端]  # ✅ 正确
   tags: Astro, 教程, 前端     # ❌ 错误
   ```

4. **布尔值必须小写**
   ```yaml
   draft: true   # ✅ 正确
   draft: True   # ❌ 错误
   draft: TRUE   # ❌ 错误
   ```

### 坑 2：导航栏抖动问题

**现象**：点击「归档」「友链」等页面时，顶部导航栏会抖动一下。

**原因**：页面切换时 `page-height-extend` 元素的显示/隐藏导致高度变化。

**解决方案**：

1. 移除 `top-row` 的 `transition-all` 过渡动画
2. 在 Swup 钩子中禁用 `onload-animation`
3. 完全移除 `page-height-extend` 逻辑

修改 `src/layouts/Layout.astro`：

```javascript
window.swup.hooks.on('visit:start', (visit) => {
  // 禁用导航时的动画，防止抖动
  const animatedElements = document.querySelectorAll('.onload-animation');
  animatedElements.forEach(el => {
    el.style.opacity = '1';
    el.style.animation = 'none';
  });
});
```

### 坑 3：深色模式颜色不和谐

**现象**：深色模式下，某些元素的颜色显得突兀。

**原因**：使用了固定的颜色值（如 `#A8C398`），没有跟随主题色。

**解决方案**：将所有固定颜色改为使用 CSS 变量 `var(--primary)`

```css
/* ❌ 错误：固定颜色 */
color: #A8C398;

/* ✅ 正确：主题色变量 */
color: var(--primary);
```

深色模式下使用 oklch 色空间的半透明颜色：

```css
.dark .decoration-line {
  border-color: oklch(0.35 0.02 var(--hue));
}
```

### 坑 4：图片加载延迟

**现象**：打开网站时，左侧二维码和封面图片有明显延迟。

**原因**：默认使用了 `loading="lazy"` 延迟加载。

**解决方案**：

1. 关键图片移除 `loading="lazy"`
2. 添加 `loading="eager"` 和 `fetchpriority="high"`
3. 外部图片下载到本地托管

修改 `src/components/misc/ImageWrapper.astro`：

```astro
<img
  src={src}
  alt={alt}
  loading="eager"
  fetchpriority="high"
/>
```

### 坑 5：分类对齐问题

**现象**：文章分类的名称和数字对齐不统一。

**尝试的方案**：
1. 使用固定宽度 `width: 80px` → 数字多的时候溢出
2. 使用 `text-align: left` → 不美观
3. 使用 `justify-content: center` → 数字没有靠右

**最终方案**：

```css
.category-name {
  flex: 1;           /* 占据剩余空间 */
  text-align: center; /* 名称居中 */
}

.category-count {
  /* 数字自然靠右 */
}
```

使用 `flex: 1` 让名称占据剩余空间并居中，数字徽章自然靠右。

### 坑 6：文章导入时图片 URL 错误

**现象**：批量导入文章后，有些封面图显示无效。

**原因**：正则表达式匹配到了错误的图片 URL，例如：

```
image: generate:  # ❌ 这不是有效 URL
```

实际内容是 `![image: generate:](https://...)`

**解决方案**：添加 URL 验证

```javascript
// 只接受有效的 URL 格式
if (url.match(/^https?:\/\//) || url.match(/^\//)) {
  coverImage = url;
}
```

### 坑 7：EdgeOne 构建时 import.meta.glob 不工作

**现象**：本地开发正常，但 EdgeOne 构建后数据不显示。

**原因**：`import.meta.glob` 在 EdgeOne 构建环境下无法正确加载 JSON 文件。

**错误代码**：

```astro
---
// ❌ 在 EdgeOne 构建时不工作
const sponsorFiles = import.meta.glob('../../data/sponsors/*.json', { eager: true });
const sponsors = Object.values(sponsorFiles).map(m => m.default);
---
```

**解决方案**：将数据直接内联到文件中

```astro
---
// ✅ 直接内联数据
const sponsors = [
  { "name": "赞助者1", "avatar": "https://...", "date": "2026-01-01" },
  { "name": "赞助者2", "avatar": "https://...", "date": "2026-01-02" },
  // ...更多数据
];
---
```

**经验教训**：在 EdgeOne 等云端构建环境中，尽量避免使用动态导入，对于静态数据直接内联更可靠。

## 五、特色功能实现

### 5.1 自动提取封面和摘要

无需手动填写，系统自动处理：

```yaml
---
title: 文章标题
published: 2026-02-06
tags: [标签]
category: Technical
# 无需填写 image 和 description
---

第一段文字会自动成为摘要...

文章正文...
```

- **封面**：自动提取第一张图片
- **摘要**：自动提取第一段文字

### 5.2 微信二维码弹窗

点击微信图标弹出霓虹灯风格弹窗，支持一键复制微信号。

修改 `src/layouts/MainGridLayout.astro` 添加弹窗 HTML 和 JavaScript。

### 5.3 Giscus 评论区

基于 GitHub Discussions 的评论系统，无需数据库。

**配置步骤**：

1. 在 GitHub 仓库启用 Discussions
2. 访问 https://giscus.app 获取配置
3. 更新 `src/pages/posts/[...slug].astro`

```astro
<div id="giscus-container"
    data-repo="你的用户名/仓库名"
    data-repo-id="R_kgDOxxxxxxxxx"
    data-category="Announcements"
    data-category-id="DIC_kwDOxxxxxxxxx"
    data-mapping="pathname"
    data-theme="preferred_color_scheme"
    data-lang="zh-CN"
></div>
```

### 5.4 文章分类功能

自动统计每个分类的文章数量，点击查看分类文章。

**分类规则**：

| 分类 | 关键词 |
|------|--------|
| Software | Typora, PicList, 快捷键, 图床, 工具 |
| Technical | 教程, 部署, 搭建, 安装, 完整指南 |
| AIHacks | Claude, ChatGPT, GPT, 提示词, LLM |

## 六、常用命令

```bash
# 创建新文章
npm run new-post "文章标题"

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 批量导入文章
node scripts/import-posts.cjs

# 更新文章分类
node scripts/update-categories.cjs
```

## 七、性能优化建议

### 7.1 图片优化

- 使用 WebP 格式（体积更小）
- 关键图片添加 `fetchpriority="high"`
- 非关键图片使用 `loading="lazy"`

### 7.2 字体优化

使用 CDN 加载霞鹜文楷字体：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css" />
```

### 7.3 构建优化

Astro 默认进行代码分割和 tree-shaking，无需额外配置。

## 八、总结

### 时间分配

| 任务 | 耗时 |
|------|------|
| 项目配置 | 1 小时 |
| 部署上线 | 30 分钟 |
| 修复 YAML 问题 | 2 小时 |
| 解决导航栏抖动 | 1 小时 |
| 性能优化 | 1 小时 |
| 修复构建问题 | 1 小时 |
| 其他调整 | 2 小时 |
| **总计** | **约 9 小时** |

### 经验总结

1. **YAML 格式极其严格**：一个空格错误就会导致整篇文章无法显示
2. **使用 CSS 变量**：避免固定颜色值，让主题自动适配
3. **关键资源优先加载**：首屏图片不要使用 `loading="lazy"`
4. **测试深色模式**：确保在深色模式下也能正常显示
5. **善用 Astro 的自动提取**：减少手动填写的工作量
6. **注意云端构建差异**：`import.meta.glob` 在云端可能不工作，静态数据直接内联更可靠

### 推荐资源

- **Fuwari 主题**：https://github.com/saicaca/fuwari
- **Astro 文档**：https://docs.astro.build
- **EdgeOne 控制台**：https://console.cloud.tencent.com/edgeone
- **霞鹜文楷字体**：https://github.com/lxgw/LxgwWenKai

## 下一步

博客已经上线，接下来可以：

1. 完善个人信息和社交链接
2. 配置自定义域名（需要备案）
3. 添加更多文章
4. 优化 SEO（搜索引擎优化）
5. 集成统计工具（如 Umami）

祝你搭建顺利！有任何问题欢迎在评论区留言。
