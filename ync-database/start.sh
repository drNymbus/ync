#!/bin/bash

echo $(pwd)

if [ "$1" == "docker" ]; then
    # Init service
    docker run -d --name=cassandra_cluster -p 9042:9042 -v ./cql/:/scripts/ cassandra:latest

    # Init keyspaces: wait for cluster to be ready, then run cql scripts
    while ! docker exec -it cassandra_cluster cqlsh; do
        sleep 10 # Wait extra time before running the same command
    done
    cd cql
    for $keyspace in `ls -d */`; do
        cd $keyspace
        for $filename in `ls *.cql`; do docker exec -it cassandra_cluster cqlsh -f '/scripts/$keyspace/$filename'; done
        cd ..
    done
    cd ..

elif [ "$1" == "k8s" ]; then
    # Init service
    # kubectl apply -f storage.yml
    # kubectl apply -f database.yml

    # Init keyspaces
    kubectl cp ./cql/superuser.cql cassandra-0:/etc/init.d/superuser.cql
    kubectl exec -it cassandra-0 -- cqlsh -u cassandra -p cassandra -f '/etc/init.d/superuser.cql'
    for keyspace in `ls -d cql/*/`; do
        sh ./deploy_keyspace.sh ${keyspace:4:-1};
    done
fi