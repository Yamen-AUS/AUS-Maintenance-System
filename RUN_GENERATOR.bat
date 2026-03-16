@echo off
REM ============================================
REM AUS Maintenance Excel Generator
REM Arab Unity School - Academic Year 2025-2026
REM ============================================

echo.
echo ================================================
echo   AUS Maintenance System - Excel Generator
echo   Arab Unity School
echo ================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo.
    echo Please install Python from: https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo [OK] Python is installed
echo.

REM Check if xlsxwriter is installed
python -c "import xlsxwriter" >nul 2>&1
if errorlevel 1 (
    echo [INFO] xlsxwriter library not found
    echo [INFO] Installing xlsxwriter...
    echo.
    pip install xlsxwriter
    if errorlevel 1 (
        echo [ERROR] Failed to install xlsxwriter
        echo Please run: pip install xlsxwriter manually
        pause
        exit /b 1
    )
    echo [OK] xlsxwriter installed successfully
    echo.
)

echo [OK] xlsxwriter is installed
echo.

REM Check if JSON file exists
if not exist "AUS_Maintenance_Data.json" (
    echo [ERROR] AUS_Maintenance_Data.json not found
    echo.
    echo Please make sure the JSON file is in the same folder as this script
    echo.
    pause
    exit /b 1
)

echo [OK] Data file found
echo.

REM Run the Python script
echo ================================================
echo   Generating Excel File...
echo ================================================
echo.

python generate_excel_professional.py

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to generate Excel file
    echo Please check the error messages above
    pause
    exit /b 1
)

echo.
echo ================================================
echo   SUCCESS!
echo ================================================
echo.
echo Excel file created: AUS_Maintenance_Professional.xlsx
echo Location: Current folder
echo.
echo You can now:
echo   1. Open the Excel file
echo   2. Upload to OneDrive
echo   3. Share with your team
echo.
echo Press any key to open the Excel file...
pause >nul

REM Try to open the Excel file
if exist "AUS_Maintenance_Professional.xlsx" (
    start "" "AUS_Maintenance_Professional.xlsx"
)

echo.
echo ================================================
echo   Thank you for using AUS Maintenance System!
echo ================================================
echo.
pause
