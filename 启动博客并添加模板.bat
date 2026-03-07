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
choice /c 123 /n /m "请选择操作 (1-3): "

if errorlevel 3 goto exit
if errorlevel 2 goto preview
if errorlevel 1 goto template
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
start http://localhost:4321
npm run dev
goto menu

:exit
echo 再见！
exit
