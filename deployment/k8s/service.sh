#!/bin/bash

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then
    # Generate keys/secrets for apis and apps to run properly
    kubectl apply -f ync-database/storage.yaml
    kubectl apply -f ync-database/database.yaml

    kubectl apply -f inspector.yaml

    kubectl apply -f ync-database/job/admin.yaml
    kubectl apply -f ync-database/job/keyspace.yaml

    for component in ./*.yaml; do kubectl apply -f ${component}; done
    for component in ./*.yaml; do kubectl apply -f ${component}; done

# @desc: Delete all resources
elif [ "$1" == "delete" ]; then
    for component in ./ync-app/*.yaml; do kubectl delete -f ${component}; done
    for component in ./ync-api/*.yaml; do kubectl delete -f ${component}; done

    kubectl delete -f ync-database/job/keyspace.yaml
    kubectl delete -f ync-database/job/admin.yaml

    kubectl delete -f ync-database/database.yaml

    kubectl exec -it inspector -- rm -r /pvc/*
    kubectl delete -f inspector.yaml

    kubectl delete -f ync-database/storage.yaml
    # Delete all keys/secrets

elif [ "$1" == "status" ]; then
    kubectl get all

fi