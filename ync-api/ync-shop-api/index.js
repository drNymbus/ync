const express = require('express');

// Request parsers
const { queryParser } = require('express-query-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Cookie parsers
const fs = require('fs');
const cookieParser = require('cookie-parser');

// Database driver
const cassandra = require('cassandra-driver');

// Utils functions
const utils = require('./js/utils.js');
const session = require('./js/session.js');
const basket = require('./js/basket.js');
const item = require('./js/item.js');
const order = require('./js/order.js');
const capture = require('./js/capture.js');

// const routes = require('./routes.js');

// Set up express app
const app = express();
const port = process.env.PORT || 3001;

// Parse body in case of POST method
app.use(bodyParser.json());
app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true,
      parseList: true
    })
);
app.use(cors({ credentials: true, origin: true }));

// Loading secrets for signature's cookies
const cookie_secret = process.env.COOKIE_SECRET || 'some-string-will-do-the-trick'; // Retrieve secrets
app.use(cookieParser(cookie_secret)); // Hand over the secret string for signed cookies

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'store',
    credentials: { username: 'shop_api', password: 'shopapi' }
});

// Routes
app.route('/store/connect')
    .get((req, res) => {
        const cookie = req.signedCookies.ync_shop;
        if (!cookie) {
            handleResponse(session.createSession, req, res, client, assertCookie=false);
        } else {
            session.retrieveSession(req, res, client, cookie);
        }
    });

app.route('/store/basket')
    .get((req, res) => basket.get(req, res, client))
    .post((req, res) => basket.post(req, res, client));

app.route('/store/item')
    .get((req, res) => { item.get(req, res, client); })
    .post((req, res) => { item.post(req, res, client); })
    .delete((req, res) => { item.remove(req, res, client); });
    // .get((req, res) => { routes.store_get(req, res, client); })
    // .post((req, res) => { routes.store_post(req, res, client); })
    // .delete((req, res) => { routes.store_delete(req, res, client); });

app.route('/store/order')
    .get((req, res) => order.get(req, res, client))
    .post((req, res) => order.post(req, res, client))
    .delete((req, res) => order.remove(req, res, client));

app.route('/store/capture')
    .get((req, res) => capture.get(req, res, client))
    .post((req, res) => capture.post(req, res, client));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
