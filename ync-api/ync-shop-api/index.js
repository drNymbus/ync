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
const routes = require('./js/routes.js');
const _get = require('./js/get.js');
const _post = require('./js/post.js');
const _delete = require('./js/delete.js');

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
app.route('/store')
    .get((req, res) => { routes.store_get(req, res, client); })
    .post((req, res) => { routes.store_post(req, res, client); })
    .delete((req, res) => { routes.store_delete(req, res, client); });

app.route('/store/:order/capture')
    .post((req, res) => { routes.store_capture(req, res, client); })

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
