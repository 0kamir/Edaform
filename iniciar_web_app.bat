@echo off
title Servidor Web Calicatas USDA
echo =======================================================
echo   Iniciando Servidor Web Multiplataforma de Calicatas
echo =======================================================
echo.
cd /d "%~dp0"

:: Verificar si python está disponible
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python no esta instalado o no se encuentra en el PATH.
    pause
    exit /b 1
)

python start_web_app.py
pause
