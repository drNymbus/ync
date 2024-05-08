FROM cassandra:4.1.4

COPY cassandra.yaml /etc/cassandra/cassandra.yaml

COPY user_admin.cql /etc/init.d/user_admin.cql
COPY superuser.cql /etc/init.d/superuser.cql

# This bash file assumes that all CQL scripts to be executed are in /etc/init.d/keyspace/<keyspace-folder>/*.cql
COPY keyspace.sh keyspace.sh
RUN chmod +x /keyspace.sh

# Default password shall be replaced once the cassandra node is up
COPY credentials.conf /root/.cassandra/cqlshrc
# COPY auth_provider.conf /root/.cassandra/cqlshrc
# COPY credentials.conf /root/.cassandra/credentials
RUN chmod 600 /root/.cassandra/cqlshrc