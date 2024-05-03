#!/bin/bash

if [ "$1" == "k3s" ]; then
    systemctl start k3s
elif [ "$1" == "minikube" ]; then
    minikube start
    eval $(minikube -p  minikube docker-env)
    minikube tunnel
fi