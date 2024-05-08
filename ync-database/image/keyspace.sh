#!/bin/bash

for script in `ls /etc/init.d/keyspace/*/*.cql`; do
    cqlsh -f ${script}
done