-- No use of batch settings, Cassandra distribute the write operations optimally
-- INSERT INTO store.item (item_id, category, display_name, description, basket_description, price) VALUES (
--     'dummy',
--     'None',
--     'Test',
--     'Lorem ipsum dolor sit amet, consectetur adip',
--     'This should not be in a basket, how did you come so far?',
--     -1
-- );

INSERT INTO store.item (item_id, category, image, display_name, description, basket_description, price) VALUES (
    'quelconque',
    'quelconque',
    LOAD_FILE('/etc/init.d/cql/store/assets/Quelconque.png'),
    'Quelconque',
    '“Quelconque” est une photo prise au lac de Gradignan le 14 mars 2024.
 Alexandre et Victor jouent aux échecs, Alexis prend des photos.
 Le soleil se couche, il a déjà commencé à se cacher.',
    'Livré avec son cadre photo aléatoire.',
    10.99
);