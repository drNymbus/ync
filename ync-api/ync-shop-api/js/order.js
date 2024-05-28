const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils.js');
const paypal = require('./paypal.js');

const get = (req, res, client) => {
    utils.log_query('order.get', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});
    // Send permanent cookie associated if different from actual
    // client.execute(utils.order.select, [req.query.id.split(','), cookie]).then((result) => { // retrieve order
    //     res.status(200).json(result.rows); // send order
    // });
}; exports.get = get;

const post = async (req, res, client) => {
    utils.log_query('order.post', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const {status, data} = await paypal.postOrder(req.body.order.price);

    let order = {...req.body.order, cookie: req.signedCookies.ync_shop, id: uuid.random()};
    await client.execute(utils.order.insert, order, {prepare:true});

    res.status(status).json({...data, uuid: order.id});
}; exports.post = post;

const remove = async (req, res, client) => {
    utils.log_query('order.remove', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    await client.execute(utils.order.delete, [req.query.id.split(',')]); // delete item from database
    client.execute(utils.basket.select, [req.signedCookies.ync_shop])
        .then(() => res.status(200).json({'message': 'Item deleted'}))
        .catch((error) => {
            console.error('order.remove', error);
            res.status(500).json({'error': 'Internal server error'});
        });
}; exports.remove = remove;