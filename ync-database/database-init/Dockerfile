FROM cassandra:latest

# Copy the schema CQL into the image
COPY init_db.cql /scripts/init_db.cql

# # Change entrypoint to execute CQL after launching cluster
COPY init_cluster.sh /scripts/init_cluster.sh
RUN chmod +x /scripts/init_cluster.sh

# CMD ["cqlsh", "-f", "/init-db.cql"]
ENTRYPOINT ["/scripts/init_cluster.sh"]