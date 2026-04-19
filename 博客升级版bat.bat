@echo off
chcp 936 >nul
cd /d "%~dp0"
title 博客工作菜单

:menu
cls
echo.
echo ====================================================
echo            大强博客「dqtx.cc」工作流菜单
echo ====================================================
echo.
echo  [1] 移动文章并打开封面生成
echo  [2] 生成文章YAML 模板
echo  [3] 启动本地构建预览
echo  [4] Git 提交并推送代码
echo  [5] 退出程序
echo.
echo ====================================================
choice /c 12345 /n /m "请选择操作 [1-5]："

if errorlevel 5 goto exit
if errorlevel 4 goto gitpush
if errorlevel 3 goto preview
if errorlevel 2 goto template
if errorlevel 1 goto move_and_cover
goto menu

REM 1. 移动文章并打开封面生成
:move_and_cover
cls
echo.
echo ==============================================
echo      正在移动文章并准备封面生成...
echo ==============================================
echo.

set "source=D:\project2026\zhishiku\03_Output"
set "dest=D:\project2026\fuwari\src\content\posts"
set "gemini_url=https://gemini.google.com/gem/1Aj6WWk5xdZb8af0pNSF5yvMatOakGmHd?usp=sharing"

set moved=0
set already=0
set skipped=0

for %%f in ("%source%\*.md") do (
    if /i not "%%~nf"=="OUTPUT_RULES" (
        if exist "%dest%\%%~nxf" (
            echo 已存在: %%~nxf
            move /y "%%f" "%dest%\" >nul 2>&1
            set /a already+=1
        ) else (
            echo 移动: %%~nxf
            move /y "%%f" "%dest%\" >nul 2>&1
            if !errorlevel! equ 0 (
                echo 正在复制内容到剪贴板...
                
                powershell -Command "$content = Get-Content '%dest%\%%~nxf' -Raw -Encoding UTF8; $start = $content.IndexOf('---', 12); if($start -gt 0){$content = $content.Substring($start+3)}; $content = $content.Substring(0, [Math]::Min(5000, $content.Length)); Set-Clipboard -Value $content; Write-Host '已复制'"
                
                echo 正在打开 Gemini 生图网址...
                start "" "%gemini_url%"
                
                set /a moved+=1
            )
        )
    ) else (
        echo 跳过: %%~nxf
        set /a skipped+=1
    )
)

echo.
echo 完成！新文章 %moved% 个，已处理 %already% 个，跳过 %skipped% 个
echo.
pause
goto menu

REM 2. 生成 YAML 文章模板
:template
cls
echo.
echo ==============================================
echo          正在生成 YAML 模板...
echo ==============================================
echo.
cd /d D:\project2026\fuwari
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      模板生成完成！请在 Typora 中编辑
echo ==============================================
echo.
pause
goto menu

REM 3. 启动本地构建预览
:preview
cls
echo.
echo ==============================================
echo         正在启动本地预览服务
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo  预览地址：http://localhost:4321
echo  停止预览：按 Ctrl + C
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

REM 4. Git 提交并推送代码
:gitpush
cls
echo.
echo ==============================================
echo           Git 提交与推送
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo [1/4] 正在检查文件变更...
echo.
git status --short
echo.
if errorlevel 1 (
    echo ??  警告：未检测到 Git 仓库或无文件变更
    echo.
    pause
    goto menu
)

echo [2/4] 准备提交信息...
echo.
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
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
if errorlevel 1 (
    echo 推送被拒绝，正在拉取远程更改...
    git pull --rebase
    git push
)

echo.
echo ==============================================
echo           ? Git 提交推送完成！
echo ==============================================
echo.
pause
goto menu

REM 5. 退出程序
:exit
echo.
echo 再见！
echo.
timeout /t 1 /nobreak >nul
exit