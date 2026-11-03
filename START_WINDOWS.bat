@echo off
setlocal
cd /d "%~dp0"
rem Prefer Python 3.12 even when a newer incompatible runtime is the default.
py -3.12 --version >nul 2>&1
if not errorlevel 1 (
  set "PY=py -3.12"
) else (
  set "PY=python"
)
%PY% --version
%PY% -m pip install -r requirements.txt
if errorlevel 1 (echo Could not install Python dependencies & pause & exit /b 1)
echo Open http://localhost:8000 in your browser
%PY% app.py
pause
