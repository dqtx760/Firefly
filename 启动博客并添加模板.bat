@echo off
chcp 65001 >nul
cd /d "%~dp0"

:menu
cls
echo ========================================
echo        博客工作菜单
echo ========================================
echo.
echo [1] 生成 YAML 模板
echo [2] 启动构建预览
echo [3] 退出
echo.
echo ========================================
set /p choice="请选择操作 (1-3): "

if "%choice%"=="1" goto template
if "%choice%"=="2" goto preview
if "%choice%"=="3" goto exit
goto menu

:template
cls
echo ========================================
echo       正在生成 YAML 模板...
echo ========================================
echo.
node scripts/add-frontmatter.cjs
echo.
echo ========================================
echo 模板已生成！请在 Typora 中填写标题。
echo ========================================
echo.
pause
goto menu

:preview
cls
echo ========================================
echo     正在启动构建预览...
echo ========================================
echo.
echo 预览地址: http://localhost:4321
echo 按 Ctrl+C 可停止预览
echo.
npm run dev
goto menu

:exit
echo 再见！
exit
