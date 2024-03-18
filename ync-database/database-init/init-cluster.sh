#!/bin/bash

echo $CLUSTER_NAME

# Wait for Cassandra to start up
while ! cqlsh $CLUSTER_NAME -e 'describe cluster' ; do
#    echo "Waiting for Cassandra to start..."
    sleep 30
done

# Execute the CQL schema file to initialize the database and table
cqlsh $CLUSTER_NAME -f /init-db.cql