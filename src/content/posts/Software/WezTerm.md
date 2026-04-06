---
title: WezTerm终端配置指南
published: 2026-04-06
tags: []
category: Software
draft: false
pinned: false
---

今天分享一套**颜值高、速度快、功能强**的终端组合：



- **WezTerm**：GPU 加速终端模拟器
- **Nushell**：现代化、结构化、跨平台 Shell
- **Starship**：极简、快速、可定制的命令行提示符

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260406201347691.webp)

## 一、先安装 3 个工具

1. ### WezTerm
   
    https://wezterm.org/install/windows.html
    Windows (setup.exe)「推荐」
    会自动集成在鼠标右键上下文菜单中
    建议安装默认位置



2. ### Nushell二进制文件
   
    https://github.com/nushell/nushell/releases
    下载nu-0.109.1-x86_64-pc-windows-msvc.msi



3. ### Starship
   
    https://github.com/starship/starship/releases/tag/v1.24.2
    下载starship-x86_64-pc-windows-msvc.msi



**附:winget下载安装命令**

```powershell
winget install wez.wezterm
winget install Nushell.Nushell
winget install Starship.Starship
```



## 二、核心配置

### 1. WezTerm 配置：默认启动 Nushell

 新建：C:\Users\你的用户名.wezterm.lua
自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/.wezterm.lua)

 

**关键说明**

> 需要安装 `CaskaydiaCove Nerd Font` 字体才能正常显示图标
>  下面的是我自定义的一些快捷键

| 快捷键              | 功能           |
| ------------------- | -------------- |
| Ctrl+Shift+V        | 粘贴           |
| `Ctrl + t`          | 新建标签       |
| `Ctrl + 数字`       | 切换标签       |
| **Alt + Shift + →** | **左右分屏**   |
| **Alt + Shift + ↓** | **上下分屏**   |
| **Ctrl + 方向键**   | 在分屏之间切换 |
| **Ctrl + W**        | 关闭当前分屏   |
| **Alt + W**         | 关闭整个标签   |

### 2. Nushell 配置：自动加载 Starship

- C:\Users\Administrator\AppData\Roaming\nushell\config.nu

- 自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/config.nu)




### 3. Starship 配置（可选美化）



 我的使用的是[Pastel Powerline Preset](https://starship.rs/zh-CN/presets/pastel-powerline)主题
 一键创建配置文件（C:\Users\Administrator.config\starship.toml）

```
starship preset pastel-powerline -o ~/.config/starship.toml
```

自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/starship.toml)

## 三、最终效果

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260406171739845.webp)

## 四、常见问题

### WezTerm 里 codex、gemini正常启动，Claude Code 启动没有响应

打开你的 wezterm.lua，找到这一行：

```
config.default_prog = { 'nu' }
```

直接替换成：

```
config.default_prog = { 'powershell.exe', '-NoLogo' }
```

以上，配置文件会持续更新