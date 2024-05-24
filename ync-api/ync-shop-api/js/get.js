const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils');
const paypal = require('./paypal.js');

const createSession = async (_, res, client) => {
    // No existing session: generate and sign a new cookie
    let cookie = uuid.random();

    await client.execute(utils.session.insert, [cookie, false, Date.now()]); // create session
    // await client.execute(utils.basket.insert, [cookie]); // create basket
    client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
        res.cookie('ync_shop', cookie, {
            path: '/store', signed: true, SameSite: true, Partitionned: undefined
        });
        res.status(200).json(result.rows[0]); // send basket
    });
}; exports.createSession = createSession;

const retrieveSession = async (req, res, client) => {
    let cookie = req.signedCookies.ync_shop;
    await client.execute(utils.session.update, [Date.now(), cookie]); // update session
    // Send another/new cookie to the user ?
    client.execute(utils.basket.select, [cookie]).then((result) => { // retrieve basket
        res.status(200).json(result.rows[0]); // send basket
    });
}; exports.retrieveSession = retrieveSession;

const item = async (req, res, client) => {
    if (req.query.id === undefined) { // Retrieve all store items
        client.execute(utils.item.select_all).then((result) => { // retrieve item
            res.status(200).json(result.rows); // send item
        });
    } else { // Retrieve items specified in query id field
        client.execute(utils.item.select, [req.query.id.split(',')]).then((result) => { // retrieve item.s
            let data = result.rows;
            for (let i = 0; i < data.length; i++) {
                const blob = data[i].image;
                const image = (blob === undefined || blob === null) ? "undefined" : blob.toString('base64');
                data[i].image = `data:image/jpeg;base64,${image}`;
            }

            res.status(200).json(data); // send item.s
        });
    }
}; exports.item = item;

const order = (req, res, client) => {
    // client.execute(utils.order.select, [req.query.id.split(','), cookie]).then((result) => { // retrieve order
    //     res.status(200).json(result.rows); // send order
    // });
}; exports.order = order;

const capture = async (req, res, __) => {
    const content = await paypal.getOrder(req.query.id);
    res.status(content.res_status).json(content);
}; exports.capture = capture;
