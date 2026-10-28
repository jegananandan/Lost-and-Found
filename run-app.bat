@echo off
title Campus Lost & Found System - Application Server
color 0A

echo =====================================================================
echo       CAMPUS LOST ^& FOUND - OFFICIAL COLLEGE PORTAL
echo =====================================================================
echo.
echo [1/3] Verifying Java Environment...
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in your system PATH!
    echo Please install Java JDK 17 or higher from https://adoptium.net/
    echo.
    pause
    exit /b 1
)

java -version
echo.
echo [2/3] Checking persistent database storage...
if not exist "backend\data" (
    mkdir "backend\data"
    echo Created local persistent database storage directory: backend\data\
) else (
    echo Local persistent database found in: backend\data\
)

echo.
echo [3/3] Starting Unified Application Server (Backend API + React UI)...
echo.
echo The application will be accessible at:
echo    ==^> http://localhost:8080
echo.
echo Demo Login Credentials:
echo    Student : student@college.edu  / student123
echo    Admin 1 : jegan@gmail.com      / jegan123
echo    Admin 2 : nandha@gmail.com     / Nandha@2007
echo.
echo =====================================================================
echo Press CTRL+C at any time in this window to stop the server.
echo =====================================================================
echo.

cd backend
call .\mvnw.cmd spring-boot:run
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Application stopped with an error code.
    pause
)
