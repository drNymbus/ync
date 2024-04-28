DROP KEYSPACE IF EXISTS file_system;
CREATE KEYSPACE IF NOT EXISTS file_system WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Session record
DROP TABLE IF EXISTS file_system.user;
CREATE TABLE IF NOT EXISTS store.user (
    username varchar PRIMARY KEY,
    password varchar,
    last_update timestamp
);

-- @desc: Session record
DROP TABLE IF EXISTS file_system.folder;
CREATE TABLE IF NOT EXISTS store.folder (
    username varchar,
    id varchar,
    display_name varchar,
    permissions list<varchar>,
    parent varchar,
    share_link varchar,
    child_folders varchar,
    child_files varchar,
    PRIMARY KEY (username, id)
);

-- @desc: Session record
DROP TABLE IF EXISTS file_system.file;
CREATE TABLE IF NOT EXISTS store.file (
    username varchar,
    id varchar,
    display_name varchar,
    permissions list<varchar>,
    parent varchar,
    share_link varchar,
    extension varchar,
    content blob,
    PRIMARY KEY (username, id)
);
