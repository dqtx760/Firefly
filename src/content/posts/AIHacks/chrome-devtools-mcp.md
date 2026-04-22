---
title: Chrome官方MCP：chrome-devtools-mcp
published: 2026-03-10
tags:
  - MCP
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260311185030784.webp
---

前端开发中的网页性能分析、重复交互操作、多场景调试，向来是耗时又繁琐的工作。而Chrome DevTools MCP的出现，打通了AI助手与Chrome浏览器的通信链路，让开发者仅凭自然语言指令，就能实现浏览器自动化控制、性能诊断、页面调试等操作，直接把前端开发与调试效率拉满。



项目地址：https://github.com/ChromeDevTools/chrome-devtools-mcp

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260311185030784.webp)

## 一、快速上手：三步配置，即刻使用
### 1. 环境准备
搭建Chrome DevTools MCP环境，仅需两个基础条件，确保版本匹配即可：
- Node.js v20.19 及以上版本
- 最新稳定版 Chrome 浏览器

### 2. 全局安装
执行下方命令，完成Chrome DevTools MCP的全局安装：
```bash
npm install -g chrome-devtools-mcp
```

### 3. 客户端核心配置
在你的MCP客户端配置文件中，添加如下基础配置，即可完成初始化：

自己不懂可以借助CC Switch，也可以让Claude配置

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

## 二、关键优化：保留登录状态，告别重复操作
默认配置下，Chrome DevTools MCP会使用临时Profile，每次操作都需要重新登录各类网站，十分繁琐。这里提供两种实用配置方案，轻松保留登录状态，复用浏览器环境。

### 方案1：指定专属用户数据目录
直接在配置中设置固定的用户数据目录，让Chrome将登录信息、配置都保存在该目录，永久保留：
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--user-data-dir=%USERPROFILE%\\.chrome-mcp-profile",
        "--isolated=false"
      ]
    }
  }
}
```

### 方案2：连接本地正在运行的Chrome实例（推荐）
直接复用你本地已打开的Chrome，所有登录状态、已开标签页一键复用，无需额外配置目录，步骤如下：
#### 步骤1：开启Chrome远程调试
先完全关闭所有Chrome进程，右键点击Chrome快捷方式→「属性」，在「目标」末尾添加远程调试参数：
原目标：
```
"C:\Program Files\Google\Chrome\Application\chrome.exe"
```
修改后：
```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

#### 步骤2：配置MCP连接本地Chrome
在MCP客户端配置文件中，添加调试地址配置，指向本地9222端口：
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "chrome-devtools-mcp",
      "env": {
        "DEBUGGER_ADDRESS": "localhost:9222"
      }
    }
  }
}
```
配置完成后重启MCP服务，后续调用Chrome相关功能，都会直接连接本地运行的Chrome实例。

### 极简备用方案：启动专用Chrome
也可通过命令行启动专属Chrome实例，手动登录后永久保留状态，适用于需要单独隔离开发环境的场景：
```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="$HOME/.chrome-mcp" --remote-debugging-port=9222

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --user-data-dir="%USERPROFILE%\.chrome-mcp" --remote-debugging-port=9222
```
在该Chrome中登录小红书、微信、各类开发平台后，配置MCP即可直接复用登录状态。

## 三、能力全开：AI操控浏览器，能做这些事
Chrome DevTools MCP赋予AI完整的Chrome操控能力，从性能分析到页面爬取，从自动化发布到跨平台信息获取，自然语言一句话就能实现，以下是开发者高频实用场景：
1. **性能分析**：`帮我分析D:\project2026\fuwari这个项目的LCP指标`
2. **内容转换与发布**：`把D:\project2026\fuwari\src\content\posts\AIHacks\feishumcp.md转换成小红书笔记，并用chrome-devtools-mcp发布`
3. **资源下载**：`调用chrome-devtools-mcp下载https://www.xiaoyuzhoufm.com/episode/6622f0cec3e09d8f3737b1dc的音频链接`
4. **页面信息爬取**：`把https://mp.weixin.qq.com/s/aCnFwCJ-I-bwaZ5SMFWgbw页面的文字、图片、代码块全部扒下来，隐藏作者与平台信息`
5. **文档学习与项目修改**：`用Chrome DevTools查看https://custom.rokid.com的官方JSAR文档，并对项目进行对应修改`
6. **平台信息汇总**：`打开bilibili搜索影视飓风，总结该账号最近一个月的视频链接`
7. **电商/社交自动化**：小红书自动发帖、自动登录平台并上架商品
8. **海外平台信息获取**：`去油管找到第一个关于Anthropic的视频，跳过广告并总结视频内容`

简单来说，只要是人工能在Chrome中完成的操作，通过Chrome DevTools MCP，AI都能替你实现，彻底解放双手。

## 四、核心价值：前端开发的效率革命
Chrome DevTools MCP的核心，是将原本需要人工一步步操作的**复杂前端调试、自动化测试、性能分析工作**，简化为自然语言指令，让AI成为你的专属浏览器操作助手：
- 无需编写复杂的自动化脚本，一句话实现浏览器交互；
- 直接复用本地Chrome环境，登录状态、配置信息不丢失；
- 打通AI与Chrome DevTools的全能力，性能分析、网络调试、页面操作一站式完成；
- 支持多MCP客户端适配，Claude Code、CherryStudio等主流AI开发工具均可无缝集成。



从重复的页面操作到专业的性能诊断，Chrome DevTools MCP让AI成为前端开发者的「左膀右臂」，把开发者从繁琐的机械工作中解放出来，更专注于核心的开发与创意工作。

这就是Chrome官方推出的MCP插件，一个让AI真正接管浏览器，重构前端开发效率的实用工具，现在就配置起来，体验AI操控浏览器的便捷吧！