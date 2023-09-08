#!/bin/bash

scriptDir=$(dirname "$0")
composeFile="$scriptDir/../docker-compose.yml"

read -p "Enter 'b' to start the cluster or 'd' to shut it down: " action

if [ "$action" == "b" ]; then
    pushd "$scriptDir/../TextSummarizationGUI/usage"
    docker-compose -f "$composeFile" up -d --build
    popd
elif [ "$action" == "d" ]; then
    pushd "$scriptDir/../TextSummarizationGUI/usage"
    docker-compose -f "$composeFile" down
    popd
else
    echo "Invalid action specified. Please enter 'b' or 'd'."
fi