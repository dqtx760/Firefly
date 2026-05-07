---
title: Warp终端测评记录
published: 2026-05-07
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260507012639131.png
---
10小时GitHub狂揽3万星，OpenAI亲自下场成为Founding Sponsor，由Rust原生打造的Warp终端，正在以颠覆性的方式，彻底改写开发者对命令行工具的认知。

10 小时冲到 3 万星🌟，OpenAI 亲自下场当 Founding Sponsor！

终端界的门槛，这次被 Warp 彻底干掉了。

你还在用老古董终端一行行滚屏、Ctrl+R 翻历史命令吗？Warp 直接把命令行升级成了 AI Agent 现代开发环境！

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260507012639131.png)

### 核心亮点：

· Block 块状输出：每条命令自动变成独立卡片，可折叠、搜索、单独复制、分享

· AI Agent 原生嵌入：自然语言直接指挥 AI 写代码、改代码、跑测试、生成脚本

· IDE 级交互：鼠标选中就能编辑命令、代码高亮 diff、直接加 Comment

· 智能搜索：顶部一框搜 Sessions、Agents、Files，历史命令再多也能秒找

· OpenAI 官方背书：OpenAI 是 Founding Sponsor，提供资金 + GPT 模型深度支持

**💡 为什么用 Warp 就很丝滑？**

简单来说，它让你的命令行操作从几分钟变几秒，效率翻倍，智能化操作轻松搞定一切。

实际用起来有多丝滑？

输入：帮我把这个目录打包成 Docker image 并推到 registry

→ AI 直接生成完整命令 + 可执行块 + 解释，一键执行。Rust 原生编写，跨平台（Mac/Windows/Linux），速度极快。

🌍 全球已有数十万开发者在用 Warp啦～感兴趣的可以看看哦

### 汉化
https://github.com/ztllll/warp-zh

```
https://github.com/ztllll/warp-zh你看下这个项目，帮我Warp汉化下
```


### **选择支持中文的字体**

Warp 默认字体可能对中文渲染不友好，建议在设置里切换为这些字体：

- macOS：PingFang SC、Hiragino Sans GB
- Windows：Microsoft YaHei、Microsoft YaHei Mono
- Linux：WenQuanYi Zen Hei（文泉驿正黑）、Noto Sans CJK SC


### 常用快捷键

| 场景分类 | 快捷键（Windows/Linux） | 快捷键（macOS） | 功能说明 |
|----------|-------------------------|-----------------|----------|
| **AI Agent 核心** | `Ctrl + Shift + Enter` | `Cmd + Shift + Enter` | 启动新的本地AI对话 |
|          | `Ctrl + Alt + Enter` | `Cmd + Alt + Enter` | 启动新的云端AI对话 |
|          | `↑` | `↑` | 循环切换历史命令与AI对话 |
| **终端与会话** | `Ctrl + Shift + T` | `Cmd + T` | 新建终端会话 |
|          | `Ctrl + Shift + W` | `Cmd + W` | 关闭当前会话 |
|          | `Ctrl + Shift + +` | `Cmd + Shift + +` | 打开代码审查面板 |
| **文本编辑** | `Ctrl + A` | `Cmd + A` | 光标移动到行首 |
|          | `Ctrl + E` | `Cmd + E` | 光标移动到行尾 |
|          | `Ctrl + U` | `Cmd + U` | 删除当前行全部内容 |
|          | `Ctrl + W` | `Alt + Delete` | 删除光标前的一个单词 |
| **块状操作** | `Alt + ↑/↓` | `Option + ↑/↓` | 快速切换上下命令块 |
|          | `Ctrl + Shift + C` | `Cmd + Shift + C` | 复制当前命令块内容 |
|          | `Ctrl + Shift + V` | `Cmd + Shift + V` | 粘贴并执行命令块 |
| **全局功能** | `Ctrl + Shift + P` | `Cmd + Shift + P` | 打开命令面板，搜索所有功能与快捷键 |
|          | `Ctrl + F` | `Cmd + F` | 搜索当前会话的命令与输出 |

这些快捷键覆盖了Warp的核心场景，从AI对话、会话管理到文本编辑，帮你把“点鼠标找功能”的操作全部替换成“指尖流操作”，效率直接翻倍。


Warp的出现，本质上是命令行工具的一次“现代化重构”。它没有抛弃开发者熟悉的命令行能力，而是用AI、块状输出、IDE级交互这些现代技术，给传统终端装上了“翅膀”。


**命令行的未来，早已不是“能用就行”，而是“智能、高效、丝滑”。而Warp，正是这个未来的起点。**
