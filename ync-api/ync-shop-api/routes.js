const utils = require('./js/utils.js');
const _get = require('./js/get.js');
const _post = require('./js/post.js');
const _delete = require('./js/delete.js');

// Method: GET, Route: /store
const store_get = (req, res, client) => {
    utils.log_query('get', req);

    try {
        let cookie = req.signedCookies.ync_shop;

        if (req.query.connect === true) { // Attempt to connect to the API
            if (!cookie) {
                _get.createSession(req, res, client);
            } else {
                if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});
                _get.retrieveSession(req, res, client, cookie);
            }
        } else {
            if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

            if (req.query.item === true) { // Retrieve several or all store items
                _get.item(req, res, client);

            } else if (req.query.order === true) { // Retrieve one or several commands
                _get.order(req, res, client, cookie);

            } else if (req.query.capture === true) { // Retrieve paypal's order status
                _get.capture(req, res, client);

            } else {
                utils.failed_request(res, 400, {'error': 'Bad Request'});
            }
        }

    } catch (err) {
        console.error({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    }
};
exports.store_get = store_get;

// Method: POST, Route: /store
const store_post = async (req, res, client) => {
    utils.log_query('post', req);

    try {
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.basket === true) {
            _post.basket(req, res, client);

        } else if (req.query.item === true) {
            _post.item(req, res, client);

        } else if (req.query.order === true) { // Post order to database and paypal
            _post.order(req, res, client);

        } else if (req.query.capture === true) { // Capture(=confirm) paypal's order status
            _post.capture(req, res, client);

        } else { utils.failed_request(res, 400, {'error': 'Bad Request'}); }

    } catch (err) {
        console.error({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    }
};
exports.store_post = store_post;

// Method: DELETE, Route: /store
const store_delete = async (req, res, client) => {
    utils.log_query('delete', req);

    try {
        // Retrieve cookie and remove an element to the basket
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.item === true) {
            _delete.item(req, res, client);
        } else if (req.query.order === true) {
            _delete.order(req, res, client);
        } else { utils.failed_request(res, 400, {'error': 'Bad Request'}); }

    } catch (err) { 
        console.error({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    }
};
exports.store_delete = store_delete;