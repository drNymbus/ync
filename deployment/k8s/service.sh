#!/bin/bash

# @ desc:
function init_cassandra() {
    cd ../../ync-database
    kubectl cp ./cql/ cassandra-0:/etc/init.d/

    # Wait for pod initialization to complete
    while ! kubectl exec cassandra-0 -- cqlsh -u cassandra -p cassandra; do sleep 20; done

    # Init super user
    kubectl exec -it cassandra-0 -- cqlsh -u cassandra -p cassandra -f '/etc/init.d/superuser.cql'
    kubectl exec -it cassandra-0 -- cqlsh -f '/etc/init.d/superuser.cql' < /etc/cassandra/credentials.conf
    kubectl exec -it cassandra-0 -- sh -c '/etc/init.d/keyspace.sh' # Init keyspaces already present

    cd ../deployment/k8s
}

# @desc: Create resources to run the service, database, apis and apps can be ran separately
if [ "$1" == "start" ]; then

    # @desc: Create PersistentVolume and StatefulSet to run the database service
    if [ "$2" == "database" ]; then
        # Init service
        kubectl apply -f ync-database/storage.yaml
        kubectl apply -f ync-database/database.yaml
        sleep 60
        init_cassandra

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
    sleep 60
    init_cassandra

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