#!/bin/bash

# Set namespace
kubectl create namespace ync-app

# Create a volume to contain all the initialization files for the cassandra cluster
kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/ --namespace=ync-app

kubectl apply -f ./ync-database.yml --namespace=ync-app
kubectl apply -f ./ync-api.yml --namespace=ync-app
# Create a service specifically for the node deployment
kubectl expose deployment/node --type=NodePort --port=3000 --namespace=ync-app
