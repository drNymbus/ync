const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PAYPAL_ENDPOINT = process.env.PAYPAL_ENDPOINT || "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const auth = async () => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await fetch(`${PAYPAL_ENDPOINT}/v1/oauth2/token`, {
        method: "POST", body: "grant_type=client_credentials",
        headers: { Authorization: `Basic ${auth}` }
    });

    const data = await response.json();
    return data.access_token;
};

const getOrder = async (order) => {
    // For an unknown reason this cannot be part of the "capture" function
    // otherwise the json function cannot parse the paypal response
    // Maybe look to ".json()" behavior in response, the answer must lie there
    const accessToken = await auth();
    const res = await fetch(`${PAYPAL_ENDPOINT}/v2/checkout/orders/${order}`, {
        method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
    });

    const data = (res.status === 200 || res.status === 201) ? await res.json() : res.body;
    return {status: res.status, data: data};
}; exports.getOrder = getOrder;

const postOrder = async (total) => {
    // For an unknown reason this cannot be part of the "order" function
    // otherwise the json function cannot parse the paypal response
    // Maybe look to ".json()" behavior in response, the answer must lie there
    const accessToken = await auth();
    const payload = { intent: "CAPTURE", purchase_units: [{ amount: { currency_code: "EUR", value: total, } }]};
    const res = await fetch(`${PAYPAL_ENDPOINT}/v2/checkout/orders`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(payload)
    });

    const data = (res.status === 200 || res.status === 201) ? await res.json(): res.body;
    return {status: res.status, data: data};
}; exports.postOrder = postOrder;

const postCapture = async (order) => {
    const accessToken = await auth();
    const res = await fetch(`${PAYPAL_ENDPOINT}/v2/checkout/orders/${order}/capture`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
    });

    const data = (res.status === 200 || res.status === 201) ? await res.json() : res.body;
    return {status: res.status, data: data};
}; exports.postCapture = postCapture;
