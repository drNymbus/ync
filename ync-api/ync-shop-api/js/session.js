const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils');

const createSession = async (_, res, client) => {
    // No existing session: generate and sign a new cookie
    let cookie = uuid.random();

    await client.execute(utils.session.insert, [cookie, false, Date.now()]);
    client.execute(utils.basket.select, [cookie]).then((result) => {
        res.cookie('ync_shop', cookie, {
            path: '/store', signed: true, SameSite: true, Partitionned: undefined
        });
        res.status(200).json(result.rows[0]); // send basket
    });
}; exports.createSession = createSession;

const retrieveSession = async (req, res, client) => {
    let cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    await client.execute(utils.session.update, [Date.now(), cookie]);
    // Send another/new cookie to the user ?
    client.execute(utils.basket.select, [cookie]).then((result) => {
        res.status(200).json(result.rows[0]); // send basket
    });
}; exports.retrieveSession = retrieveSession;
