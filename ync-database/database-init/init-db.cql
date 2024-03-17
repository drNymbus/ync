CREATE KEYSPACE IF NOT EXISTS store WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

CREATE TABLE IF NOT EXISTS store.basket (
    cookie_id varchar PRIMARY KEY,
    item_count int,
    items list<text>,
    paid boolean,
    last_update timestamp
);
