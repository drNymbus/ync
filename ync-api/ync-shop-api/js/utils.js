const uuid = require('cassandra-driver').types.Uuid;

// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// exports.fetch = fetch;

/* @desc: Return the token to be stored in the cookie
 * @return {bytes}: The encrypted random string
 */
const generate_cookie = () => {
    // return crypto.randomBytes(16).toString('hex');
    return uuid.random();
}; exports.generate_cookie = generate_cookie;

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
}; exports.assert_cookie = assert_cookie;

/* @desc: Send a bad request error message to the client with the appropriate status code.
 * @param {Object} response: The response object handled by express.
 * @param {Integer} status: The status to be sent to the client.
 * @param {Object} error: The error object to be sent to the client.
 * @return {undefined}: Nothing is returned.
 */
const failed_request = (response, status, error) => { return response.status(status).json(error); };
exports.failed_request = failed_request;

const log_query = (m, req) => { console.log({method: m, cookie: req.signedCookies, url: req.url, query: req.query, body: req.body}); };
exports.log_query = log_query;

const session = {
    select: "SELECT * FROM store.session WHERE cookie = ?",
    insert: "INSERT INTO store.session (cookie,unperishable,last_update) VALUES (?, ?, ?)",
    update: "UPDATE store.session SET last_update = ? WHERE cookie = ?",
    unperishable: "UPDATE store.session SET unperishable = true WHERE cookie = ?"
}; exports.session = session;

const basket = {
    select: "SELECT items FROM store.basket WHERE cookie = ?",
    insert: "INSERT INTO store.basket (items, cookie) VALUES (?, ?)",
    set: "UPDATE store.basket SET items = ? WHERE cookie = ?"
}; exports.basket = basket;

const item = {
    select_all: "SELECT id FROM store.item;",
    select: "SELECT * FROM store.item WHERE id IN ?",
    insert: "INSERT INTO store.item (id, image, display_name, description, price) VALUES (:id, textAsBlob(:image), :display_name, :description, :price)",
    delete: "DELETE FROM store.item WHERE id IN ?",
    image: "SELECT image FROM store.item WHERE id IN ?"
}; exports.item = item;

const order = {
    select: "SELECT (id, item_count, items, address, postal_code, country, name, first_name, mail, phone, processed) FROM store.user_order WHERE cookie_id = ?;",
    insert: "INSERT INTO store.user_order (cookie, id, items, price, address, postal_code, country, name, first_name, mail, phone, paid, processed) VALUES (:cookie, :id, :items, :price, :address, :postal_code, :country, :name, :first_name, :mail, :phone, false, false)",
    delete: "DELETE FROM store.user_order WHERE id = ?",
    paid: "UPDATE store.user_order SET paid = true WHERE cookie = ? AND id = ?"
}; exports.order = order;

const paypalEndpoint = process.env.PAYPAL_ENDPOINT || "https://api-m.sandbox.paypal.com";
exports.paypalEndpoint = paypalEndpoint;

const paypalToken = async () => {
    const id = process.env.PAYPAL_CLIENT_ID || "AbJEuHlreYGdf5pC3ZoSRC6JfKS1KvOB4wir-Nb38srSNJrPlex1IOPe4YOLukiHplsIW0vlwXdLih8_";
    const secret = process.env.PAYPAL_CLIENT_SECRET || "EENOKNWI9ypsTYljgc7di_ifAhBHjyHobGo_rNtWm-U0fy9FJf0T4yFQUkK4dNRJDW1GS1KkeT9k_Fvh";
    const auth = Buffer.from(`${id}:${secret}`).toString("base64");
    const response = await fetch(`${paypalEndpoint}/v1/oauth2/token`, {
        method: "POST", body: "grant_type=client_credentials",
        headers: { Authorization: `Basic ${auth}` }
    });

    const data = await response.json();
    // console.log("paypalToken", data);
    return data.access_token;
}; exports.paypalToken = paypalToken;

const paypalPostOrder = async (order) => {
    const accessToken = await paypalToken();
    const payload = { intent: "CAPTURE", purchase_units: [{ amount: { currency_code: "EUR", value: order.price, } }]};
    const res = await fetch(`${paypalEndpoint}/v2/checkout/orders`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }, body: JSON.stringify(payload)
    });

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.paypalPostOrder = paypalPostOrder;

const paypalGetOrder = async (order) => {
    const accessToken = await paypalToken();
    const res = await fetch(`${paypalEndpoint}/v2/checkout/orders/${order}`, {
        method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
    });

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.paypalGetOrder = paypalGetOrder;

const paypalCapture = async (order) => {
    const accessToken = await paypalToken();
    const res = await fetch(`${paypalEndpoint}/v2/checkout/orders/${order}/capture`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
    });

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.paypalCapture = paypalCapture;