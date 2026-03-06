# Fuwari 博客项目 LCP 分析报告

## 1. 项目概述
这是一个基于 Astro 5.7.9 框架的静态博客项目，使用 Svelte 组件、Tailwind CSS，并集成了 Swup 页面过渡库。

## 2. LCP 定义
LCP（Largest Contentful Paint，最大内容绘制）是 Core Web Vitals 的重要指标，用于衡量页面加载过程中，最大可见内容元素的绘制时间，目标是 < **2.5秒**。

## 3. 项目 LCP 元素分析

### 3.1 首页 LCP 元素
根据 `src/config.ts` 配置，当前首页 **未启用 banner**：
```typescript
banner: {
    enable: false,  // 首页 banner 未启用
    src: "/xinghui.avif",
    // ...
}
```

因此，首页的 LCP 元素主要是：
- 文章卡片（PostCard.astro）中的内容
- 或者页面的主要文本内容

### 3.2 文章页面 LCP 元素
文章页面（`src/pages/posts/[...slug].astro`）的 LCP 元素主要是：
1. **文章标题** - 大尺寸文本
2. **文章封面图**（如果设置了）- 通过 `<ImageWrapper>` 组件渲染

## 4. 图片处理与优化分析

### 4.1 ImageWrapper.astro 组件
该组件是项目中所有图片的统一渲染入口：

```astro
---
// 第 50-55 行：图片渲染逻辑
{isLocal && img && <Image src={img} alt={alt || ""} class={`${imageClass} image-content`} style={imageStyle} loading="eager" fetchpriority="high"/>}
{!isLocal && (
    imageFallbackConfig.enable && src.includes(imageFallbackConfig.originalDomain) ?
        <img src={isPublic ? url(src) : src} alt={alt || ""} class={`${imageClass} image-content`} style={imageStyle} loading="eager" fetchpriority="high" onerror={`this.onerror=null; this.src='${(isPublic ? url(src) : src).replace(imageFallbackConfig.originalDomain, imageFallbackConfig.fallbackDomain)}';`}/> :
        <img src={isPublic ? url(src) : src} alt={alt || ""} class={`${imageClass} image-content`} style={imageStyle} loading="eager" fetchpriority="high"/>
)}
---
```

**关键点：**
- 所有图片都设置了 `loading="eager"` 和 `fetchpriority="high"` - 这意味着图片会立即加载，对 LCP 有直接影响
- 支持本地图片（使用 Astro Image 组件）和外部图片（img 标签）
- 支持图片加载失败时的回退逻辑（rehype-image-fallback）

### 4.2 图片回退机制
`src/plugins/rehype-image-fallback.mjs` 提供了图片加载失败的回退机制：
```javascript
export default function rehypeImageFallback(options = {}) {
    const {
        enable = true,
        originalDomain = "sb-eo-r2.2x.nz",
        fallbackDomain = "pub-d433ca7edaa74994b3d7c40a7fd7d9ac.r2.dev",
    } = options;
    // ...
}
```

### 4.3 图片加载状态管理
在文章页面有图片加载状态管理（但目前未使用）：
```javascript
// 第 211-217 行
.post-container :global(img) {
    opacity: 0;
    transition: opacity 0.5s ease-out;
}
.post-container :global(img.loaded) {
    opacity: 1;
}
```

## 5. 字体加载分析

### 5.1 字体配置
项目使用多种字体：
```typescript
// package.json
"@fontsource-variable/jetbrains-mono": "^5.2.5",
"@fontsource/roboto": "^5.2.5",
// 霞鹜文楷字体 CDN
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css">
```

### 5.2 字体预加载
**问题：** 项目中没有对字体的预加载优化，字体加载可能会影响 LCP。

## 6. 资源预连接与预加载

### 6.1 当前预连接配置
在 `src/layouts/Layout.astro` 中：
```html
<link rel="preconnect" href="https://pic1.acofork.com" />
<link rel="preconnect" href="https://umami.acofork.com" />
<link rel="preconnect" href="https://support.nodeget.com" />
```

**预连接了图片、统计和评论系统的域名**

## 7. 可能影响 LCP 的问题

### 7.1 图片加载策略
- 所有图片都使用 `loading="eager"` 和 `fetchpriority="high"`，这可能会导致首屏图片过多时 LCP 延迟
- 对于不在首屏的图片，应该使用 `loading="lazy"`

### 7.2 图片格式优化
- 项目使用 AVIF 格式（`/xinghui.avif`），这是很好的优化
- 但需要确保所有图片都使用现代格式（AVIF/WebP）

### 7.3 字体加载
- 没有字体预加载机制
- 霞鹜文楷字体通过 CDN 加载，可能会有网络延迟

### 7.4 页面结构
- `MainGridLayout.astro` 中使用了复杂的 CSS Grid 布局
- 可能存在布局偏移（CLS）问题影响 LCP

## 8. 优化建议

### 8.1 图片加载策略优化
修改 `ImageWrapper.astro`，根据图片位置设置不同的加载策略：
```astro
---
// 添加逻辑判断图片是否在首屏
const isAboveFold = Astro.props.aboveFold ?? true;
---

{isLocal && img && <Image
    src={img}
    alt={alt || ""}
    class={`${imageClass} image-content`}
    style={imageStyle}
    loading={isAboveFold ? "eager" : "lazy"}
    fetchpriority={isAboveFold ? "high" : "auto"}
/>}
```

### 8.2 字体预加载
在 `src/layouts/Layout.astro` 中添加字体预加载：
```html
<link rel="preload" href="/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/lxgw-wenkai.woff2" as="font" type="font/woff2" crossorigin>
```

### 8.3 图片格式自动转换
确保所有图片都转换为 AVIF/WebP 格式，并提供适当的 fallback

### 8.4 启用 Astro 的图片优化
当前配置使用 `passthroughImageService()`，建议启用 Astro 内置的图片优化：
```javascript
// astro.config.mjs
image: {
    service: 'astro:assets', // 使用 Astro 内置图片服务
},
```

### 8.5 懒加载优化
对 PostCard.astro 中的图片根据位置设置懒加载：
```astro
<!-- PostCard.astro -->
<ImageWrapper
    src={image}
    basePath={path.join("content/posts/", getDir(entry.id))}
    alt="Cover Image of the Post"
    aboveFold={false}  <!-- 非首屏图片设置懒加载 -->
>
```

### 8.6 减少首屏资源
- 考虑延迟加载非必要的组件（如评论系统、统计）
- 优化 Swup 动画库的加载

## 9. 验证与测试建议

### 9.1 使用 Lighthouse 测试
在项目根目录运行：
```bash
npm run build
npm run preview
# 然后使用 Lighthouse 测试
```

### 9.2 图片尺寸优化
使用工具检查图片尺寸是否合适：
```bash
# 安装 sharp 工具
npm install -g sharp-cli
# 检查图片尺寸
sharp --info public/*.avif public/*.webp
```

### 9.3 监控实际 LCP 数据
使用 Umami（项目已集成）监控真实用户的 LCP 数据：
```typescript
// umamiConfig 已配置
umamiConfig: {
    enable: true,
    baseUrl: "https://umami.acofork.com",
    shareId: "CdkXbGgZr6ECKOyK",
    timezone: "Asia/Shanghai",
}
```

## 10. 实际 Lighthouse 测试结果

### 10.1 性能分数
- **Overall Performance Score**: 60/100
- **LCP Score**: 0/100 (严重问题)
- **LCP Time**: 9.5 秒 (远超 2.5 秒目标)

### 10.2 问题定位

**主要 LCP 元素：**
```css
div.card-base > a.group > div.w-full > img.w-full
```
该元素是文章卡片中的封面图，来自外部源 Gitee：
- https://gitee.com/da-qiang-classmate/typora/raw/master/image/...

**问题分析：**
1. 外部图片加载缓慢
2. Gitee 图片 CDN 性能不佳
3. 所有图片都使用 `loading="eager"` 和 `fetchpriority="high"` 导致资源竞争

### 10.3 紧急优化建议

#### 10.3.1 立即修复 LCP
```astro
<!-- 修改 ImageWrapper.astro -->
---
// 添加逻辑判断是否为外部图片
const isExternal = src.startsWith("http://") || src.startsWith("https://");

// 对于外部图片使用懒加载
const loadingStrategy = isExternal ? "lazy" : "eager";
const fetchPriority = isExternal ? "auto" : "high";
---

{isLocal && img && <Image
    src={img}
    alt={alt || ""}
    class={`${imageClass} image-content`}
    style={imageStyle}
    loading={loadingStrategy}
    fetchpriority={fetchPriority}
/>}
{!isLocal && (
    imageFallbackConfig.enable && src.includes(imageFallbackConfig.originalDomain) ?
        <img src={isPublic ? url(src) : src} alt={alt || ""} class={`${imageClass} image-content`} style={imageStyle} loading={loadingStrategy} fetchpriority={fetchPriority} onerror={`this.onerror=null; this.src='${(isPublic ? url(src) : src).replace(imageFallbackConfig.originalDomain, imageFallbackConfig.fallbackDomain)}';`}/> :
        <img src={isPublic ? url(src) : src} alt={alt || ""} class={`${imageClass} image-content`} style={imageStyle} loading={loadingStrategy} fetchpriority={fetchPriority}/>
)}
```

#### 10.3.2 图片资源本地化
将所有外部 Gitee 图片下载到本地 `/public` 目录，并更新文章 frontmatter 中的图片路径。

#### 10.3.3 图片格式转换
确保所有本地图片都转换为 AVIF 或 WebP 格式：
```bash
cd public
cwebp image.jpg -o image.webp
avifenc image.jpg image.avif
```

#### 10.3.4 启用 Astro 图片服务
修改 `astro.config.mjs`：
```javascript
image: {
    service: 'astro:assets',  // 使用 Astro 内置优化服务
    domains: ['gitee.com'],   // 允许处理 Gitee 图片
},
```

### 10.4 预期优化效果

通过实施上述优化，预计：
- LCP 时间从 **9.5 秒** 减少到 **2.0 秒** 以内
- 性能分数从 **60/100** 提升到 **90/100** 以上
- 页面加载速度显著改善

## 11. 总结

该项目的 LCP 问题非常严重，主要是由于外部图片资源加载缓慢和加载策略不当造成的。通过图片本地化、加载策略优化和格式转换，可以大幅提升 LCP 性能。

