---
title: Warp终端测评记录
published: 2026-05-07
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510004653994.webp
---
10小时GitHub狂揽3万星，OpenAI亲自下场成为Founding Sponsor，由Rust原生打造的Warp终端，正在以颠覆性的方式，彻底改写开发者对命令行工具的认知。

### 安装
- 官网下载安装包：[参照](https://www.warp.dev/)
- winget安装命令安装
```
winget install Warp.Warp
```


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510004653994.webp)



### 自定义背景
在 Warp 里按 `Ctrl + ,`  搜索→ Background

### 关闭启动提示
1. 右下角有个 **"Don't show again"** 按钮，直接点它就行。
2. 如果点了还弹，设置搜索Warp Agent ，关闭Include agent-executed commands in history

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510001737774.webp)



### cc启动Claude

在 Warp里执行命令

```
notepad $PROFILE
```

然后把这段代码粘贴进去
```
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/M365Princess.omp.json" | Invoke-Expression

function cc { claude --dangerously-skip-permissions }
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260510005702430.webp)


### 常用快捷键

| 快捷键                | 功能说明     |
| ------------------ | -------- |
| `Ctrl + ,`         | 设置       |
| `Ctrl + P`         | 查看历史输入命令 |
| `Ctrl + Shift + T` | 新建终端会话   |
| Ctrl Shift V       | 粘贴       |
| Ctrl Shift D       | 右拆分窗格    |
| CtrlAlt +⬆️⬇️      | 切换光标     |
| Ctrl Shift B       | 显示、隐藏左侧栏 |


Warp的出现，本质上是命令行工具的一次“现代化重构”。它没有抛弃开发者熟悉的命令行能力，而是用AI、块状输出、IDE级交互这些现代技术，给传统终端装上了“翅膀”。


**命令行的未来，早已不是“能用就行”，而是“智能、高效、丝滑”。而Warp，正是这个未来的起点。**