const utils = require('./utils.js');

const get = async (req, res, client) => {
    utils.log_query('basket.get', req);

    let cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});
    // Send another/new cookie to the user ?
    client.execute(utils.basket.select, [cookie])
        .then((result) => res.status(200).json(result.rows[0]))
        .catch((error) => {
            console.error('basket.get', error);
            res.status(500).json({'error': 'Internal server error'})
        });
}; exports.get = get;

const post = async (req, res, client) => {
    utils.log_query('basket.post', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    let method = utils.basket.insert;
    await client.execute(utils.basket.select, [cookie]).then((result) => {
        if (result.rows.length > 0) {
            if (result.rows[0].items === null) method = utils.basket.set;
        }
    });
    await client.execute(method, [req.body.items, cookie], {prepare: true});
    client.execute(utils.basket.select, [cookie])
        .then((result) => res.status(200).json(result.rows[0]))
        .catch((error) => {
            console.error('basket.post', error);
            res.status(500).json({'error': 'Internal server error'});
        });
}; exports.post = post;
