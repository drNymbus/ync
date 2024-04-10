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

// Loading secrets for signature's cookies
const secrets = JSON.parse(fs.readFileSync('./do_not_share.json', 'utf8')); // Retrieve secrets
app.use(cookieParser(secrets.cookie)); // Hand over the secret string for signed cookies

// Routes
app.route('/store')
    .get(async (req, res) => {
        // Attempt to retrieve signed cookie from client
        let cookie = req.signedCookies.ync_shop;
        console.log(req.query);

        if (req.query.connect === 'true') {
            client.execute(utils.session.select, [(cookie ? cookie : 'none')]).then(async (result) => {
                if (result.rowLength === 0) {
                    // No existing session: generate and sign a new cookie
                    cookie = utils.generate_cookie();

                    const timestamp = Date.now();
                    const datetime = new Date(timestamp);

                    await client.execute(utils.session.insert, [cookie, false, timestamp]); // create session
                    await client.execute(utils.basket.insert, [cookie]); // create basket
                    client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                        res.cookie('ync_shop', cookie, {path: '/store', signed: true});
                        res.status(200).json(result.rows[0]); // send basket
                    });
                } else {
                    // Existing session: verify/update the cookie and retrieve basket
                    if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});
                    await client.execute(utils.session.update, [Date.now(), cookie]); // update session
                    // update cookie session
                    client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                        res.status(200).json(result.rows[0]); // send basket
                    });
                }
            });
        } else if (req.query.item === 'true') {
            console.log(cookie);
            if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});

            if (req.query.id === undefined) {
                await client.execute(utils.session.update, [Date.now(), cookie]); // update session
                client.execute(utils.item.select_all).then((result) => { // retrieve item
                    res.status(200).json(result.rows); // send item
                });
            } else {
                await client.execute(utils.session.update, [Date.now(), cookie]); // update session
                client.execute(utils.item.select, [req.query.id]).then((result) => { // retrieve item
                    res.status(200).json(result.rows[0]); // send item
                });
            }
        } else { utils.failed_request(res, 400, {'error': 'Bad request'}); }
    })
    .post(async (req, res) => {
        // Retrieve cookie and add an element to the basket
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.basket === true) {
            await client.execute(utils.basket.add_item, ['item', cookie]); // update basket with new item
            await client.execute(utils.session.update, [Date.now(), cookie]); // update session
            client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                res.status(200).json(result.rows[0]); // send basket
            });
        } else if (req.query.item === true) {
            const item = [];
            for (let att in req.body.item) item.push(req.body.item[att]);

            await client.execute(utils.item.insert, [item]); // update basket with new item
            await client.execute(utils.session.update, [Date.now(), cookie]); // update session
            client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                res.status(200).json(result.rows[0]); // send basket
            });
        }
    })
    .delete(async (req, res) => {
        // Retrieve cookie and remove an element to the basket
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        await client.execute(utils.basket.remove_item, ['item', cookie]); // update basket with item removed
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session
        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.status(200).json(result.rows[0]); // send basket
        });
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
