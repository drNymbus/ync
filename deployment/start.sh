#!/bin/bash

# Launch minikube
minikube start

# Tell minikube to use local docker repository

# In UNIX
eval $(minikube -p minikube docker-env)

# For Powershell versions
minikube -p minikube docker-env --shell powershell | Invoke-Expression # In case an error is thrown, try removing 'minikube -p'

# Run this command in another terminal to be able to access services from localhost
minikube tunnel

# Set namespace
kubectl create namespace ync-app

# Create a volume to contain all the initialization files for the cassandra cluster
kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/ --namespace=ync-app

kubectl apply -f ./ync-database.yml --namespace=ync-app
kubectl apply -f ./ync-api.yml --namespace=ync-app
# Create a service specifically for the node deployment
kubectl expose deployment/node --type=NodePort --port=3000 --namespace=ync-app

# To get access to the service on localhost
minikube service node