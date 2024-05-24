const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PAYPAL_ENDPOINT = process.env.PAYPAL_ENDPOINT || "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "AbJEuHlreYGdf5pC3ZoSRC6JfKS1KvOB4wir-Nb38srSNJrPlex1IOPe4YOLukiHplsIW0vlwXdLih8_";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "EENOKNWI9ypsTYljgc7di_ifAhBHjyHobGo_rNtWm-U0fy9FJf0T4yFQUkK4dNRJDW1GS1KkeT9k_Fvh";

const auth = async () => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await fetch(`${PAYPAL_ENDPOINT}/v1/oauth2/token`, {
        method: "POST", body: "grant_type=client_credentials",
        headers: { Authorization: `Basic ${auth}` }
    });

    const data = await response.json();
    // console.log("paypalToken", data);
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

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.getOrder = getOrder;

const postOrder = async (order) => {
    // For an unknown reason this cannot be part of the "order" function
    // otherwise the json function cannot parse the paypal response
    // Maybe look to ".json()" behavior in response, the answer must lie there
    const accessToken = await auth();
    const payload = { intent: "CAPTURE", purchase_units: [{ amount: { currency_code: "EUR", value: order.price, } }]};
    const res = await fetch(`${PAYPAL_ENDPOINT}/v2/checkout/orders`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }, body: JSON.stringify(payload)
    });

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.postOrder = postOrder;

const postCapture = async (order) => {
    const accessToken = await auth();
    const res = await fetch(`${PAYPAL_ENDPOINT}/v2/checkout/orders/${order}/capture`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only).
            // Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
    });

    const data = await res.json();
    data.res_status = res.status;
    return data;
}; exports.postCapture = postCapture;
