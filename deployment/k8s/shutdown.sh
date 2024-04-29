#!/bin/bash

if [ "$1" == "k3s"]; then
    systemctl stop k3s
    /usr/local/bin/k3s-killall.sh
elif [ "$1" == "minikube" ]; then
    ./service.sh delete
    minikube stop
    minikube delete
    docker system prune
fi