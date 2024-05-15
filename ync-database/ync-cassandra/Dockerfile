FROM cassandra:4.1.4

COPY cassandra.yaml /etc/cassandra/cassandra.yaml
# Default password shall be replaced once the cassandra node is up
COPY credentials.conf /root/.cassandra/cqlshrc
RUN chmod 600 /root/.cassandra/cqlshrc