CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Session record
CREATE TABLE IF NOT EXISTS store.session (
    cookie_id varchar PRIMARY KEY,
    unperishable boolean,
    last_update timestamp
);
-- INSERT INTO IF NOT EXISTS store.session(cookie_id, unperishable, last_update) VALUES ('none', true, -1);

-- @desc: Basket associated to session
CREATE TABLE IF NOT EXISTS store.basket (
    cookie_id varchar PRIMARY KEY,
    item_count bigint,
    items list<varchar>
    -- paid boolean,
    -- last_update timestamp
);

-- @desc: Command associated to session
CREATE TABLE IF NOT EXISTS store.command (
    cookie_id varchar,
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
    available boolean,
    PRIMARY KEY (cookie_id, command_id)
);

-- @desc: Item
CREATE TABLE IF NOT EXISTS store.item(
    item_id varchar PRIMARY KEY,
    image blob,
    display_name varchar,
    description varchar,
    price decimal
);