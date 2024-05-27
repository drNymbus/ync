const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils.js');
const paypal = require('./paypal.js');

const get = (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});
    // Send permanent cookie associated if different from actual
    // client.execute(utils.order.select, [req.query.id.split(','), cookie]).then((result) => { // retrieve order
    //     res.status(200).json(result.rows); // send order
    // });
}; exports.get = get;

const post = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const content = await paypal.postOrder(req.body.order);

    let order = {...req.body.order, cookie: req.signedCookies.ync_shop, id: uuid.random()};
    await client.execute(utils.order.insert, order, {prepare:true});

    res.status(content.res_status).json({...content, uuid: order.id});
}; exports.post = post;

const remove = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    await client.execute(utils.order.delete, [req.query.id.split(',')]); // delete item from database
    client.execute(utils.basket.select, [req.signedCookies.ync_shop]).then(() => { // retrieve basket
        res.status(200).json({'message': 'Item deleted'}); // send basket
    });
}; exports.remove = remove;