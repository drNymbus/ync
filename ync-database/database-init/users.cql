CREATE ROLE admin WITH SUPERUSER = true AND LOGIN = true AND PASSWORD = 'admin';
CREATE ROLE guest WITH LOGIN = true AND PASSWORD = 'guest';
GRANT SELECT ON KEYSPACE keyspace_nom TO guest;
GRANT MODIFY ON TABLE keyspace_nom.table_nom TO guest;
GRANT SELECT (colonne1, colonne2) ON keyspace_nom.table_nom TO guest;
GRANT CREATE, ALTER, DROP ON KEYSPACE keyspace_nom TO guest;