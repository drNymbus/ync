const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils');

const createSession = async (req, res, client) => {
    utils.log_query('session.get.create', req);
    // No existing session: generate and sign a new cookie
    let cookie = uuid.random();

    await client.execute(utils.session.insert, [cookie, Date.now()]);
    client.execute(utils.basket.select, [cookie])
        .then((result) => {
            // const expires = new Date(Date.now() + 60 * 60 * 1000);
            res.cookie('ync_shop', cookie, {signed:true, sameSite:true});
            res.status(200).json(result.rows[0]);
        })
        .catch((error) => {
            console.error('session.createSession', error);
            res.status(500).json({'error': 'Internal server error'})
        });
}; exports.createSession = createSession;

const retrieveSession = async (req, res, client) => {
    utils.log_query('session.get.retrieve', req);

    let cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    await client.execute(utils.session.update, [Date.now(), cookie]);
    // Send another/new cookie to the user ?
    client.execute(utils.basket.select, [cookie])
        .then((result) => res.status(200).json(result.rows[0]))
        .catch((error) => {
            console.error('session.retrieveSession', error);
            res.status(500).json({'error': 'Internal server error'})
        });
}; exports.retrieveSession = retrieveSession;
