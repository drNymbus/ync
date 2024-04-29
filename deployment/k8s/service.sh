#!/bin/bash

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then

    # @desc: Create PersistentVolume and StatefulSet to run the database service
    if [ "$2" == "database" ]; then
        kubectl apply -f ync-database/storage.yml
        kubectl apply -f ync-database/database.yml

    # @desc: Create all apis
    elif [ "$2" == "api" ]; then
        for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done

    # @desc: Create all apps
    elif [ "$2" == "app" ]; then
        for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done

    # @desc: If no argument is provided, create all resources: database, apis and apps (in this particular order)
    else
        for component in `ls ync-database/*.yml`; do kubectl apply -f ${component}; done
        for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done
        for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done
    fi

# @desc: Launch Cassandra's StatefulSet then all apis and apps
elif [ "$1" == "resume" ]; then
    kubectl apply -f ync-database/database.yml
    for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done
    for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done

# @desc: Delete all resources
elif [ "$1" == "delete" ]; then
    for component in `ls ync-app/*.yml`; do kubectl delete -f ${component}; done
    for component in `ls ync-api/*.yml`; do kubectl delete -f ${component}; done
    kubectl delete -f ync-database/database.yml
    kubectl delete pvc --all &
    kubectl delete -f ync-database/storage.yml &

# @desc: Delete all resources except for the PersistentVolume storage
elif [ "$1" == "stop" ]; then
    for component in `ls ync-app/*.yml`; do kubectl delete -f ${component}; done
    for component in `ls ync-api/*.yml`; do kubectl delete -f ${component}; done
    for component in `ls ync-database/database.yml`; do kubectl delete -f ${component}; done

elif [ "$1" == "status" ]; then
    kubectl get all
fi