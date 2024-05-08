FROM cassandra:4

COPY cassandra.yaml /etc/cassandra/cassandra.yaml
COPY superuser.cql /etc/init.d/superuser.cql
COPY keyspace.sh /etc/init.d/keyspace.sh
RUN chmod +x /etc/init.d/keyspace.sh

# Default password shall be replaced once the cassandra node is up
COPY credentials.conf /.cqlshrc
RUN chmod 600 /.cqlshrc