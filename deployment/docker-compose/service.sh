#!/bin/bash

# @desc: Once the PersistentVolume and StatefulSet have been created and initialized, setup admin user role and folder to deploy keyspaces.
function init_database() {
    cd ../../ync-database

    # Wait for pod initialization to complete
    while ! docker exec cassandra-0 cqlsh -u cassandra -p cassandra; do sleep 5; done
    # Setup default cassandra configuration
    docker exec -it cassandra_cluster mkdir '/etc/init.d/cql/'
    docker cp ./cql/superuser.cql cassandra_cluster:/etc/init.d/cql/superuser.cql
    docker exec -it cassandra_cluster cqlsh -u cassandra -p cassandra -f '/etc/init.d/cql/superuser.cql'

    cd ../deployment/docker-compose
}

# @ desc: Use the "deploy_keyspace.sh" script to fill database keyspaces, user roles and tables.
function create_keyspaces() {
    # cd ../../ync-database
    # for keyspace in `ls -d cql/*/`; do
    #     sh ./deploy_keyspace.sh ${keyspace:4:-1};
    # done
    # cd ../deployment/k8s
    echo 'Nothing happens...'
}

if [ "$1" == "start" ]; then
    # docker compose up
    docker run --name cassandra_cluster -p 9042:9042 cassandra
    sleep 20
    init_database
    create_keyspaces

    docker run --name ync-shop-api -p 3000:3000 ync-shop-api
    docker run --name ync-shop-app -p 3000:3000 ync-shop-app
elif [ "$1" == "stop" ]; then
    # docker compose down
    docker container stop ync-shop-app
    docker container stop ync-shop-api
    docker container stop cassandra_cluster

elif [ "$1" == "delete"]; then
    docker container stop cassandra_cluster
    docker container prune --force

fi