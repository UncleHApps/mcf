@echo off
echo Stopping MasFreight Command Center...
cd /d "C:\Users\Hendri Coetzer\Desktop\Apps\MasFreight-Dashboard"
docker-compose down
echo.
echo Command Center services have been stopped.
echo.
pause
