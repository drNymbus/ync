const utils = require('./utils.js');

// Method: GET, Route: /store
const store_get = async (req, res, client) => {
    utils.log_query('get', req);

    try {
        // Retrieve cookie in request
        let cookie = req.signedCookies.ync_shop;

        if (req.query.connect === true) { // Attempt to connect to the API
            if (cookie === undefined) {
                // No existing session: generate and sign a new cookie
                cookie = utils.generate_cookie();

                await client.execute(utils.session.insert, [cookie, false, Date.now()]); // create session
                await client.execute(utils.basket.insert, [cookie]); // create basket
                client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                    res.cookie('ync_shop', cookie, {path: '/store', signed: true});
                    res.status(200).json(result.rows[0]); // send basket
                });
            } else {
                // Existing session: verify/update the cookie and retrieve basket
                if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

                await client.execute(utils.session.update, [Date.now(), cookie]); // update session
                // Send another/new cookie to the user ?
                client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                    res.status(200).json(result.rows[0]); // send basket
                });
            }

        } else if (req.query.item === true) { // Retrieve several or all store items
            if (req.query.id === undefined) { // Retrieve all store items
                client.execute(utils.item.select_all).then((result) => { // retrieve item
                    res.status(200).json(result.rows); // send item
                });
            } else { // Retrieve items specified in query id field
                client.execute(utils.item.select, [req.query.id.split(',')]).then((result) => { // retrieve item.s
                    let data = result.rows;
                    for (let i = 0; i < data.length; i++) {
                        const blob = data[i].image;
                        const image = (blob !== undefined || blob !== null) ? "undefined" : blob.toString('base64');
                        data[i].image = `data:image/jpeg;base64,${image}`;
                    }

                    res.status(200).json(data); // send item.s
                });
            }

        } else if (req.query.command === true) { // Retrieve one or several commands
            client.execute(utils.command.select, [req.query.id.split(',')]).then((result) => { // retrieve command
                res.status(200).json(result.rows); // send command
            });

        } else { utils.failed_request(res, 400, {'error': 'Bad Request'}); }

    } catch (err) {
        console.log({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    } // Any error that occurred will essentially be a bad query done against cassandra
};
exports.store_get = store_get;

// Method: POST, Route: /store
const store_post = async (req, res, client) => {
    utils.log_query('post', req);

    try {
        // Retrieve cookie and add an element to the basket
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.basket === true) { // Add item to basket
            await client.execute(utils.basket.add_item, [req.query.id.split(','), cookie]); // update basket with new item.s
            client.execute(utils.basket.select, [cookie]).then((result) => {
                res.status(200).json(result.rows[0]); // retrieve & send basket
            });

        } else if (req.query.item === true) { // Add item to database
            const valid_ids = [], unvalid_ids = [];

            for (let i in req.body) {
                let src_item = req.body[i], id = req.body[i].id; // item information
                await client.execute(utils.item.insert, src_item, {prepare:true}) // add item to table
                    .then(() => { valid_ids.push(id); }) // If promise completed add id to valid ids
                    .catch(() => { unvalid_ids.push(id); }); // If promise failed add id to unvalid ids
            }

            res.status(200).json({completed: valid_ids, rejected: unvalid_ids}); // send all ids (completed & rejected)

        } else if (req.query.command === true) { // Add command to database
            let command = {cookie: cookie, ...req.body};
            await client.execute(utils.command.insert, command, {prepare:true}).then(() => { // add command to table
                res.status(200).json({'message': 'Command has been correctly processed'});
            });

        } else { utils.failed_request(res, 400, {'error': 'Bad Request'}); }

    } catch (err) {
        console.log({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    } // Any error that occurred will essentially be a bad query done against cassandra
};
exports.store_post = store_post;

// Method: DELETE, Route: /store
const store_delete = async (req, res, client) => {
    utils.log_query('delete', req);

    try {
        // Retrieve cookie and remove an element to the basket
        const cookie = req.signedCookies.ync_shop;
        if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

        if (req.query.basket === true) {
            await client.execute(utils.basket.remove_item, [req.query.id.split(','), cookie]); // update basket with new item.s
            client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
                res.status(200).json(result.rows[0]); // send basket
            });

        } else if (req.query.item === true) {
            await client.execute(utils.item.delete, [req.query.id.split(',')]); // delete item from database
            client.execute(utils.basket.select, [cookie]).then(() => { // retrieve basket
                res.status(200).json({'message': 'Item deleted'}); // send basket
            });

        } else if (req.query.item === true) {
            await client.execute(utils.command.delete, [req.query.id.split(',')]); // delete item from database
            client.execute(utils.basket.select, [cookie]).then(() => { // retrieve basket
                res.status(200).json({'message': 'Item deleted'}); // send basket
            });

        } else { utils.failed_request(res, 400, {'error': 'Bad Request'}); }

    } catch (err) { 
        console.log({'error': err});
        utils.failed_request(res, 500, {'error': 'Something went wrong...'});
    } // Any error that occurred will essentially be a bad query done against cassandra

};
exports.store_delete = store_delete;