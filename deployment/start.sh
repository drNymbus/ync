#!/bin/bash

# Set namespace
kubectl create namespace ync-app
kubectl config set-context --current --namespace=ync-app

# # Create a volume to contain all the initialization files for the cassandra cluster
kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/

kubectl apply -f ./ync-service.yml # Create service to expose cassandra cluster's ports
kubectl apply -f ./ync-database.yml # Launch the cassandra cluster
kubectl apply -f ./ync-node-app.yml # Launch the node API
