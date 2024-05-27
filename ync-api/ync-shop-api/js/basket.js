const utils = require('./utils.js');

const get = async (req, res, client) => {
    let cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});
    // Send another/new cookie to the user ?
    client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
        res.status(200).json(result.rows[0]); // send basket
    });
}; exports.get = get;

const post = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    let method = utils.basket.insert;
    await client.execute(utils.basket.select, [cookie]).then((result) => {
        if (result.rows.length > 0) {
            if (result.rows[0].items === null) method = utils.basket.set;
        }
    });
    await client.execute(method, [req.body.items, cookie], {prepare: true});
    client.execute(utils.basket.select, [cookie]).then((result) => {
        res.status(200).json(result.rows[0]); // retrieve & send basket
    });
}; exports.post = post;
