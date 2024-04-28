#!/bin/bash

# alias k=kubectl

# Set namespace
kubectl create namespace ync

# Initialize Database
cd ync-database

k apply -f ./storage.yml --namespace=ync
k apply -f ./database.yml --namespace=ync
# Init users and passwords
k --namespace=ync cp superuser.cql cassandra-0:/etc/init.d/superuser.cql
k --namespace=ync exec -it cassandra-0 -- cqlsh --username=cassandra --password=cassandra -f "/etc/init.d/superuser.cql"

cd ..

# Launch APIs
cd ync-api

k apply -f ./shop-api.yml --namespace=ync

cd ..

# Launch Applications
# cd ync-app

# kubectl apply -f ./shop-app.yml --namespace=ync

# cd ..