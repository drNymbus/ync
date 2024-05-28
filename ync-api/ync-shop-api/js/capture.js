const utils = require('./utils.js');
const paypal = require('./paypal.js');

const get = async (req, res, client) => {
    utils.log_query('capture.get', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const {status, data} = await paypal.getOrder(req.query.id);
    res.status(status).json(data);
}; exports.get = get;

const post = async (req, res, client) => {
    utils.log_query('capture.post', req);

    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const {status, data} = await paypal.postCapture(req.body.order.id);
    await client.execute(utils.order.paid, [req.signedCookies.ync_shop, req.body.order.uuid]);
    client.execute(utils.order.select, [req.signedCookies.ync_shop, req.body.order.uuid])
        .then((result) => {
            const row = result.rows[0];
            utils.send_mail(row);
        });

    res.status(status).json(data);
}; exports.post = post;