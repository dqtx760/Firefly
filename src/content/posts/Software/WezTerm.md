---
title: WezTerm终端安装与使用
published: 2026-04-06
tags:
  - 终端
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260406201347691.webp
---
今天分享一套**颜值高、速度快、功能强**的终端组合：


- **WezTerm**：GPU 加速终端模拟器
- **Nushell**：现代化、结构化、跨平台 Shell
- **Starship**：极简、快速、可定制的命令行提示符

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260406201347691.webp)

## 一、先安装 3 个工具

### WezTerm

WezTerm 提供两个下载通道，按需选择：

**① 官方正式版（Stable）** —— 官网默认挂着、winget 提供的版本

- 下载页：https://wezterm.org/install/windows.html
- 点 "Windows (setup.exe)" 即可，会自动集成到鼠标右键上下文菜单，建议安装默认位置。
- 也可 winget 安装：`winget install wez.wezterm`（winget 只登记 stable 通道）。
- 当前正式版为 `20240203-110809-5046fc22`，**自 2024-02 起已停止更新**，长期不收 bug 修复。

**② Nightly 每夜构建版（推荐）** —— 开发者每夜从主分支自动打包

- 下载地址（链接固定，文件每天被覆盖更新，可直接收藏）：
  https://github.com/wezterm/wezterm/releases/download/nightly/WezTerm-nightly-setup.exe
- 包含 Stable 之后的所有新特性与修复，WezTerm 社区与重度用户普遍使用。
- 安装后 WezTerm 自带更新检查，有新构建时会主动提示，无需手动反复下载。
- 校验文件地址：在上面的链接后加 `.sha256`。

> 本文作者当前使用的是 Nightly 通道。

###  Nushell二进制文件
   
    https://github.com/nushell/nushell/releases
    下载nu-0.109.1-x86_64-pc-windows-msvc.msi


### Starship
   
    https://github.com/starship/starship/releases/tag/v1.24.2
    下载starship-x86_64-pc-windows-msvc.msi


**附:winget下载安装命令**

```powershell
winget install wez.wezterm
winget install Nushell.Nushell
winget install Starship.Starship
```



## 二、核心配置

#### 1. WezTerm 配置：默认启动 Nushell

新建：C:\Users\你的用户名.wezterm.lua
自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/.wezterm.lua)

需要安装 `CaskaydiaCove Nerd Font` 字体才能正常显示图标。



#### 2. Nushell 配置：自动加载 Starship

- C:\Users\Administrator\AppData\Roaming\nushell\config.nu

- 自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/config.nu)


#### 3. Starship 配置（可选美化）

 我的使用的是[Pastel Powerline Preset](https://starship.rs/zh-CN/presets/pastel-powerline)主题
 一键创建配置文件（C:\Users\Administrator.config\starship.toml）

```
starship preset pastel-powerline -o ~/.config/starship.toml
```

自用配置文件：[点此查看](https://github.com/dqtx760/cfg/blob/main/WezTerm/starship.toml)

## 三、使用说明
#### 最终效果

这是一个高度自定义的 WezTerm 终端配置文件，专门针对日常开发、AI 聊天（如 Qwen Code）和美观体验进行了优化。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260420182653671.webp)


![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260406171739845.webp)

#### **配置说明：**

- 使用 OneHalfDark 配色方案，文字颜色为柔和灰色（#D4D4D4），长时间阅读更护眼。
- 隐藏系统标题栏，仅保留可调整大小的边框，窗口顶部保留 30px 透明区域用于视觉美观。
- 背景使用自定义图片（D:/data/images/meinv.png），并设置了适当的透明度和亮度。
- 默认启动 NuShell，并提供 NuShell、PowerShell、Cmd 的快速启动菜单。
- 字体使用 CaskaydiaCove Nerd Font，大小为 14，适合编程和阅读。
- 启动时窗口自动居中显示，初始大小为 120 列 × 40 行，关闭窗口时不提示确认。
- 启动时自动打开 1 个 Shell 标签页（标题为 Shell），其余标签按需自行新建。

**鼠标操作优化：**
- 右键：直接粘贴剪贴板内容。**Shift + 右键**：复制当前选中文字。
- 普通左键点击和拖拽：用于正常选中文字。
- Shift + 左键拖拽：安全选中文字模式，推荐在 Qwen Code 等 AI 聊天工具中使用，可有效避免选中时打断输出（Request cancelled）或自动跳回底部的问题。
- Ctrl + 左键拖拽：用于拖动整个窗口，无需按住其他额外按键即可移动窗口。

**快捷键：**
- 支持 Ctrl + t 新建标签页、Ctrl + w 退出整个 WezTerm 应用、Alt + w 关闭当前标签页。
- 支持 Alt + Shift + 方向键进行面板分割，Ctrl + 方向键切换面板。
- 支持 Ctrl + 1~8 快速切换标签页。
- Ctrl + u 清空当前行。

**其他设置：**
- 启用 HTTP 代理（127.0.0.1:7890），便于终端内工具走代理。
- 设置 bypass_mouse_reporting_modifiers 为 SHIFT，进一步提升在支持鼠标报告的程序中的兼容性。

此配置兼顾了美观、实用性和 AI 聊天场景下的稳定性，适合需要高自定义终端的用户使用。

**后续标签增删话术**
```
C:\Users\Administrator\.wezterm.lua：在 gui-startup 的启动区块里增删 spawn_window / set_title，即可调整启动标签数量与顺序，例如改成 Claude → Qwen → Shell。
```

#### 快捷键总览

| 快捷键               | 功能说明                      |
| ----------------- | ------------------------- |
| `Ctrl + t`        | 新建标签页 (SpawnTab)          |
| `Ctrl + w`        | 退出整个应用 (QuitApplication)    |
| `Alt + w`         | 关闭当前标签页 (CloseCurrentTab) |
| `Ctrl + u`        | 清空当前行 (Send Ctrl+U)       |
| `Alt + Shift + →` | 水平分割面板 (SplitHorizontal)  |
| `Alt + Shift + ↓` | 垂直分割面板 (SplitVertical)    |
| `Ctrl + ←`        | 切换到左侧面板                   |
| `Ctrl + →`        | 切换到右侧面板                   |
| `Ctrl + ↑`        | 切换到上方面板                   |
| `Ctrl + ↓`        | 切换到下方面板                   |
| `Ctrl + 1`        | 切换到标签页 1                  |
| `Ctrl + 2`        | 切换到标签页 2                  |
| `Ctrl + 3`        | 切换到标签页 3                  |
| `Ctrl + 4`        | 切换到标签页 4                  |
| `Ctrl + 5`        | 切换到标签页 5                  |
| `Ctrl + 6`        | 切换到标签页 6                  |
| `Ctrl + 7`        | 切换到标签页 7                  |
| `Ctrl + 8`        | 切换到标签页 8                  |

#### 鼠标快捷键

| 操作                          | 功能说明                                      |
|-------------------------------|-----------------------------------------------|
| 右键单击                      | 直接粘贴剪贴板内容                            |
| Shift + 右键单击              | 复制当前选中文字                              |
| 左键点击 + 拖拽               | 正常选中文字                                  |
| **Shift + 左键拖拽**          | 安全选中文字（推荐用于 Qwen 聊天，避免打断输出） |
| **Ctrl + 左键拖拽**           | 拖动窗口                                      |

**提示**：
- 在 Qwen Code 等 AI 聊天界面中，强烈推荐使用 `Shift + 左键拖拽` 来选中历史文字，可大幅减少 “Request cancelled” 问题。
- 需要移动窗口时请使用 `Ctrl + 左键拖拽`。

## 四、常见问题（Q&A）

**Q1：右键为什么有时候复制，有时候粘贴？**  
A1：右键本身只做粘贴（直接粘贴剪贴板内容）。你看到的「复制」其实是 **Shift + 右键** 的绑定——它负责复制当前选中文字。两者分开：右键 = 粘贴，Shift + 右键 = 复制，并不存在「智能判断」。

**Q2：在 Qwen Code 等 AI 聊天时，选中文字经常出现 “Request cancelled” 怎么办？**  
A2：这是因为程序开启了鼠标报告模式。解决方法是按住 **Shift** 键，再用左键拖拽选中文字。这样可以绕过鼠标报告，避免打断 AI 输出。

**Q3：如何拖动窗口？**  
A3：按住 **Ctrl** 键 + 左键拖拽 即可移动窗口。普通左键拖拽用于选中文字，不会触发窗口移动。

**Q4：为什么我直接左键选中文字还是会打断 AI 输出？**  
A4：因为 AI 聊天工具会捕获鼠标事件。推荐始终使用 **Shift + 左键拖拽** 来安全选中历史内容。如果问题依然严重，可以临时按住 Shift 滚动鼠标查看历史。

**Q5：如何快速切换标签页？**  
A5：使用快捷键 `Ctrl + 1` 到 `Ctrl + 8` 可以快速切换到对应的标签页。

**Q6：背景图片不显示或太亮/太暗怎么办？**  
A6：检查图片路径是否正确（当前路径为 D:/data/images/meinv.png）。可以调整 background 中的 opacity 值（当前为 1.5），数值越小*背景越透明*。

**Q7：配置修改后没有生效怎么办？**  
A7：按快捷键 `Ctrl + Shift + R` 重新加载配置。如果仍然无效，请完全关闭 WezTerm 后再重新打开。

**Q8：如何恢复默认设置？**  
A8：删除或重命名 `wezterm.lua` 文件，然后重启 WezTerm 即可使用默认配置。

**Q8：codex、gemini正常启动，Claude Code 启动没有响应**
打开wezterm.lua，找到这一行：
```
config.default_prog = { 'nu' }  
```
直接替换成：
```
config.default_prog = { 'powershell.exe', '-NoLogo' }
```


### 补充 2026/07/26

Typora 团队出的终端，Mac已上线，Windows没有上线
https://otty.sh/  
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260726021102290.webp)

con-terminal  终端
https://github.com/nowledge-co/con-terminal