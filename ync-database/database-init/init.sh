#!/bin/bash

cqlsh -f "./superuser.cql"

cqlsh -f "./*/keyspace.cql"
cqlsh -f "./*/roles.cql"

cqlsh -f "./store/items.cql"
