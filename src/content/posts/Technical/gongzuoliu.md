---
title: 干货教程：我的博客发布工作流
published: 2026-02-04
description: '分享我的无服务器博客发布流程：使用 GitHub 托管 + EdgeOne 自动部署，配合 Typora 和脚本实现高效的文章发布工作流。'
tags: [教程, 博客, 工作流, Typora, 自动化]
category: Technical
draft: false
---

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260204103206520.webp)

今天想跟大家分享一下我的博客发布工作流。我的博客没有服务器，只有一个域名通过 GitHub 进行托管，配合 EdgeOne 实现自动构建部署。整个过程非常高效，下面就来详细介绍！

## 创建文章

### 1. 新建 Markdown 文件

打开 Typora，点击「文件」→「新建文本」（或按 `Ctrl+N`），文件名建议使用英文。

### 2. 添加 Frontmatter

在文章开头添加 Frontmatter 模板：

```yaml
---
title: 文章标题
published: 2026-02-04
tags: [标签1, 标签2]
category: 软件安利
draft: false
---
```

**提示：** 可以设置微信输入法的常用语，快速插入这个模板，省时省力。

根据需要修改以下字段：
- `title`：文章标题
- `published`：发布日期（格式：`YYYY-MM-DD`）
- `tags`：文章标签
- `category`：文章分类
- `draft`：是否为草稿（`true`/`false`）

## 自动封面与描述

博客脚本会自动处理封面图和描述：

- **封面图**：文章中插入的第一张图片会自动作为文章封面
- **描述**：文章开头的第一段文字会自动作为文章描述

写文章时，先写好开头段落，然后插入第一张图片即可。

## 运行脚本

写完文章后，运行以下命令给文章添加 frontmatter：

```bash
cd D:\project2026\fuwari
npm run add-frontmatter
```

这个脚本会自动扫描所有文章，给没有 frontmatter 的文章添加模板。

## 本地预览

写完文章后，先在本地预览效果：

```bash
cd D:\project2026\fuwari
npm run dev
```

然后访问 [http://localhost:4321/](http://localhost:4321/) 查看效果。

## 发布上线

预览确认无误后，通过 GitHub Desktop 推送到 GitHub。

EdgeOne 会自动检测到推送，触发自动构建。大约 1 分钟后，文章就会自动发布到博客了！

## 进阶：一键启动脚本

为了更高效，我写了一个 BAT 脚本，写完文章后双击即可完成所有操作。

### 使用流程

1. Typora 写文章
2. 双击「启动博客并添加模板.bat」
3. 填写文章的 frontmatter
4. 刷新浏览器查看效果

### 脚本功能

- ✅ 自动检查开发服务器状态（未运行则自动启动）
- ✅ 自动给文章添加 frontmatter 模板
- ✅ 自动打开浏览器预览

**提示：**
- 第一次运行会自动启动开发服务器（需要等 5 秒）
- 以后运行会自动检测服务器状态，已运行则跳过
- 开发服务器会一直保持运行，无需重复启动

---

以上就是我的博客发布工作流了。虽然博客没有服务器，但通过 GitHub + EdgeOne 的组合，配合一些小脚本，依然可以实现高效的自动化发布。

欢迎大家交流讨论，有问题评论区留言！
