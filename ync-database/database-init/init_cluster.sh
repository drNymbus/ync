#!/bin/bash

# Wait for Cassandra to start up
while ! cqlsh cassandra_cluster -e 'describe cluster' ; do
    echo "Waiting for Cassandra to start..."
    sleep 30
done

# Execute the CQL schema file to initialize the database and table
exec cqlsh cassandra_cluster -f /scripts/init_db.cql