DROP KEYSPACE IF EXISTS store;
CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Session record
DROP TABLE IF EXISTS store.session;
CREATE TABLE IF NOT EXISTS store.session (
    cookie_id UUID PRIMARY KEY,
    unperishable boolean,
    last_update timestamp
);
-- INSERT INTO IF NOT EXISTS store.session(cookie_id, unperishable, last_update) VALUES ('none', true, -1);

-- @desc: Basket associated to session
DROP TABLE IF EXISTS store.basket;
CREATE TABLE IF NOT EXISTS store.basket (
    cookie_id UUID PRIMARY KEY,
    items set<varchar>
    -- paid boolean,
    -- last_update timestamp
);

-- @desc: Command associated to session
DROP TABLE IF EXISTS store.command;
CREATE TABLE IF NOT EXISTS store.command (
    cookie_id UUID,
    command_id varchar,
    item_count bigint,
    items list<varchar>,
    address varchar,
    postal_code varchar,
    country varchar,
    name varchar,
    first_name varchar,
    mail varchar,
    phone varchar,
    PRIMARY KEY (cookie_id, command_id)
);

-- @desc: Item
DROP TABLE IF EXISTS store.item;
CREATE TABLE IF NOT EXISTS store.item(
    item_id varchar PRIMARY KEY,
    image blob,
    display_name varchar,
    description varchar,
    price decimal
);