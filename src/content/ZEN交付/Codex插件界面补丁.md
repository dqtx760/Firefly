## Codex Plugin Unlocker 安装

> 项目地址：https://github.com/galaxywk223/codex-plugin-unlocker
> 本地路径：`C:\Users\Administrator\Documents\Codex\2026-06-08\codex-deepseek\codex-plugin-unlocker`
> 安装日期：2026-06-08
> Codex 版本：`26.601.2237.0`

### 这是什么

Codex 在 API Key 模式下会隐藏插件侧边栏入口和安装按钮。这个工具通过 Chrome DevTools Protocol 启动 Codex，往渲染进程注入一段 JS 补丁，把这些被隐藏的 UI 重新打开。

**它不修改 Codex 安装文件，不改数据库，不常驻后台。**

### 安装步骤

官方 `install.ps1` 脚本在中文 Windows 上有编码问题（中文报错信息乱码导致 PowerShell 解析失败）。以下是手动安装步骤，已验证可用。

**前置条件**：Python 3.11+ 和 Node.js（仅用于 JS 语法检查，可跳过）

```powershell
# 1. 进入项目目录
cd "C:\Users\Administrator\Documents\Codex\2026-06-08\codex-deepseek\codex-plugin-unlocker"

# 2. 创建虚拟环境
python -m venv .venv

# 3. 升级 pip
.\.venv\Scripts\python.exe -m pip install --upgrade pip setuptools wheel

# 4. 安装依赖（用阿里云镜像，直连 pypi.org 可能 SSL 失败）
.\.venv\Scripts\python.exe -m pip install -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com --no-build-isolation -e ".[test]"

# 5. 创建桌面快捷方式
.\.venv\Scripts\python.exe -m codex_plugin_unlocker install-shortcut
```

完成后桌面上会出现 `Codex Plugin Unlocker.lnk`。

### 使用方式

1. **关闭**普通方式打开的 Codex 窗口
2. **双击桌面快捷方式** `Codex Plugin Unlocker.lnk`
3. 等待 Codex 主界面加载完成，侧边栏插件入口即可用

命令行方式（不依赖快捷方式）：

```powershell
cd "C:\Users\Administrator\Documents\Codex\2026-06-08\codex-deepseek\codex-plugin-unlocker"
.\.venv\Scripts\python.exe -m codex_plugin_unlocker launch
```

### 原理简述

启动时给 Codex 加了两个 Chrome 参数：

```
--remote-debugging-port=9229
--remote-allow-origins=http://127.0.0.1:9229
```

然后通过 CDP 协议注入 `inject/plugin-unlock.js`，脚本做了两件事：
- **启用插件入口**：找到侧边栏插件按钮，把 `authMethod` 伪装成 `chatgpt`，去掉 `disabled` 属性
- **解锁安装按钮**：找到被禁用的安装按钮，去掉禁用状态，标签改为"强制安装"

### 局限性

**前端补丁，不绕过后端权限。** 以下插件即使前端按钮亮了，实际调用时仍然会因 API Key 模式缺乏权限而失败：

- **ComputerUse**：需要 ChatGPT Pro/Team/Enterprise 订阅权限
- 其他依赖 OpenAI 后端授权的插件同理

插件安装按钮亮了但调用报错，说明是后端拦截，前端解锁器无能为力。

### 故障排查

**启动报错"Codex is already running"**

关掉所有 Codex 窗口（包括系统托盘），再通过快捷方式启动。

**插件按钮还是灰的**

Codex 更新后 DOM 结构可能变了，注入脚本的选择器没匹配到。打开 Codex 后浏览器访问 `http://127.0.0.1:9229`，在 Console 执行：

```javascript
window.__codexPluginUnlockerLastError
```

看报错定位具体问题。

**pip 安装依赖 SSL 失败**

网络环境间歇性 SSL 握手失败，换阿里云镜像：

```powershell
.\.venv\Scripts\python.exe -m pip install -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com <包名>
```

### 相关链接

- [Codex Plugin Unlocker](https://github.com/galaxywk223/codex-plugin-unlocker)
- [Codex App 离线安装教程](https://mp.weixin.qq.com/s/M3dI9GZp1no0DAMYholprw)
- [Codex App 接入国产模型 API](https://mp.weixin.qq.com/s/7e5XpRE8pg5JX6cVeCKetQ)
