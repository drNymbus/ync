const utils = require('./utils.js');

const store_get = async (req, res, client) => {
    utils.log_query('get', req);
    // Attempt to retrieve signed cookie from client
    let cookie = req.signedCookies.ync_shop;

    if (req.query.connect === true) {
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
    } else if (req.query.item === true) {
        if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.id === undefined) {
            await client.execute(utils.session.update, [Date.now(), cookie]); // update session
            client.execute(utils.item.select_all).then((result) => { // retrieve item
                res.status(200).json(result.rows); // send item
            });
        } else {
            let ids = req.query.id.split(','); // transform query into cql query ready set values
            for (let i in ids) ids[i] = `'${ids[i]}'`;

            await client.execute(utils.session.update, [Date.now(), cookie]); // update session
            client.execute(utils.item.select, [ids]).then((result) => { // retrieve item
                res.status(200).json(result.rows[0]); // send item
            });
        }
    } else { utils.failed_request(res, 400, {'error': 'Bad request'}); }
};
exports.store_get = store_get;

const store_post = async (req, res, client) => {
    utils.log_query('post', req);
    // Retrieve cookie and add an element to the basket
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    if (req.query.basket === true) {
        await client.execute(utils.basket.add_item, [req.query.id.split(','), cookie]); // update basket with new item.s
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session

        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.status(200).json(result.rows[0]); // send basket
        });

    } else if (req.query.item === true) {
        const ids = []; // Retrieve all fields from body

        for (let i in req.body) {
            let src_item = req.body[i], id = req.body[i].id; // item information
            let dst_item = []; // flatten item
            for (let [key, value] of Object.entries(src_item)) dst_item.push(value);
            await client.execute(utils.item.insert, dst_item) // add item to table
                .then((result) => { // If statement correctly executed
                    ids.push(id); // add id to ids
                });
        }

        await client.execute(utils.session.update, [Date.now(), cookie]); // update session
        res.status(200).json({output: 'REQUEST COMPLETED', ids: ids}); // send ids inserted successfully
    }
};
exports.store_post = store_post;

const store_delete = async (req, res, client) => {
    utils.log_query('delete', req);
    // Retrieve cookie and remove an element to the basket
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    if (req.query.basket === true) {
        await client.execute(utils.basket.remove_item, [req.body.id.split(','), cookie]); // update basket with new item.s
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session

        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.status(200).json(result.rows[0]); // send basket
        });

    } else if (req.query.item === true) {
        await client.execute(utils.item.delete, [req.query.id]); // update basket with item removed
        await client.execute(utils.session.update, [Date.now(), cookie]); // update session

        client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
            res.status(200).json(result.rows[0]); // send basket
        });
    }
};
exports.store_delete = store_delete;