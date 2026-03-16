#!/bin/bash

# ============================================
# AUS Maintenance Excel Generator
# Arab Unity School - Academic Year 2025-2026
# ============================================

echo ""
echo "================================================"
echo "  AUS Maintenance System - Excel Generator"
echo "  Arab Unity School"
echo "================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "[ERROR] Python is not installed"
    echo ""
    echo "Please install Python:"
    echo "  - Mac: brew install python3"
    echo "  - Or download from: https://python.org"
    echo ""
    exit 1
fi

# Determine Python command
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
else
    PYTHON_CMD="python"
    PIP_CMD="pip"
fi

echo "[OK] Python is installed ($($PYTHON_CMD --version))"
echo ""

# Check if xlsxwriter is installed
if ! $PYTHON_CMD -c "import xlsxwriter" &> /dev/null; then
    echo "[INFO] xlsxwriter library not found"
    echo "[INFO] Installing xlsxwriter..."
    echo ""
    $PIP_CMD install xlsxwriter
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install xlsxwriter"
        echo "Please run: $PIP_CMD install xlsxwriter manually"
        exit 1
    fi
    echo "[OK] xlsxwriter installed successfully"
    echo ""
fi

echo "[OK] xlsxwriter is installed"
echo ""

# Check if JSON file exists
if [ ! -f "AUS_Maintenance_Data.json" ]; then
    echo "[ERROR] AUS_Maintenance_Data.json not found"
    echo ""
    echo "Please make sure the JSON file is in the same folder as this script"
    echo ""
    exit 1
fi

echo "[OK] Data file found"
echo ""

# Run the Python script
echo "================================================"
echo "  Generating Excel File..."
echo "================================================"
echo ""

$PYTHON_CMD generate_excel_professional.py

if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] Failed to generate Excel file"
    echo "Please check the error messages above"
    exit 1
fi

echo ""
echo "================================================"
echo "  SUCCESS!"
echo "================================================"
echo ""
echo "Excel file created: AUS_Maintenance_Professional.xlsx"
echo "Location: Current folder"
echo ""
echo "You can now:"
echo "  1. Open the Excel file"
echo "  2. Upload to OneDrive"
echo "  3. Share with your team"
echo ""

# Try to open the Excel file (Mac)
if [ "$(uname)" == "Darwin" ]; then
    echo "Opening Excel file..."
    open "AUS_Maintenance_Professional.xlsx" 2>/dev/null || echo "Please open the file manually"
# Try to open the Excel file (Linux)
elif [ "$(uname)" == "Linux" ]; then
    echo "Opening Excel file..."
    xdg-open "AUS_Maintenance_Professional.xlsx" 2>/dev/null || echo "Please open the file manually"
fi

echo ""
echo "================================================"
echo "  Thank you for using AUS Maintenance System!"
echo "================================================"
echo ""
