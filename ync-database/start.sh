#!/bin/bash

# Create cassandra cluster
docker run -d --name=cassandra_cluster -p 9042:9042 -v ./database-init/:/scripts/ cassandra:latest

# Wait for cluster to be ready then run store.cql script
while ! docker exec -it cassandra_cluster cqlsh -f '/scripts/store.cql'; do
	sleep 10
done

# Execute other scripts
docker exec -it cassandra_cluster cqlsh -f '/scripts/items.cql'

# Enter container bash
# docker exec -it cassandra_cluster bash
