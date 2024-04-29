#!/bin/bash

if [ "$1" == "k3s"]; then
    sudo systemctl stop k3s
    sudo /usr/local/bin/k3s-killall.sh
elif [ "$1" == "minikube" ]; then
    sh ./service.sh delete
    minikube stop
    minikube delete
    docker system prune
fi