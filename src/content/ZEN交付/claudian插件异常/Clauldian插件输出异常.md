```
背景：我在 Obsidian 使用 Claudian 插件，配置文件是 .claudian/claudian-settings.json。选择 Claude 或 Codex 时出现异常，怀疑是配置文件里的 CLI 路径或模型名错误。

请帮我检查并修复 claudian-settings.json：

1. Claude 报错 spawn EINVAL
原因通常是 Claude CLI 路径填错了。
如果我是 npm 安装的 Claude Code，请把：
providerConfigs.claude.cliPath
providerConfigs.claude.cliPathsByHost
修正为 npm 包内真实 exe 路径，例如：
C:\Users\<用户名>\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe

不要使用：
C:\Users\<用户名>\AppData\Roaming\npm\claude.cmd
也不要使用：
C:\Users\<用户名>\AppData\Roaming\npm\claude.exe

2. Codex 报错模型不支持，例如 Not supported model gpt-5.5
请检查并修复：
savedProviderModel.codex
providerConfigs.codex.cliPath
providerConfigs.codex.cliPathsByHost

把 savedProviderModel.codex 从不支持的模型名改成实际可用模型，例如 gpt-5 或我的 API 支持的模型名。
同时确认 providerConfigs.codex.enabled 为 true。

我的 Claudian 配置目录是：
<粘贴 .claudian 文件夹路径>

报错信息是：
<粘贴截图或文字>
```

### 注意

1. Codex CLI path
示例2：

```
C:\Users\Administrator\AppData\Local\Programs\Codex\resources\codex.exe
```

> 说明：这个路径有点特殊，是指的想Codex安装文件夹下根目录文件resources下面的Codex.exe

2.Custom models注意小些

```
 gpt-5.6-luna
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Obsidian_zI2VomRB8p.webp)
