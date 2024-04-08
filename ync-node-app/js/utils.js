const crypto = require('crypto');

/* @desc: Return the token to be stored in the cookie
 * @return {bytes}: The encrypted random string
 */
const generate_cookie = () => {
    return crypto.randomBytes(32).toString('hex');
};
exports.generate_cookie = generate_cookie;

/* @desc: Verify if a cookie is valid, and return the response status code
 * @param {Object} cookie: The cookie object to be asserted.
 * @return {Integer}: The response status code
 */
const assert_cookie = (cookie) => {
    if (cookie === undefined) return false;
    return true;
}
exports.assert_cookie = assert_cookie;

/* @desc: Verify if a cookie is valid, and return the response status code
 * @param {Object} cookie: The cookie object to be asserted.
 * @return {Integer}: The response status code
 */
const failed_request = (response, status, error) => { return response.status(status).json(error); }
exports.failed_request = failed_request;

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