@echo off
echo ========================================
echo   StreamSight - Starting All Services
echo ========================================

:: Set Kafka path - update this if your Kafka is installed elsewhere
set KAFKA_HOME=C:\kafka

echo.
echo [1/2] Starting Zookeeper...
start "Zookeeper" cmd /k "%KAFKA_HOME%\bin\windows\zookeeper-server-start.bat %KAFKA_HOME%\config\zookeeper.properties"
timeout /t 5 /nobreak >nul

echo [2/2] Starting Kafka...
start "Kafka" cmd /k "%KAFKA_HOME%\bin\windows\kafka-server-start.bat %KAFKA_HOME%\config\server.properties"
timeout /t 8 /nobreak >nul

echo.
echo [3] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath C:\data\db"
timeout /t 4 /nobreak >nul

echo.
echo [4] Starting Event Simulator...
start "Simulator" cmd /k "cd /d %~dp0backend\simulator && pip install -r requirements.txt -q && python simulator.py"

echo.
echo [5] Starting Spark Processor...
start "Spark Processor" cmd /k "cd /d %~dp0backend\spark-processor && pip install -r requirements.txt -q && python processor.py"

echo.
echo [6] Starting Node.js API...
cd backend\api
if not exist .env copy ..\..\env.example .env >nul
start "Node API" cmd /k "cd /d %~dp0backend\api && npm install -q && npm start"
cd ..\..

echo.
echo [7] Starting React Dashboard...
start "React Dashboard" cmd /k "cd /d %~dp0frontend\dashboard && npm install -q && npm run dev"

echo.
echo ========================================
echo   All services starting up!
echo   React Dashboard: http://localhost:5173
echo   Node API:        http://localhost:4000
echo   Plotly Dash:     http://localhost:8050
echo ========================================
echo.
pause
