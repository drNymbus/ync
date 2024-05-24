const uuid = require('cassandra-driver').types.Uuid;
const utils = require('./utils');
const paypal = require('./paypal.js');

const basket = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
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
}; exports.basket = basket;

const item = async (req, res, client) => {
    const valid_ids = [], unvalid_ids = [];

    for (let i in req.body) {
        let src_item = req.body[i], id = req.body[i].id; // item information
        await client.execute(utils.item.insert, src_item, {prepare:true}) // add item to table
            .then(() => { valid_ids.push(id); }) // If promise completed add id to valid ids
            .catch(() => { unvalid_ids.push(id); }); // If promise failed add id to unvalid ids
    }

    res.status(200).json({completed: valid_ids, rejected: unvalid_ids}); // send all ids (completed & rejected)
}; exports.item = item;

const order = async (req, res, client) => {
    const content = await paypal.postOrder(req.body.order);
    let order = {...req.body.order, cookie: req.signedCookies.ync_shop, id: uuid.random()};
    await client.execute(utils.order.insert, order, {prepare:true});

    res.status(content.res_status).json(content);
}; exports.order = order;

const capture = async (req, res, client) => {
    const content = await paypal.postCapture(req.body.order);
    res.status(content.res_status).json(content);
}; exports.capture = capture;