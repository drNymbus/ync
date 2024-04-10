-- No use of batch settings, Cassandra distribute the write operations optimally
INSERT INTO store.item (item_id, display_name, description, price) VALUES
    ('quelconque_1', 'Quelconque', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 10.99);
INSERT INTO store.item (item_id, display_name, description, price) VALUES
    ('quelconque_2', 'Quelque chose', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 25.99);