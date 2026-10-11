---
title: 用 Codex + Blender制作3D网站
published: 2026-10-11
tags:
  - codex
  - blender
  - mcp
  - 3d
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261011160845199.webp
---
最近拿 Codex 配合 Blender，做了一个 3D 网站

[room.dqtx.cc](https://room.dqtx.cc/)

下面这个案例也是利用这种方法来做的, 一个 75 秒内布置房间的小游戏，房间能转、家具能拖，结束后还给分数和回放。

👉 https://chenranning.com/jevsplace

分工很简单：Blender 管建模和场景，Codex 管写网页代码、改材质、调灯光、导出模型。两边能接上，靠的是 Blender 的 MCP。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261011160845199.webp)



## 先装两个东西

1. **Blender**：https://www.blender.org/download/ （免费，装最新版就行）
2. **MCP for Blender**：https://github.com/ahujasid/blender-mcp

只装 Blender 是不够的。Blender 自己不会跟 Codex 说话，得再装一个 MCP，Codex 才调得动它。

## MCP 怎么装

**方式一：一条命令（推荐）**

Windows 打开 PowerShell，粘这段：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://www.mcp-for-blender.com/install.ps1 | iex"
```

它会自动装好 uv，然后扫描你电脑上的 Codex / Cursor / Claude 等客户端，问你要接到哪个，顺手把 Blender 插件也装上并启用。原有配置不会被覆盖，只加一条 `blender`，改动前先存 `.bak` 备份。

**方式二：手动两条命令**

```bash
# 1. 给 Codex 加 MCP
codex mcp add blender -- uvx mcp-for-blender

# 2. 装 Blender 插件
uvx mcp-for-blender install-addon
```

装完打开 Blender，进 **Edit → Preferences → Add-ons**，找到 **Interface: MCP for Blender** 勾上。

## 最后一步

**完全退出 Codex 再重开**（Windows 上要从托盘退出，只关窗口不算）。然后打开 Blender，在 3D 视图按 `N`，能看到 **MCP for Blender** 面板、Server 显示已启动，就通了。

之后可以直接跟 Codex 说：「在场景里放一张桌子，挪到这个位置」，它自己动手。
