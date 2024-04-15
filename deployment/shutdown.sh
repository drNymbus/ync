#!/bin/bash

kubectl delete statefulset cassandra
kubectl delete service cassandra
kubectl delete pod node-api

kubectl delete namespace ync-app
