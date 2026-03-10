---
title: Terminal 安装与美化配置指南
published: 2026-02-15
tags: []
category: Software
draft: false
pinned: false
---

运维工作中高频的命令行操作，向来因 Windows 原生命令提示符、PowerShell 的功能局限受掣肘。而 Windows Terminal 的推出完美解决这一痛点，它的多标签页设计是核心亮点：可以同时打开多个独立会话，像 Claude、OpenCode 这类工具都能在不同标签页中并行运行，无需频繁切换窗口；同时还能无缝集成 Command Prompt、PowerShell、WSL 等各类环境，大幅提升运维终端操作效率，是运维人员打造高效、美观、多功能终端环境的优质选择

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306070237226.webp)

## 一、下载与安装

1. 下载地址：https://github.com/microsoft/terminal/releases

2. 解压文件到指定安装目录（示例）：`D:\software\terminal-1.23.20211.0`

3. （可选）将解压目录添加到**系统环境变量**，实现全局快速调用

4. 双击目录内的 `WindowsTerminal.exe`，即可启动程序

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306064800835.webp)

## 二、核心配置（JSON 文件）

打开 Windows Terminal，点击界面中的「设置」，选择「打开 JSON 文件」；

将原有配置内容全部替换为以下代码（其中背景图`meinv.png`可添加`dqtx33`领取，需自行修改背景图文件路径）：

```
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": [],
    "alwaysOnTop": false,
    "alwaysShowNotificationIcon": true,
    "centerOnLaunch": true,
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
    "initialCols": 90,
    "initialPosition": "100,50",
    "initialRows": 26,
    "keybindings": 
    [
        {
            "id": "Terminal.CopyToClipboard",
            "keys": "ctrl+c"
        },
        {
            "id": "Terminal.PasteFromClipboard",
            "keys": "ctrl+v"
        },
        {
            "id": "Terminal.DuplicatePaneAuto",
            "keys": "alt+shift+d"
        }
    ],
    "language": "zh-Hans",
    "launchMode": "default",
    "newTabMenu": 
    [
        {
            "type": "remainingProfiles"
        }
    ],
    "profiles": 
    {
        "defaults": 
        {
            "backgroundImage": "D:/web3/meinv.png",
            "backgroundImageOpacity": 0.45,
            "colorScheme": "One Half Light",
            "font": 
            {
                "face": "AdwaitaMono Nerd Font Propo",
                "size": 13
            },
            "foreground": "#DCDFE4",
            "intenseTextStyle": "bold",
            "opacity": 35,
            "useAcrylic": true
        },
        "list": 
        [
            {
                "commandline": "powershell.exe -nologo",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
            },
            {
                "colorScheme": "Solarized Dark",
                "commandline": "powershell.exe -nologo",
                "experimental.retroTerminalEffect": false,
                "font": 
                {
                    "cellHeight": "1.1",
                    "size": 13
                },
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": false,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            }
        ]
    },
    "schemes": [],
    "themes": []
}
```

## 三、集成右键菜单（快速打开）

将 Windows Terminal 添加到鼠标右键菜单，可实现任意目录下一键打开终端，大幅提升操作便捷性，步骤如下：



1. 新建文本文档，粘贴以下注册表内容 **（需将路径修改为你的 Terminal 实际安装路径）**：

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\WindowsTerminal]
@="在此处打开Terminal"
"Icon"="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe,0"

[HKEY_CLASSES_ROOT\Directory\Background\shell\WindowsTerminal\command]
@="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe -d ."

[HKEY_CLASSES_ROOT\Directory\shell\WindowsTerminal]
@="在此处打开Terminal"
"Icon"="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe,0"

[HKEY_CLASSES_ROOT\Directory\shell\WindowsTerminal\command]
@="D:\\software\\terminal-1.23.20211.0\\WindowsTerminal.exe -d \"%1\""
```

2. 点击文本文档「另存为」，编码选择**ANSI**，文件后缀修改为`.reg`；

3. 双击保存后的 reg 文件，依次点击「是」「确定」，完成注册表导入即可生效。

## 四、配置美化主题（Oh My Posh）

### 1. 下载安装

下载地址：[Oh My Posh 官方发布页](https://github.com/JanDeDobbeleer/oh-my-posh/releases)，根据自身系统选择对应安装包完成安装。

### 2. 配置系统变量

将 Oh My Posh 的 bin 目录路径（示例：`C:\Users\Administrator\AppData\Local\Programs\oh-my-posh\bin`）添加到系统环境变量，确保全局可调用。

3. ### 配置主题生效

4. 按下`win+R`，输入`wt`打开 Windows Terminal；

5. 在终端中输入以下命令，创建并编辑 PowerShell 配置文件：

```
notepad $PROFILE
```


3. 在打开的记事本中，粘贴以下配置代码，保存并关闭文件：

```
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\M365Princess.omp.json | Invoke-Expression
```

4. 重启 Windows Terminal，主题即可生效。

## 五、常见问题

### 如何隐藏cmd/ PowerShell启动提示信息

在Terminal设置-配置文件，分别在命令提示符/PowerShel

命令行输入下面命令，可隐藏默认的启动提示信息，让终端界面更简洁。

```
powershell.exe -nologo
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260306070410108.webp)

### 如何安装专属字体（AdwaitaMono Nerd Font）

终端配置中需用到 AdwaitaMono Nerd Font 字体，下载地址：[Nerd Fonts 官方下载页](https://www.nerdfonts.com/font-downloads?utm_source=chatgpt.com)，下载后解压安装即可。



### 代码自动补全

1. 打开 Windows Terminal

2. 输入这 2 条命令（复制粘贴）：

```
Install-Module PSReadLine -Force -SkipPublisherCheck
notepad $PROFILE
```

3. 在打开的文件里粘贴这段：

```
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle InlineView
Set-PSReadLineOption -EditMode Windows
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
```



以上，既然看到这里了，**如果觉得教程对你有帮助**，随手<u>点个赞、收藏、转发</u>三连吧！有任何问题，欢迎在**留言区**评论，我会逐一回复。👏👏



**🛠️ 大远程技术支持**

如果你在安装、配置或使用中遇到任何问题，不想自己折腾

随时可以找我提供 **1 对 1 远程技术支持**：

- 软件安装 / 激活 / 配置
- 系统重装 / 优化
- 疑难报错排查
- 网盘挂载 / 客户端编译

👉 远程客户端下载 / 服务说明：[742112.xyz](742112.xyz)



🚀 **关于的知识星球**

为了帮你节省更多时间，我把私藏的软件安装包、激活工具、效率工作流和独家教程，都整理进了我的知识星球「<u>大强・效率空间站</u>」：68元/年，承包你一整年的效率提升。👇 微信扫码：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260306064028188.webp)
