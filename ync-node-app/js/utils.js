const uuid = require('cassandra-driver').types.Uuid;
const crypto = require('crypto');

/* @desc: Return the token to be stored in the cookie
 * @return {bytes}: The encrypted random string
 */
const generate_cookie = () => {
    // return crypto.randomBytes(16).toString('hex');
    return uuid.random();
};
exports.generate_cookie = generate_cookie;

/* @desc: Verify if a cookie is valid, and return the response status code.
 * @param {Object} cookie: The cookie object to be asserted.
 * @return {Integer}: The response status code.
 */
const assert_cookie = (client, cookie) => {
    let asserted = true;

    if (cookie === undefined || cookie === false) {
        asserted = false;
    } else {
        client.execute(session.select, [cookie]).then((result) => {
            if (result.rows.length === 0) asserted = false;
        });
    }

    return asserted;
}
exports.assert_cookie = assert_cookie;

/* @desc: Send a bad request error message to the client with the appropriate status code.
 * @param {Object} response: The response object handled by express.
 * @param {Integer} status: The status to be sent to the client.
 * @param {Object} error: The error object to be sent to the client.
 * @return {undefined}: Nothing is returned.
 */
const failed_request = (response, status, error) => { return response.status(status).json(error); }
exports.failed_request = failed_request;

const log_query = (m, req) => { console.log({method: m, cookie: req.signedCookies, url: req.url, query: req.query, body: req.body}); }
exports.log_query = log_query;

const session = {
    select: "SELECT * FROM store.session WHERE cookie_id = ?",
    insert: "INSERT INTO store.session (cookie_id,unperishable,last_update) VALUES (?, ?, ?)",
    update: "UPDATE store.session SET last_update = ? WHERE cookie_id = ?"
};
exports.session = session;

const basket = {
    select: "SELECT items FROM store.basket WHERE cookie_id = ?",
    insert: "INSERT INTO store.basket (cookie_id, items) VALUES (?, {})",
    add_item: "UPDATE store.basket SET items = items + ? WHERE cookie_id = ?",
    remove_item: "UPDATE store.basket SET items = items - ? WHERE cookie_id = ?"
};
exports.basket = basket;

const item = {
    select_all: "SELECT item_id FROM store.item;",
    select: "SELECT * FROM store.item WHERE item_id IN ?",
    insert: "INSERT INTO store.item (item_id, image, display_name, description, price) VALUES (:id, textAsBlob(:image), :display_name, :description, :price)",
    delete: "DELETE FROM store.item WHERE item_id IN ?"
};
exports.item = item;