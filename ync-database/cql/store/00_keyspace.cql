DROP KEYSPACE IF EXISTS store;
CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Session record
DROP TABLE IF EXISTS store.session;
CREATE TABLE IF NOT EXISTS store.session (
    cookie_id UUID PRIMARY KEY,
    unperishable boolean,
    last_update timestamp
);

-- @desc: Basket associated to session
DROP TABLE IF EXISTS store.basket;
CREATE TABLE IF NOT EXISTS store.basket (
    cookie_id UUID PRIMARY KEY,
    items set<varchar>
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
    processed boolean,
    PRIMARY KEY (cookie_id, command_id)
);

-- @desc: Item
DROP TABLE IF EXISTS store.item;
CREATE TABLE IF NOT EXISTS store.item(
    item_id varchar PRIMARY KEY,
    category varchar,
    image blob,
    display_name varchar,
    description varchar,
    basket_description varchar,
    price decimal
);