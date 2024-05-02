DROP KEYSPACE IF EXISTS storage;
CREATE KEYSPACE IF NOT EXISTS storage WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Metadata and content's file.
DROP TABLE IF EXISTS storage.file;
CREATE TABLE IF NOT EXISTS storage.file (
    id UUID PRIMARY KEY,
    display_name varchar,
    owner varchar,
    authorized list<varchar>, -- List of users allowed to access this resource
    parent UUID, -- Null if root file
    extension varchar,
    content blob,
    archive blob, -- Classic zip or tar archive
);

-- @desc: a Folder composed of folders and files.
DROP TABLE IF EXISTS storage.folder;
CREATE TABLE IF NOT EXISTS storage.folder (
    id UUID PRIMARY KEY,
    display_name varchar,
    owner varchar,
    authorized list<varchar>, -- List of users allowed to access this resource
    parent UUID, -- Null if root folder
    child_folders list<UUID>,
    child_files list<UUID>,
    archive blob -- Classic zip or tar archive
);

-- @desc: User file system's entrypoint.
DROP TABLE IF EXISTS storage.user;
CREATE TABLE IF NOT EXISTS storage.user (
    username varchar PRIMARY KEY,
    password varchar,
    last_update timestamp,
    public UUID,
    shared UUID,
    folders list <UUID>
);

-- @desc: As to not corrupt and ensure full availability public resources are duplicated
DROP TABLE IF EXISTS storage.file;
CREATE TABLE IF NOT EXISTS storage.public_resource (
    id UUID PRIMARY KEY,
    display_name varchar,
    extension varchar,
    archive blob, -- Classic zip or tar archive
    public timestamp -- Last time thise resource was posted in public, value is set to null in case of unperishable 
);

-- @desc: Session record
DROP TABLE IF EXISTS storage.public;
CREATE TABLE IF NOT EXISTS storage.public (
    id UUID PRIMARY KEY,
    items list<UUID>,
);
