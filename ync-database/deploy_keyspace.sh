#!/bin/bash

# Create folder to store cql scripts
kubectl exec -it cassandra-0 -- mkdir "/etc/init.d/$1"

cd cql

for script in `ls $1/*.cql`; do
    # Copy script to pod
    kubectl cp $script cassandra-0:/etc/init.d/$script
    # Execute script
    COMMAND="cqlsh -f /scripts/$script"
    kubectl exec -it cassandra-0 -- $COMMAND
done

cd ..