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
    items map<text, bigint>
);

-- @desc: Command associated to session
DROP TABLE IF EXISTS store.order;
CREATE TABLE IF NOT EXISTS store.order (
    cookie_id UUID,
    command_id text,
    items map<text, bigint>,
    price bigint,
    address text,
    postal_code text,
    country text,
    name text,
    first_name text,
    mail text,
    phone text,
    paid boolean,
    processed boolean,
    PRIMARY KEY (cookie_id, command_id)
);

-- @desc: Item
DROP TABLE IF EXISTS store.item;
CREATE TABLE IF NOT EXISTS store.item(
    item_id text PRIMARY KEY,
    category text,
    image blob,
    display_name text,
    description text,
    basket_description text,
    price decimal
);