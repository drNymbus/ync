for script in "$1/*.cql"; do
    cqlsh -u cassandra -p cassandra "$script"
done

cqlsh -u cassandra -p cassandra -f superuser.cql
cqlsh -u cassandra -p cassandra -f user_admin.cql