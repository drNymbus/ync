#!/bin/bash

for cql-script in `ls /etc/init.d/cql/*/*.cql`; do
    cqlsh -f ${cql-script}
done