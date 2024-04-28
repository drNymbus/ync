CREATE ROLE shop_manager WITH LOGIN = true AND PASSWORD = 'shopmanager'; -- this password should not be here ?
GRANT ALL PERMISSIONS ON KEYSPACE store TO shop_manager;

CREATE ROLE shop_api WITH LOGIN = true AND PASSWORD = 'shopapi'; -- this password should not be here ?
GRANT SELECT, MODIFY ON KEYSPACE store TO shop_api;