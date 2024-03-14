CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE store;

CREATE TABLE IF NOT EXISTS store.basket (
    cookie_id varchar PRIMARY KEY,
    item_count int,
    items list<text>,
    last_update timestamp
);
