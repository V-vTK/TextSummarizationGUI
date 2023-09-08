@echo off

setlocal enabledelayedexpansion

rem Change directory to the client folder
cd ..\client

rem Run npm run start in a new command prompt window
echo Running npm run start in client folder...
start cmd /c "npm run start"

rem Wait for a moment to allow the client to start

rem Change directory to the server folder
cd ..\server

rem Install Python dependencies from requirements.txt if not installed
echo Installing Python dependencies from requirements.txt...
pip install --no-cache-dir -r requirements.txt
rem runas /user:Administrator "pip install --no-cache-dir -r requirements.txt"
rem if you are having trouble run as admin

rem Run additional commands for NLTK
echo Running additional commands for NLTK...
python -c "import nltk; nltk.download('punkt')"

rem Change directory back to the Main folder
cd ..

rem Change directory to the usage folder
cd usage

rem Run app.py using Python in a new command prompt window
echo Running app.py in usage folder...
start cmd /k "python ..\server\app.py"

echo To shut down the services, simply close down the terminal windows.

endlocal