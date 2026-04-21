---
title: Vercel部署NotionNext
published: 2026-04-21
tags: []
category: Software
draft: false
pinned: false
---


项目地址
https://github.com/tangly1024/NotionNext
https://github.com/dqtx760/NotionNext
https://github.com/dqtx760/NotionNext/tree/main/themes

我的成果
https://notion-next-eta-coral-54.vercel.app/?theme=movie
https://notion-next-eta-coral-54.vercel.app/?theme=plog
https://notion-next-eta-coral-54.vercel.app/?theme=next
https://notion-next-eta-coral-54.vercel.app/?theme=fukasawa
https://notion-next-eta-coral-54.vercel.app/?theme=typography
https://notion-next-eta-coral-54.vercel.app/?theme=example

https://notion-next-eta-coral-54.vercel.app/?theme=medium
https://notion-next-eta-coral-54.vercel.app/?theme=nobelium
https://notion-next-eta-coral-54.vercel.app/
- [x] commerce 
- [x] example
- [x] fukasawa
- [x] game
- [x] gitbook
- [ ] heo
- [ ] hex0
- [ ] landing
- [x] magzine
- [ ] matery
- [x] medium
- [x] movie
- [ ] nav
- [x] next
- [x] nobelium
- [ ] photo
- [x] plog
- [ ] proxio
- [ ] simple
- [ ] starter
- [ ] typography

未来目标
https://blog.zhheo.com/
https://meuicat.com/


参考资料
[Butterfly 主题美化教程](https://butterfly.zhheo.com/)
[从 NotionNext 转战 Hexo 博客记录 - Geek](https://www.igeekbb.com/2023/07/28/notion2hexo/)
[Butterfly的魔改教程：右键菜单 | 爱吃肉的猫](https://meuicat.com/posts/25b0b30e.html)

Vercel部署NotionNext 
https://docs.tangly1024.com/article/vercel-deploy-notion-next

视频
https://www.youtube.com/watch?v=zWlPyDQCkrk
https://www.youtube.com/watch?v=AbI70b9KfXE


模板
https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5


## 修改默认主题
主题功能说明
https://docs.tangly1024.com/article/notion-next-themes

HEO主题配置指南:https://docs.tangly1024.com/article/notionnext-heo
HEO主题魔改版:https://github.com/RHZHZ/NotionNextHeoPro


- 方法1：改动github中的源代码：
```
THEME: process.env.NEXT_PUBLIC_THEME || 'hexo', // 锁定默认主题为hexo
```

- 方法2 ， 在vercel后台添加环境变量: `NEXT_PUBLIC_THEME`
`NEXT_PUBLIC_THEME` →`hexo`

- 方法3： 使用Notion_config，在您的notion笔记中配置默认主题

# 主题demo

demo
https://blog.zhheo.com/
https://meuicat.com/
https://www.rhzhz.cn/
https://preview.tangly1024.com/en?theme=typography
https://preview.tangly1024.com/?theme=next

相册博客主题
https://github.com/zhheo/TimePlus




## 参考材料
https://mp.weixin.qq.com/s/shKDa1REpWX1L-DuGkL_dg
https://mp.weixin.qq.com/s/gjfZ4ix-0RTLFODmgfO2xg

字段说明， 
https://notion-next-eta-coral-54.vercel.app/about?theme=gitbook

如何切换主题
https://www.bilibili.com/video/BV18M4m1d7jU/?spm_id_from=333.337.search-card.all.click&vd_source=206031f494850e57fd6c92ace02b1bed


