#!/bin/bash

# Set namespace
kubectl create namespace ync

# Initialize Database
cd ync-database

kubectl apply -f ./database.yml --namespace=ync
kubectl --namespace=ync cp superuser.cql cassandra-0:/etc/init.d/superuser.cql
kubectl --namespace=ync exec -it cassandra-0 -- cqlsh --username=cassandra --password=cassandra -f "/etc/init.d/superuser.cql"

cd ..

# Launch APIs
cd ync-api

kubectl apply -f ./shop-api.yml --namespace=ync

cd ..

# Launch Applications
# cd ync-app

# kubectl apply -f ./shop-app.yml --namespace=ync

# cd ..