CREATE ROLE shop_manager WITH LOGIN = true AND PASSWORD = 'shopmanager';
GRANT ALL PERMISSIONS ON KEYSPACE store TO shop_manager;

CREATE ROLE shop_api WITH LOGIN = true AND PASSWORD = 'shopapi';
GRANT SELECT ON KEYSPACE store TO shop_api;
GRANT MODIFY ON KEYSPACE store TO shop_api;
