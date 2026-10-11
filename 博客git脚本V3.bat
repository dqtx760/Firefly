@echo off
chcp 936 >nul
cd /d "%~dp0"
title 博客发布助手

:menu
cls
echo.
echo ====================================================
echo              博客发布助手 - dqtx.cc
echo ====================================================
echo.
echo  [1] 生成 YAML 模板
echo  [2] Git 提交并推送
echo  [3] 启动本地开发预览
echo  [4] 退出
echo.
echo ====================================================
choice /c 1234 /n /m "请选择 [1-4]："

if errorlevel 4 goto exit
if errorlevel 3 goto preview
if errorlevel 2 goto gitpush
if errorlevel 1 goto template
goto menu

:template
cls
echo.
echo ==============================================
echo              正在生成 YAML 模板...
echo ==============================================
echo.
cd /d D:\project2026\fuwari
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo          生成完成！请在 Typora 中编辑
echo ==============================================
echo.
pause
goto menu

:gitpush
cls
echo.
echo ==============================================
echo               Git 提交并推送
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo [1/4] 正在检查文件改动...
echo.
git status --short
echo.
if errorlevel 1 (
    echo 提示：没有检测到文件改动
    echo.
    pause
    goto menu
)

echo [2/4] 正在准备提交信息...
echo.
rem 中文系统下 %date% 带星期前缀，按分隔符取字段会取错，改用 PowerShell 取时间
for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"`) do set "default_msg=更新博客 %%i"

set "commit_msg="
set /p "commit_msg=请输入提交信息（直接按回车使用默认信息）："

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
if errorlevel 1 (
    echo 推送失败，正在拉取更新后重试...
    git pull --rebase
    git push
)

echo.
echo ==============================================
echo               操作完成！
echo ==============================================
echo.
pause
goto menu

:preview
cls
echo.
echo ==============================================
echo             启动本地开发预览
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo  预览地址：http://localhost:4321
echo  修改文件后网页会实时更新
echo  按 Ctrl + C 停止开发服务
echo.
rem --open 让 astro 在服务就绪后再开浏览器（先开浏览器会看到“无法访问”）
npm run dev -- --open
echo.
pause
goto menu

:exit
echo.
echo 已退出！
echo.
exit /b 0
