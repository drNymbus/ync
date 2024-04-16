#!/bin/bash

kubectl delete -f ./ync-api.yml
kubectl delete -f ./ync-database.yml
kubectl delete -f ./ync-service.yml

kubectl delete namespace ync-app
kubectl config set-context --current --namespace=default
