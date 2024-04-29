#!/bin/bash

if [ "$1" == "docker" ]; then
    docker container stop cassandra_cluster
    docker system prune

elif [ "$1" == "k8s" ]; then
    kubectl delete statefulset cassandra
    kubectl delete pvc --all && kubectl delete pv cassandra-pv
fi