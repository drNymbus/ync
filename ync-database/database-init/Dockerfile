FROM cassandra:latest

# Copy the schema CQL file into the container
COPY init-db.cql /init-db.cql

# Copy & run the initialization script into the container
COPY init-cluster.sh /init-cluster.sh
RUN chmod +x /init-cluster.sh

# Run the initialization script
CMD ["/init-cluster.sh"]
