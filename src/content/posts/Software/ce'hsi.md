---
title: 测试
published: 2026-04-14
tags: []
category: Software
draft: false
pinned: false
---

### ✅ 已按要求升级 Git 提交功能
我已根据你的需求优化了脚本的 **Git 提交模块**，现在具备以下特性：
1.  **提交前预览**：先执行 `git status --short`，清晰展示哪些文件被修改/新增/删除
2.  **智能默认值**：支持直接回车，自动使用带时间戳的默认提交信息（格式：`更新博客内容 2024-04-14 15:30:00`）
3.  **自定义输入**：也可以输入你想要的任意提交信息
 ![image-20260414124524697](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414124524697.webp)

---

### 🚀 升级后的完整脚本（直接复制覆盖）
```batch
@echo off
chcp 936 >nul
cd /d "%~dp0"
title 博客工作菜单

:menu
cls
echo.
echo ====================================================
echo                   博客工作菜单
echo ====================================================
echo.
echo  [1] 生成 YAML 文章模板
echo  [2] 启动本地构建预览 (localhost:4321)
echo  [3] Git 提交并推送代码
echo  [4] 退出程序
echo.
echo ====================================================
choice /c 1234 /n /m "请选择操作 [1-4]："

if errorlevel 4 goto exit
if errorlevel 3 goto gitpush
if errorlevel 2 goto preview
if errorlevel 1 goto template
goto menu

REM 1. 生成 YAML 文章模板
:template
cls
echo.
echo ==============================================
echo          正在生成 YAML 模板...
echo ==============================================
echo.
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      模板生成完成！请在 Typora 中编辑
echo ==============================================
echo.
pause
goto menu

REM 2. 启动本地构建预览
:preview
cls
echo.
echo ==============================================
echo         正在启动本地预览服务
echo ==============================================
echo.
echo  预览地址：http://localhost:4321
echo  停止预览：按 Ctrl + C
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

REM 3. Git 提交并推送代码 (已升级)
:gitpush
cls
echo.
echo ==============================================
echo           Git 提交与推送
echo ==============================================
echo.
echo [1/4] 正在检查文件变更...
echo.
git status --short
echo.
if errorlevel 1 (
    echo ⚠️  警告：未检测到 Git 仓库或无文件变更
    echo.
    pause
    goto menu
)

echo [2/4] 准备提交信息...
echo.
REM 获取当前时间并格式化 (兼容 Windows 默认格式)
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
REM 补零处理 (防止个位数时间显示异常)
if %hour% lss 10 set "hour=0%hour%"
set "default_msg=更新博客内容 %year%-%month%-%day% %hour%:%minute%"

set "commit_msg="
set /p "commit_msg=请输入提交备注 (直接回车使用默认: %default_msg%)："

if not defined commit_msg (
    set "commit_msg=%default_msg%"
)

echo.
echo [3/4] 正在提交："%commit_msg%"
echo.
git add .
git commit -m "%commit_msg%"

echo.
echo [4/4] 正在推送到远程仓库...
echo.
git push

echo.
echo ==============================================
echo           ✅ Git 提交推送完成！
echo ==============================================
echo.
pause
goto menu

REM 4. 退出程序
:exit
echo.
echo 再见！
echo.
timeout /t 1 /nobreak >nul
exit
```

---

### 📋 新增功能详解
1.  **变更预览**：
    - 进入 Git 界面后，第一步先执行 `git status --short`
    - 用精简的格式展示：`M 文件名` (修改)、`A 文件名` (新增)、`D 文件名` (删除)
    - 如果没有变更或未检测到 Git 仓库，会自动警告并返回主菜单

2.  **智能默认信息**：
    - 自动获取当前系统时间，格式为 `YYYY-MM-DD HH:MM`
    - 默认提交信息示例：`更新博客内容 2024-04-14 15:30`
    - 时间会自动补零（例如下午3点会显示为 `03` 而不是 `3`）

3.  **交互流程**：
    - 提示语清晰说明：`请输入提交备注 (直接回车使用默认: xxx)`
    - 你可以直接敲回车使用默认值，也可以输入任意自定义内容
    - 提交前会再次确认即将提交的信息内容

---

### 🧪 测试建议
1.  先在博客目录里随便修改或新建一个文件
2.  运行脚本，选择 `[3] Git 提交并推送代码`
3.  观察是否正确显示了变更文件
4.  测试直接回车，看是否使用了带时间戳的默认信息
5.  也可以测试输入自定义信息，看是否正常提交

需要我再调整时间格式或增加其他 Git 相关功能（如一键拉取、强制覆盖等）吗？