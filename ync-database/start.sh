docker run -d --name=cassandra_cluster -p 9042:9042 -v ./database-init/:/scripts/ cassandra:latest

while ! docker exec -it cassandra_cluster cqlsh -f '/scripts/store.cql'; do
	sleep 5
done
