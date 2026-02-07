---
title: md2wechat-skill安装教程
published: 2026-02-08
tags: []
category: AIHacks
draft: false
pinned: false
---

如果你用Markdown写公众号文章，需要先复制内容到排版工具，再复制公众号很麻烦，既耗时间又难保证格式精美，每次操作都要反复调整，成了不少人的痛点，这几天在GitHub发现了**md2wechat-skill**，听说能一键转换Markdown为精美排版并自动上传到微信草稿箱，好奇测试了下！



我安装踩了不少坑，终于搞定，流程算跑通了，不过吐槽下，我是在Claude中用的Ai模式真的慢，有这时间，我10篇文章都排版好了！不过做个记录，相信随着时间技术成熟，一切都会发生变化！

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/workany_writing_1280x720.webp)

## ⚠️ 安装前必读（踩坑预警）

安装过程中遇到的主要问题：

1. **Go 环境问题** - 需要手动安装 Go 编译环境
2. **微信 IP 白名单** - 必须配置，否则无法上传素材
3. **API Key 未配置** - 默认用 API 模式会 401 报错
4. **WebP 图片格式** - 微信不支持，需要转换
5. **AI 模式工作流** - 需要两步完成，不是一键搞定



## 一、环境准备

### 1. 安装 Go 语言环境

md2wechat-skill 是用 Go 写的，需要先安装 Go。

**Windows 安装方式：**

```powershell
# 推荐：使用 winget 安装
winget install --id GoLang.Go --source winget

# 或使用 Chocolatey
choco install golang

# 或从官网下载安装包
# https://go.dev/dl/
```

### **2. 验证安装：**

```bash
go version
# 输出：go version go1.25.5 windows/amd64
```

---

## 二、获取源码并编译

### 1. 克隆或下载项目

```bash
# 进入 skills 目录
cd D:\ObsidianVaul\.claude\skills

# 如果已有项目，跳过；否则克隆
# git clone https://github.com/geekjourneyx/md2wechat-skill.git
```

### 2. 编译二进制文件

```bash
cd md2wechat-skill

# 编译 Windows 版本
go build -o bin/md2wechat-windows-amd64.exe ./cmd/md2wechat

# 或者使用 Makefile（需要 make 命令）
make build
```

**编译成功后会生成：** `bin/md2wechat-windows-amd64.exe`（约 14.8 MB）

文件机构

```
md2wechat-skill/
├── cmd/                    # 命令行工具
│   └── md2wechat/         # 主程序
├── internal/              # 核心功能模块
│   ├── converter/        # 转换器（API/AI）
│   ├── draft/            # 草稿服务
│   ├── image/            # 图片处理
│   ├── wechat/           # 微信 API 封装
│   └── config/           # 配置管理
├── docs/                 # 详细文档
│   ├── USAGE.md          # 使用教程
│   ├── FAQ.md            # 常见问题
│   └── TROUBLESHOOTING.md # 故障排查
├── examples/             # 示例文章
├── scripts/              # 安装脚本
└── bin/                  # 编译好的二进制文件
```



## 三、配置微信 API

### 1. 获取 AppID 和 AppSecret

1. 访问微信开发者平台
2. 登录你的公众号-我的业务与服务-我的业务-公众号
4. 找到 **基础信息** 部分：
   - **AppID**：直接复制
   - **开发密钥---AppSecret**：点击"启用"获取

### 2. 配置 IP 白名单（⚠️ 必做！）

**不配置白名单会报错：** `errcode=40164, invalid ip xxx not in whitelist`

1. 在同一页面找到**开发密钥**-API IP白名单
2. 添加你的公网 IP

**获取公网 IP：**

```bash
curl ifconfig.me
# 或
curl ip.sb
```

添加后等待几分钟生效。

### 3. 初始化配置

```bash
cd D:\ObsidianVaul\.claude\skills\md2wechat-skill

# 初始化配置
.\bin\md2wechat-windows-amd64.exe config init

# 或手动创建配置文件
# 位置：C:\Users\你的用户名\.config\md2wechat\config.yaml
```

**配置文件内容：**

```yaml
wechat:
    appid:        # 你的 AppID
    secret:  # 你的 AppSecret
api:
    convert_mode: ai                # 推荐使用 AI 模式
    default_theme: autumn-warm      # 默认主题
    md2wechat_key: your_md2wechat_api_key  # 可选，API 模式需要
image:
    compress: true
    max_width: 1920
```

**查看配置：**

```bash
.\bin\md2wechat-windows-amd64.exe config show
```



## 四、使用方式

### 方式一：API 模式（需要 API Key）

```bash
# 需要先配置 md2wechat.cn 的 API Key
.\bin\md2wechat-windows-amd64.exe convert article.md --draft --cover cover.jpg
```

**⚠️ 问题：** API Key 需要单独申请，未配置会报 401 错误。

### 方式二：AI 模式（推荐，无需 API Key）

⚠️注意：此模式进在终端起作用，也就是说在终端可以调用md2wechat-skill将mrkdown推送到微信草稿箱，但在Obsidian插件claudian对话框排版实现不了推送到草稿箱。

至于原理可以看这个

https://web.okjike.com/u/24236868-c3e9-49ef-ab93-93a60e1a25db/post/6968f2a89f3cd84f65778ba6

```bash
┌─────────────────────────────────────────────────────────────┐
│                     AI 模式工作流程                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. 你用 Markdown 写文章                                    │
│              ↓                                               │
│   2. md2wechat 提取文章结构                                  │
│              ↓                                               │
│   3. 构建专业的排版提示词 (Prompt)                           │
│              ↓                                               │
│   4. Claude AI 根据提示词生成 HTML                          │
│              ↓                                               │
│   5. 返回符合微信规范的 HTML                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 五、常见问题解决

### Q1: IP 不在白名单

**错误信息：** `errcode=40164, invalid ip xxx not in whitelist`

**解决方法：**

1. 访问**微信开发平台**
2. 设置与开发 → 基本配置 → IP 白名单
3. 添加你的公网 IP（运行 `curl ifconfig.me` 查看）

### Q2: API 认证失败 (401)

**错误信息：** `API returned error code 401: Invalid API Key`

**原因：** 使用 API 模式但未配置 md2wechat.cn API Key

**解决方法：** 改用 AI 模式，配置文件设置 `convert_mode: ai`

### Q3: 图片格式不支持

**错误信息：** `errcode=40113, unsupported file type`

**原因：** 微信只支持 JPG/PNG/GIF，不支持 WebP

**解决方法：**

- 手动转换 WebP 为 JPG
- 或替换 markdown 中的图片链接
- 程序会跳过上传失败的图片继续创建草稿

### Q4: 图片上传后 HTML 中没替换

**原因：** AI 模式生成的 HTML 中图片 URL 需要是微信托管链接

**解决方法：** 等待图片上传完成，程序会自动替换 HTML 中的图片 URL

### Q5: 封面图必须指定

**错误信息：** `创建草稿需要封面图片`

**解决方法：** 使用 `--cover` 参数指定封面图

```bash
--cover /path/to/cover.jpg
```



## 六、在 Claudian 中使用

配置完成后，在 Claudian 中直接调用：

```
帮我把 article.md 转换为微信公众号格式，使用秋日暖光主题
article.md转换为微信公众号格式并上传到草稿箱，封面使用公众号后台素材库的ceshi.png
帮我把当前文件转换为微信公众号格式并上传到草稿箱
把这篇文章转换为微信公众号格式
帮我排版并上传到微信草稿箱
用AI模式和秋日暖光主题转换这篇文章

在Markdown里写 ![](generate: 你的提示词），转换时自动调用豆包 Seedream 模型生成图片。
帮我在文章开头加个产品概念图”，AI 会根据你的文章内容生成合适的提示词，然后插入图片生成语法
```

Claudian 会自动：
1. 调用 md2wechat 获取提示词
2. 使用 Claude AI 生成 HTML
3. 上传图片到微信
4. 推送到草稿箱



## 七、主题推荐

| 主题 | 描述 | 适用场景 |
|------|------|----------|
| autumn-warm | 秋日暖光，温暖橙色调 | 故事、生活、情感类 |
| spring-fresh | 春日清新，自然绿色调 | 旅游、自然、户外 |
| ocean-calm | 海洋宁静，专业蓝色调 | 技术文章、商业分析 |
| default | 默认主题，简洁专业 | 通用内容 |



## 八、文件位置总结

```
项目目录：D:\ObsidianVaul\.claude\skills\md2wechat-skill
二进制文件：bin\md2wechat-windows-amd64.exe
配置文件：C:\Users\你的用户名\.config\md2wechat\config.yaml
```



## 九、快速测试

测试安装是否成功：

```bash
# 进入项目目录
cd D:\ObsidianVaul\.claude\skills\md2wechat-skill

# 创建测试文章
echo "# 测试标题

这是一篇测试文章。" > test.md

# 测试草稿推送（需要封面图）
.\bin\md2wechat-windows-amd64.exe convert \
  --mode ai \
  --html "<div style='padding:20px;'><h1>测试</h1><p>内容</p></div>" \
  --markdown "$(cat test.md)" \
  --draft \
  --cover /path/to/cover.jpg
```

成功后会返回草稿的 media_id 和链接。



## 写在最后

md2wechat-skill 功能强大，但配置确实有点复杂。按照这个教程一步步来，应该能顺利搞定。

**以上，既然看到这里了，如果你觉得内容不错，随手点个赞、在看、转发三连吧！**

如果想第一时间收到推送，可以给我点个星标⭐～

谢谢你看我的文章，我们，下次再见。



**补充：**

- md2wechat 项目地址：https://github.com/geekjourneyx/md2wechat-skill
- 微信开发者平台：https://mp.weixin.qq.com
- Go 语言下载：https://go.dev/dl/
- 大强远程技术支持：[742112.xyz](https://www.742112.xyz/)
