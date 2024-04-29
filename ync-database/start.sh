#!/bin/bash

if [ "$1" == "docker"]; then
    # Create cassandra cluster
    docker run -d --name=cassandra_cluster -p 9042:9042 -v ./database-init/:/scripts/ cassandra:latest

    # Wait for cluster to be ready then run store.cql script
    while ! docker exec -it cassandra_cluster cqlsh -u cassandra -p cassandra; do
        sleep 10 # Wait extra time before running the same command
    done

    # Init keyspaces
    for $keyspace in `ls -d */`; do
        cd $keyspace
        for $filename in `ls *.cql`; do
            docker exec -it cassandra_cluster cqlsh -f '/scripts/$filename'
        cd ..

    # Enter container bash
    docker exec -it cassandra_cluster bash
fi

if [ "$1" == "k8s" ]; then
    kubectl cp ./superuser.cql cassandra-0:/etc/init.d/superuser.cql
    kubectl exec -it cassandra-0 -- cqlsh -u cassandra -p cassandra -f '/etc/init.d/superuser.cql'
    for $keyspace in `ls -d cql/*/`; do ./deploy_keyspace "$keyspace"; done

    echo "Not implemented yet."
fi