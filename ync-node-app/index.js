const express = require('express');

// Request parsers
const { queryParser } = require('express-query-parser');
const bodyParser = require('body-parser');

// Cookie parsers
const fs = require('fs');
const cookieParser = require('cookie-parser');

// Database driver
const cassandra = require('cassandra-driver');

// Utils functions
const routes = require('./js/routes.js');
// const utils = require('./js/utils.js');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

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
// Loading secrets for signature's cookies
const secrets = JSON.parse(fs.readFileSync('./do_not_share.json', 'utf8')); // Retrieve secrets
app.use(cookieParser(secrets.cookie)); // Hand over the secret string for signed cookies

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'store'
});

// Routes
app.route('/store')
    .get((req, res) => { routes.store_get(req, res, client); })
    .post((req, res) => { routes.store_post(req, res, client); })
    .delete((req, res) => { routes.store_delete(req, res, client); });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
