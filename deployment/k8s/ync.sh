#!/bin/bash

if [ "$1" == "start" ]; then
    if [ "$2" == "database" ]; then
        kubectl apply -f ync-database/storage.yml
        kubectl apply -f ync-database/database.yml

    elif [ "$2" == "api" ]; then
        for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done

    elif [ "$2" == "app" ]; then
        for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done

    else
        for component in `ls ync-database/*.yml`; do kubectl apply -f ${component}; done
        for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done
        for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done
    fi

elif [ "$1" == "resume" ]; then
    kubectl apply -f ync-database/database.yml
    for component in `ls ync-api/*.yml`; do kubectl apply -f ${component}; done
    for component in `ls ync-app/*.yml`; do kubectl apply -f ${component}; done

# @desc: Delete all resources and ync namespace
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
