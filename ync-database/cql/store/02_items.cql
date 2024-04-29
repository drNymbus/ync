-- No use of batch settings, Cassandra distribute the write operations optimally
INSERT INTO store.item (item_id, display_name, description, price) VALUES (
    'dummy',
    'None',
    'Test',
    'Lorem ipsum dolor sit amet, consectetur adip',
    'This should not be in a basket, how did you come so far?',
    -1
);

INSERT INTO store.item (item_id, display_name, description, price) VALUES (
    'quelconque',
    'Quelconque',
    '“Quelconque” est une photo prise au lac de Gradignan le 14 mars 2024.
 Alexandre et Victor jouent aux échecs, Alexis prend des photos.
 Le soleil se couche, il a déjà commencé à se cacher.',
    10.99
);

