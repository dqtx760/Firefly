---
title: MiMo Code 2.5 限免中
published: 2026-06-11
tags:
  - MiMo
  - 安装踩坑
  - 小米
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260611143527424.webp
---
小米的 MiMo Code 2.5 目前 **限时免费** 中，开启 MiMo Auto 模式就能零配置匿名使用，不需要绑 API Key，适合尝鲜。

项目地址：
https://github.com/XiaomiMiMo/MiMo-Code

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260611143527424.webp)

### 安装方式

两种方法：

```bash
# 一键脚本
curl -fsSL https://mimo.xiaomi.com/install | bash

# 或 npm 全局安装
npm install -g @mimo-ai/cli
```

### 装完启动报错

如果你在 Windows 上通过 npm 安装，装完敲 `mimo` 大概率会看到这个：

```
It seems that your package manager failed to install the right version
of the mimocode CLI for your platform.
```

原因很简单：`@mimo-ai/cli@0.1.0` 依赖 `@mimo-ai/mimocode-windows-x64@0.1.0`，但这个 Windows 原生包在 npm 上只有 `0.1.0-preview.1` 版本，正式版根本没发布。

因为是 optionalDependencies，npm 安装时静默失败，不会报错，但二进制文件没装上去，启动就跪了。

### 解决方法

卸载正式版，安装版本匹配的 preview 版：

```bash
npm uninstall -g @mimo-ai/cli
npm install -g @mimo-ai/cli@0.1.0-preview.1
```

装完再敲 `mimo` 就能正常启动了。

### 总结

这种问题在 CLI 工具里不算少见 —— 多平台发布时版本号没对齐。遇到类似报错，先看看 native 依赖包的版本是否存在，通常降级或升级到对应的 preview 版就能解决。

如需远程协助，可通过向日葵或 ToDesk 远程处理。加**维信dqtx33**  
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/0beb8bef640f4e87d2d2cdc56be71bfa.webp)