@echo off
cd /d "%~dp0"
title Blog Publisher

:menu
cls
echo.
echo ====================================================
echo            Blog Publisher - dqtx.cc
echo ====================================================
echo.
echo  [1] Generate YAML Template
echo  [2] Git Commit and Push
echo  [3] Start Preview
echo  [4] Exit
echo.
echo ====================================================
choice /c 1234 /n /m "Select [1-4]: "

if errorlevel 4 goto exit
if errorlevel 3 goto preview
if errorlevel 2 goto gitpush
if errorlevel 1 goto template
goto menu

:template
cls
echo.
echo ==============================================
echo          Generate YAML Template...
echo ==============================================
echo.
cd /d D:\project2026\fuwari
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      Done! Please edit in Typora
echo ==============================================
echo.
pause
goto menu

:gitpush
cls
echo.
echo ==============================================
echo           Git Commit and Push
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo [1/4] Checking file changes...
echo.
git status --short
echo.
if errorlevel 1 (
    echo Warning: No files changed
    echo.
    pause
    goto menu
)

echo [2/4] Preparing commit message...
echo.
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
if %hour% lss 10 set "hour=0%hour%"
set "default_msg=Update blog %year%-%month%-%day% %hour%:%minute%"

set "commit_msg="
set /p "commit_msg=Enter commit message (press Enter for default): "

if not defined commit_msg (
    set "commit_msg=%default_msg%"
)

echo.
echo [3/4] Committing to "%commit_msg%"
echo.
git add .
git commit -m "%commit_msg%"

echo.
echo [4/4] Pushing to remote...
echo.
git push
if errorlevel 1 (
    echo Push failed, retrying...
    git pull --rebase
    git push
)

echo.
echo ==============================================
echo           Done!
echo ==============================================
echo.
pause
goto menu

:preview
cls
echo.
echo ==============================================
echo         Start Local Preview
echo ==============================================
echo.
cd /d D:\project2026\fuwari
echo  Preview: http://localhost:4321
echo  Press Ctrl + C to stop
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

:exit
echo.
echo Bye!
echo.
timeout /t 1 /nobreak >/dev/null
exit
