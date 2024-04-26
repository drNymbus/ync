#!/bin/bash

cd database-init

# Apply all CQL scripts found in the specified directory to Cassandra's master node
for script in /$1/*.cql; do
    kubectl exec -it cassandra-0 -- "cqlsh -f $script"
done

cd ..