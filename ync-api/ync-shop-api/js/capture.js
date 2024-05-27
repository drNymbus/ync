const utils = require('./utils.js');
const paypal = require('./paypal.js');

const get = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const content = await paypal.getOrder(req.query.id);
    res.status(content.res_status).json(content);
}; exports.get = get;

const send_confirmation_mail = async (order) => {
    console.log("SENDING MAIL: ", order);

    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu", port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.ZOHO_MAIL || "yng.corporation@zohomail.eu",
            pass: process.env.ZOHO_PASSWORD || "pQ1*LbzBvKApeIkN"
        }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Young New Corporation" <yng.corporation@zohomail.eu>',
        to: order.mail,

        subject: "Yooo ! Wooooo !",
        text: `Bonjour ${order.first_name} ${order.name}, merci d'avoir commandé ! ID: ${order.id}`,
        html: `<p>Bonjour ${order.first_name} ${order.name}</p><p>, merci d'avoir commandé !</p><p> ID: <b>${order.id}</b></p>`
    });

    console.log("Message sent: %s", info.messageId);
    return info;
};

const post = async (req, res, client) => {
    const cookie = req.signedCookies.ync_shop;
    if (!utils.assert_cookie(client, cookie)) return utils.failed_request(res, 401, {'error': 'Invalid cookie'});

    const content = await paypal.postCapture(req.body.order.id);
    await client.execute(utils.order.paid, [req.signedCookies.ync_shop, req.body.order.uuid], {prepare:true})
        .then(_ => {
            client.execute(utils.order.select, [req.signedCookies.ync_shop, req.body.order.uuid], {prepare: true})
                .then((result) => send_confirmation_mail(result.rows[0]));
        })
        .catch(() => console.error('Order UUID not found'));

    res.status(content.res_status).json(content);
}; exports.post = post;