---
title: 筛查无tags与分类笔记
published: 2025-05-01
tags:
  - dataview模板
category: Zen
draft: false
pinned: false
---

```dataview
TABLE WITHOUT ID
  dateformat(file.ctime, "yyyy/MM/dd") AS "创建日期",
  file.link AS "笔记名称"
WHERE file.ctime >= date(today) - dur(3 days)
AND !file.tags
AND !category
SORT file.ctime DESC
```
