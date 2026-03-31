@echo off
echo Starting MasFreight Command Center...
cd /d "C:\Users\Hendri Coetzer\Desktop\Apps\MasFreight-Dashboard"
docker-compose up -d
echo.
echo PocketBase is starting up. 
echo - Admin UI: http://localhost:80/_/
echo - API URL: http://localhost:80
echo.
pause
