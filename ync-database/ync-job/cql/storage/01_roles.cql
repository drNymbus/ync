-- CREATE ROLE file_manager WITH LOGIN = true AND PASSWORD = 'filemanager'; -- this password should not be here ?
-- GRANT ALL PERMISSIONS ON KEYSPACE file_system TO file_manager;

-- CREATE ROLE download_api WITH LOGIN = true AND PASSWORD = 'downloadapi'; -- this password should not be here ?
-- GRANT SELECT ON KEYSPACE store TO download_api;
-- CREATE ROLE upload_api WITH LOGIN = true AND PASSWORD = 'uploadapi'; -- this password should not be here ?
-- GRANT MODIFY ON KEYSPACE store TO upload_api;
