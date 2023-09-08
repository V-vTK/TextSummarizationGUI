#!/bin/bash

cd "$(dirname "$0")"

read -p "Enter 'start' to start the cluster or 'stop' to shut it down: " action

if [ "$action" = "start" ]; then
    docker-compose -f ../docker-compose.yml up -d
    xdg-open http://localhost:5000
    xdg-open http://localhost:3000
elif [ "$action" = "stop" ]; then
    docker-compose -f ../docker-compose.yml down
else
    echo "Invalid action specified. Please enter 'start' or 'stop'."
fi