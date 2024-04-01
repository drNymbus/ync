const session = {
    select: 'SELECT * FROM store.session WHERE cookie_id = ?',
    insert: 'INSERT INTO store.session (cookie_id,unperishable,last_update) VALUES (?, ?, ?)',
    update: 'UPDATE store.session SET last_update = ? WHERE cookie_id = ?'
};
exports.session = session;

const basket = {
    select: 'SELECT * FROM store.basket WHERE cookie_id = ?',
    insert: 'INSERT INTO store.basket (cookie_id, item_count, items) VALUES (?, 0, [])',
    add_item: 'UPDATE store.basket SET items = items + [?], item_count = item_count + 1 WHERE cookie_id = ?',
    remove_item: 'UPDATE store.basket SET items = items - [?], item_count = item_count - 1 WHERE cookie_id = ?'
};
exports.basket = basket;