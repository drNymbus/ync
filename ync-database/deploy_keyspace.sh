#!/bin/bash

# Create folder to store cql scripts
kubectl exec -it cassandra-0 -- mkdir "/etc/init.d/cql/"
kubectl exec -it cassandra-0 -- mkdir "/etc/init.d/cql/$1"
# Copy cql directory to master node (/etc/init.d/cql/)
kubectl cp ${1} cassandra-0:/etc/init.d/cql/${1}

for script in `ls $1/*.cql`; do
    # Execute script
    filename="/etc/init.d/cql/$script"
    echo "$script -- $filename"
    kubectl exec -it cassandra-0 -- cqlsh -u admin -p admin -f "$filename"
done
