@echo off

set scriptDir=%~dp0
set composeFile=%scriptDir%..\docker-compose.yml

set /p action=Enter 'b' to start the cluster or 'd' to shut it down: 

if "%action%"=="b" (
    pushd "%scriptDir%..\TextSummarizationGUI\usage"
    docker-compose -f "%composeFile%" up -d --build
    popd
) else if "%action%"=="d" (
    pushd "%scriptDir%..\TextSummarizationGUI\usage"
    docker-compose -f "%composeFile%" down
    popd
) else (
    echo Invalid action specified. Please enter 'b' or 'd'.
)