#!/bin/bash

kubectl delete -f ./ync-shop-api.yml
kubectl delete -f ./ync-database.yml
kubectl delete -f ./ync-shop-app.yml

kubectl delete namespace ync-app
