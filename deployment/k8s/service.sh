#!/bin/bash

# Wait for a job to be complete
function job_status_check() {
    while true; do
        STATUS = $(kubectl get job "$1" -o=jsonpath='{.status.conditions[?(@.type=="Complete")].type}')
        if [ $STATUS == "Complete" ]; then break; fi
    done
}

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then

    # @desc: Create PersistentVolume and StatefulSet to run the database service
    if [ "$2" == "database" ]; then
        kubectl apply -f ync-database/storage.yaml
        kubectl apply -f ync-database/database.yaml
        sleep 90 # Sleep until database is fully initialized and operational

        kubectl apply -f ync-database/job/admin.yaml
        job_status_check "ync-init-admin" > /dev/k8s-job/job-admin.log
        kubectl apply -f ync-database/job/keyspace.yaml
        job_status_check "ync-init-keyspace" > /dev/k8s-job/job-keyspace.log

    # @desc: Create all apis
    elif [ "$2" == "api" ]; then
        for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: Create all apps
    elif [ "$2" == "app" ]; then
        for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: If no argument is provided, create all resources: database, apis and apps (in this particular order)
    else
        kubectl apply -f ync-database/storage.yaml
        kubectl apply -f ync-database/database.yaml
        sleep 90 # Sleep until database is fully initialized and operational

        kubectl apply -f ync-database/job/admin.yaml
        job_status_check "ync-init-admin" > /dev/k8s-job/job-admin.log
        kubectl delete -f ync-database/job/admin.yaml

        kubectl apply -f ync-database/job/keyspace.yaml
        job_status_check "ync-init-keyspace" > /dev/k8s-job/job-keyspace.log
        kubectl delete -f ync-database/job/keyspace.yaml

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
    kubectl delete -f ync-database/job/keyspace.yaml
    kubectl delete -f ync-database/job/admin.yaml
    kubectl delete -f ync-database/database.yaml

    kubectl apply -f ync-database/inspector.yaml
    sleep 5
    kubectl exec -it pvc-inspector -- rm -r pvc/
    kubectl delete -f ync-database/inspector.yaml
    kubectl delete -f ync-database/storage.yaml

elif [ "$1" == "status" ]; then
    kubectl get all

elif [ "$1" == "inspect" ]; then

    if [ "$2" == "storage" ]; then
        kubectl apply -f ync-database/inspector.yaml
        kubectl exec -it pvc-inspector -- sh

    elif [ "$2" == "database" ]; then
        kubectl exec -it cassandra-0 -- /bin/bash
    fi

fi