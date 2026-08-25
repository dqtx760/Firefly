# opencli-plugin-dqtx-blog

把大强博客 `https://blog.dqtx.cc` 接入 OpenCLI，当前只提供公开只读命令，不读取本地草稿，也不包含后台发布或修改权限。

## 本机安装

在这个目录的父目录执行：

```powershell
opencli plugin install file://D:\project2026\fuwari\opencli-plugin-dqtx-blog
```

验证命令是否注册：

```powershell
opencli list | Select-String dqtx
```

## 命令

```powershell
opencli dqtx latest --limit 5
opencli dqtx search OpenCLI
opencli dqtx article opencli
```

`latest` 和 `search` 从公开归档页读取文章索引；`article` 从公开文章页读取正文。文章参数也可以使用 `/posts/.../` 路径或完整的 `https://blog.dqtx.cc/posts/.../` URL。

## 发布给其他人

把这个目录单独发布成 GitHub 仓库后，其他 OpenCLI 用户可以安装：

```powershell
opencli plugin install github:你的账号/opencli-plugin-dqtx-blog
```
