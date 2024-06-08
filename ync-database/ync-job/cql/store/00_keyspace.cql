DROP KEYSPACE IF EXISTS store;
CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

-- @desc: Session record
DROP TABLE IF EXISTS store.session;
CREATE TABLE IF NOT EXISTS store.session (
    cookie UUID PRIMARY KEY,
    unperishable boolean,
    last_update timestamp
);

-- @desc: Basket associated to session
DROP TABLE IF EXISTS store.basket;
CREATE TABLE IF NOT EXISTS store.basket (
    cookie UUID PRIMARY KEY,
    items map<text, bigint>
);

-- @desc: Command associated to session
DROP TABLE IF EXISTS store.user_order;
CREATE TABLE IF NOT EXISTS store.user_order (
    cookie UUID,
    id UUID,
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
    PRIMARY KEY (cookie, id)
);

-- @desc: Item
DROP TABLE IF EXISTS store.item;
CREATE TABLE IF NOT EXISTS store.item (
    id text PRIMARY KEY,
    category text,
    image blob,
    display_name text,
    description text,
    basket_description text,
    price decimal
);

DROP TABLE IF EXISTS store.mailing;
CREATE TABLE IF NOT EXISTS store.mailing (
    mail text PRIMARY KEY,
    phone text,
    name text,
    first_name text,
    address text,
    postal_code text,
    country text
);