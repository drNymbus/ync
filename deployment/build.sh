#!/usr/bin/bash

if [[ "$1" == "cert" ]]; then
    docker build -t ync-cert-delivery "../cert-delivery/."
    if [ "$2" == "k3s" ]; then
        docker save ync-cert-delivery:latest | k3s ctr images import -;
    fi
fi

if [[ "$1" == "all" || "$1" == "db" ]]; then
    # Build Database images
    for cmp in ../ync-database/*/; do
        echo "${cmp}" $(basename ${cmp})
        # Build image and register it to k3s
        docker build -t $(basename ${cmp}) "${cmp}/."
        if [ "$2" == "k3s" ]; then
            docker save $(basename ${cmp}):latest | k3s ctr images import -;
        fi
    done
fi

if [[ "$1" == "all" || "$1" == "api" ]]; then
    # Build API images
    for api in ../ync-api/*/; do
        echo "${api}" $(basename ${api})
        # Build image and register it to k3s
        docker build -t $(basename ${api}) "${api}/."
        if [ "$2" == "k3s" ]; then
            docker save $(basename ${api}):latest | k3s ctr images import -;
        fi
    done
fi

if [[ "$1" == "all" || "$1" == "app" ]]; then
    # Build Application images
    for app in ../ync-app/*/; do
        echo "${app}" $(basename ${app})
        # Build image and register it to k3s
        docker build -t $(basename ${app}) "${app}/."
        if [ "$2" == "k3s" ]; then
            docker save $(basename ${app}):latest | k3s ctr images import -;
        fi
    done
fi