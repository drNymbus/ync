#!/bin/bash

# Wait for Cassandra to start up
until cqlsh -e "describe cluster" > /dev/null 2>&1; do
  echo "Waiting for Cassandra to start..."
  sleep 2
done

# Execute the CQL schema file to initialize the database and table
cqlsh -f /init-db.cql
