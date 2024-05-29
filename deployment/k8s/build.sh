#!/usr/bin/bash

cd ../..

if [[ "$1" == "all" || "$1" == "db" ]]; then
    # Build Database images
    cd ync-database
    for cmp in `ls -d */`; do
        # Build image and register it to k3s
        docker build -t ${cmp::-1} ${cmp}
        if [ "$2" == "k3s" ]; then
            docker save ${cmp::-1}:latest | k3s ctr images import -;
        fi
    done
    cd ..
fi

if [[ "$1" == "all" || "$1" == "api" ]]; then
    # Build API images
    cd ync-api
    for api in `ls -d */`; do
        # Build image and register it to k3s
        docker build -t ${api::-1} ${api}
        if [ "$2" == "k3s" ]; then
            docker save ${api::-1}:latest | k3s ctr images import -;
        fi
    done
    cd ..
fi

if [[ "$1" == "all" || "$1" == "app" ]]; then
    # Build Application images
    cd ync-app
    for app in `ls -d */`; do
        docker build -t ${app::-1} ${app}
        if [ "$2" == "k3s" ]; then
            docker save ${app::-1}:latest | k3s ctr images import -;
        fi
    done
    cd ..
fi