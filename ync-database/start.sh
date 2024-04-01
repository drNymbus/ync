docker run -d -p 9042:9042 -v './database-init/*':'/scripts/*' --name=cassandra_cluster cassandra:latest

# DOS version
# docker run -d --name=cassandra_cluster -p 9042:9042 -v .\database-init\:/scripts/ cassandra:latest

while ! docker exec -it cassandra_cluster cqlsh -f '/scripts/init.cql' ; do
    sleep 5
done
