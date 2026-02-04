---
title: 干货教程：我的博客发布工作流
published: 2026-02-04
tags: [教程, 博客, 工作流, Typora]
category: 技术教程
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260204103206520.webp
---

今天我想通过这篇文章来跟大家谈一谈，关于我的博客是如何发布自动更新的，我的博客没有服务器，我只有一个域名通过 GitHub 进行了托管，下面我分享一下我的工作流！

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260204103206520.webp)

## 创建文章

 1. 点击 Typora 的"文件" → "新建文本"（或按 Ctrl+N），文件名可最好是英文
  2. 微信输入法常用语推送Frontmatter 模板

```
---
title: 文章标题
published: 2026-02-04
description: 文章摘要（可选，第一段自动提取）
tags: [标签1, 标签2]
category: 软件安利
draft: false
---
```

这里面修改下标题、时间、分类

## 自动封面、描述触发

开始写文章，一般我会先写开头，（脚本会被自动用作文章描述）

过程中会插入图片（第一张图脚本会自动会用作文章封面）



## 本地预览

我写完会先在本次进行预览

桌面右边，运行

```
cd D:\project2026\fuwari
npm run dev
```

访问 http://localhost:4321/预览



## 提交文章

预览感觉没有问题，通过GitHub Desktop推送github即可

Edge0ne会自动检测到推送，从而触发自动构建，1分钟左右后，自动发布到我的博客。



以上就是我的博客发布工作流了

欢迎大家交流讨论，有问题评论区留言



