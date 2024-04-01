const express = require('express');
const fs = require('fs');
const cassandra = require('cassandra-driver');
const cookieParser = require('cookie-parser');

const utils = require('./js/utils.js');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'store'
});

const cookie = 'toto';

app.use(cookieParser()); // Hand over the secret string for signed cookies

// Routes
app.route('/store')
    .get((req, res) => {
        // Get cookie in req
        //req.cookies;

        client.execute(utils.session.select, [cookie]).then(async (result) => {
            if (result.rowLength === 0) {
                await client.execute(utils.session.insert, [cookie, false, Date.now()]); // create session
                await client.execute(utils.basket.insert, [cookie]); // create basket

                client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                    res.json(result.rows[0]); // send basket
                });
            } else {
                await client.execute(utils.session.update, [Date.now(), cookie]); // update session
                client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                    res.json(result.rows[0]); // send basket
                });
            }
        });
    })
    .post(async (req, res) => {
        // Get cookie in req

        await client.execute(utils.basket.add_item, ['item', cookie]); // update basket with new item
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session
        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.json(result.rows[0]); // send basket
        });
    })
    .delete(async (req, res) => {
        // Get cookie in req

        await client.execute(utils.basket.remove_item, ['item', cookie]); // update basket with item removed
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session
        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.json(result.rows[0]); // send basket
        });
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
