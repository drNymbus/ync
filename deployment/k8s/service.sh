#!/bin/bash

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then

    # @desc: Create PersistentVolume and StatefulSet to run the database service
    if [ "$2" == "database" ]; then
        # Init service
        kubectl apply -f ync-database/storage.yaml
        kubectl apply -f ync-database/database.yaml
        sleep 60
        kubectl apply -f ync-database/init.yaml

    # @desc: Create all apis
    elif [ "$2" == "api" ]; then
        for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: Create all apps
    elif [ "$2" == "app" ]; then
        for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: If no argument is provided, create all resources: database, apis and apps (in this particular order)
    else
        for component in `ls ync-database/*.yaml`; do kubectl apply -f ${component}; done
        init_cassandra

        for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done
        for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done
    fi

# @desc: Launch Cassandra's StatefulSet then all apis and apps
elif [ "$1" == "resume" ]; then
    kubectl apply -f ync-database/database.yaml
    for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done
    for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done

# @desc: Delete all resources except for the PersistentVolume storage
elif [ "$1" == "stop" ]; then
    for component in `ls ync-app/*.yaml`; do kubectl delete -f ${component}; done
    for component in `ls ync-api/*.yaml`; do kubectl delete -f ${component}; done
    kubectl delete -f ync-database/database.yaml

# @desc: Delete all resources
elif [ "$1" == "delete" ]; then
    for component in `ls ync-app/*.yaml`; do kubectl delete -f ${component}; done
    for component in `ls ync-api/*.yaml`; do kubectl delete -f ${component}; done
    kubectl delete -f ync-database/database.yaml
    kubectl delete -f ync-database/storage.yaml

elif [ "$1" == "status" ]; then
    kubectl get all
fi