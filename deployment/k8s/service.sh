#!/bin/bash

# @desc: Once the PersistentVolume and StatefulSet have been created and initialized, setup admin user role and folder to deploy keyspaces.
function init_database() {
    cd ../../ync-database

    # Wait for pod initialization to complete
    while ! kubectl exec cassandra-0 -- cqlsh -u cassandra -p cassandra; do sleep 5; done
    # Setup default cassandra configuration
    kubectl exec -it cassandra-0 -- mkdir '/etc/init.d/cql/'
    kubectl cp ./cql/superuser.cql cassandra-0:/etc/init.d/cql/superuser.cql
    kubectl exec -it cassandra-0 -- cqlsh -u cassandra -p cassandra -f '/etc/init.d/cql/superuser.cql'

    cd ../deployment/k8s
}

# @ desc: Use the "deploy_keyspace.sh" script to fill database keyspaces, user roles and tables.
function create_keyspaces() {
    cd ../../ync-database
    for keyspace in `ls -d cql/*/`; do
        sh ./deploy_keyspace.sh ${keyspace:4:-1};
    done
    cd ../deployment/k8s
}

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then

    # @desc: Create PersistentVolume and StatefulSet to run the database service
    if [ "$2" == "database" ]; then
        # Init service
        kubectl apply -f ync-database/storage.yaml
        kubectl apply -f ync-database/database.yaml
        sleep 20
        init_database
        create_keyspaces

    # @desc: Create all apis
    elif [ "$2" == "api" ]; then
        for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: Create all apps
    elif [ "$2" == "app" ]; then
        for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done

    # @desc: If no argument is provided, create all resources: database, apis and apps (in this particular order)
    else
        for component in `ls ync-database/*.yaml`; do kubectl apply -f ${component}; done
        init_database
        create_keyspaces

        for component in `ls ync-api/*.yaml`; do kubectl apply -f ${component}; done
        for component in `ls ync-app/*.yaml`; do kubectl apply -f ${component}; done
    fi

# @desc: Launch Cassandra's StatefulSet then all apis and apps
elif [ "$1" == "resume" ]; then
    kubectl apply -f ync-database/database.yaml
    sleep 20
    init_database
    create_keyspaces

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