#!/bin/bash

if [ "$1" == "start" ]; then
    docker compose up
elif [ "$1" == "stop" ]; then
    docker compose down
fi