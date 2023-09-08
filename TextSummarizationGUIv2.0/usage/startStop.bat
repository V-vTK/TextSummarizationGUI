@echo off

set scriptDir=%~dp0
set composeFile=%scriptDir%..\docker-compose.yml

set /p action=Enter 'start' to start the cluster or 'stop' to shut it down: 

if "%action%"=="start" (
    pushd "%scriptDir%..\TextSummarizationGUI"
    docker-compose -f "%composeFile%" up -d
    start "" "http://localhost:5000"
    start "" "http://localhost:3000"
    popd
) else if "%action%"=="stop" (
    pushd "%scriptDir%..\TextSummarizationGUI"
    docker-compose -f "%composeFile%" down
    popd
) else (
    echo Invalid action specified. Please enter 'start' or 'stop'.
)