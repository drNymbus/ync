const utils = require('./utils');
const paypal = require('./paypal.js');

const item = async (req, res, client) => {
    await client.execute(utils.item.delete, [req.query.id.split(',')]); // delete item from database
    client.execute(utils.basket.select, [req.signedCookies.ync_shop]).then(() => { // retrieve basket
        res.status(200).json({'message': 'Item deleted'}); // send basket
    });
}; exports.item = item;

const order = async (req, res, client) => {
    await client.execute(utils.order.delete, [req.query.id.split(',')]); // delete item from database
    client.execute(utils.basket.select, [req.signedCookies.ync_shop]).then(() => { // retrieve basket
        res.status(200).json({'message': 'Item deleted'}); // send basket
    });
}; exports.order = order;