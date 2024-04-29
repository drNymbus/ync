#!/bin/bash

# Create folder to store cql scripts
kubectl exec -it cassandra-0 -- mkdir "/etc/init.d/$1"

for script in `ls $1/*.cql`; do
    echo $script
    # Copy script to pod
    kubectl cp $script cassandra-0:/etc/init.d/$script
    # Execute script
    filename="/etc/init.d/$script"
    echo $filename
    kubectl exec -it cassandra-0 -- cqlsh -u admin -p admin -f "$filename"
done