---
title: Qwen Code安装使用教程
published: 2026-04-14
tags:
  - Agent
  - Qwen
  - Claude
  - 编程助手
  - AI工具
  - 命令行工具
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414155118952.webp
---

Qwen Code 是基于 Gemini Code 二次开发的**终端 AI 编程助手**，完美搭载**通义千问3.6 Plus 最新编程模型**，支持纯中文交互、代码生成/修复/Git 协作，**免费**提供**每日100次请求**额度完全满足日常开发需求。



**开源地址**：https://github.com/QwenLM/qwen-code



![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414155118952.webp)

## 一、前置准备

### 1. 安装必备环境
Qwen Code 依赖 **Node.js 20.0 及以上版本**，必须先安装：
1. 打开官网：https://nodejs.org/
2. 下载 **LTS 版本**（长期稳定版），一路默认安装即可
3. 验证是否安装成功：
   按下 `Win + R`，输入 `cmd` 打开终端，执行命令：
   
   ```cmd
   node -v
   npm -v
   ```
   出现版本号就说明环境就绪。

### 2. 关键要求
打开终端时，**必须右键选择「以管理员身份运行」**（否则无法全局安装）。

## 二、安装命令
```cmd
npm install -g @qwen-code/qwen-code@latest
```

等待安装完成，出现安装成功提示即可。

### 验证安装是否成功
在终端输入：
```cmd
qwen --version
```
显示版本号 = **安装成功**。

## 三、首次使用 + 登录授权
### 终端启动

```
# 1. 默认启动（建议模式 - 每次操作需确认）
qwen 

# 2. 全自动模式（无需确认，自动执行所有操作）
qwen -y
qwen --approval-mode yolo
```
1. 首次启动会提示选择登录方式，**直接选择「Qwen OAuth」**
2. 会自动跳转到浏览器，登录你的通义千问账号（直接用github登录）
3. 登录完成后，返回终端，自动完成认证，**无需手动配置密钥**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260414202107652.webp)



**使用 Qwen3.6 Plus 模型**

进入交互界面后，使用命令 `/model` 切换模型：

```
/model qwen3.6-plus
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414203620949.webp)

### 配置 API Key 

在 settings.json 中配置 API Key 和模型                  

参考：[配置说明](https://qwenlm.github.io/qwen-code-docs/zh/users/configuration/model-providers/)   火山API：[点此购买](https://volcengine.com/L/RvxTJNv-DhA/)

配置火山引擎方舟Coding Plan模型MiniMax-M2.5示例

```
{
  "modelProviders": {
    "openai": [
      {
        "id": "minimax-m2.5",
        "name": "MiniMax-M2.5",
        "baseUrl": "https://ark.cn-beijing.volces.com/api/coding/v3",
        "description": "MiniMax-M2.5 via 火山方舟",
        "envKey": "OPENAI_API_KEY"
      }
    ]
  },
  "env": {
    "OPENAI_API_KEY": "your-API"
  },
  "security": {
    "auth": {
      "selectedType": "openai"
    }
  },
  "model": {
    "name": "minimax-m2.5"
  }
}
```



## 四、自然语言使用

启动工具后，直接输入中文需求即可：
```
帮我写一个Python批量重命名文件的脚本
解释当前项目的代码结构
修复这个文件的报错
生成规范的Git提交注释
```

常用命令：
- `/help`：查看所有功能
- `/quit`：退出工具
- `/clear`：清空终端内容
- `/model`：切换 AI 模型
- `/compress`：压缩上下文，减少 Token 消耗
- `/search`：搜索文件内容
- `/read`：读取指定文件
- `/edit`：编辑当前文件
- `/write`：写入或创建新文件
- `/bash`：执行终端命令
- `/review`：代码审查
- `/test`：运行测试



## 五、多子 Agent 并行处理

Qwen Code 支持调用多个**子 Agent（子程序）**并行工作，大幅提升任务处理效率。

### 如何调用多个子 Agent

在任务提示词中明确指示即可：

```
请同时调用 3 个子 Agent，分别处理以下任务：
1. Agent A: 读取 src/pages 目录下的所有 .astro 文件
2. Agent B: 扫描 src/components 目录，找出所有用到某个组件的地方
3. Agent C: 分析 src/content 目录下的所有文章，统计标签使用情况

注意：需要配合 todo_write 来管理跟踪这些并行任务。
```

### 配合 todo_write 管理任务

```javascript
// 同时启动多个任务时，用 todo_write 跟踪进度
{
  "todos": [
    { "id": "1", "content": "任务A：读取文件", "status": "in_progress" },
    { "id": "2", "content": "任务B：扫描组件", "status": "in_progress" },
    { "id": "3", "content": "任务C：统计分析", "status": "in_progress" }
  ]
}
```

### 使用场景

- ✅ 批量处理多个文件
- ✅ 并行执行独立的搜索任务
- ✅ 同时分析不同模块的代码
- ✅ 大规模代码重构前的多点扫描

### 注意事项

- ⚠️ 同时调用的 Agent 越多，消耗资源越大
- ⚠️ 建议控制在 3-5 个并行任务
- ✅ 复杂任务拆分为多个子任务，效率更高



**以上，既然看到这里了，如果觉得教程对你有帮助，随手点个赞、收藏、转发三连吧！有任何问题，欢迎在留言区评论，我会逐一回复。👏👏**



**✅大远程技术支持**

如果你在安装、配置或使用中遇到任何问题，不想自己折腾

随时可以找我提供 **1 对 1 远程技术支持**：[742112.xyz](742112.xyz)

