To clarify, using paypal buttons does not mean that the user cannot pay by credit card; just that Paypal is getting a payment’s slice

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/17c9f6cd-50b0-49e0-9471-730c4a1ddcc7/6954e78b-ea41-4ce8-a403-e9beb76ea127/Untitled.png)

[npm react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js) ← finally we wish to not use it to have our own custom button

https://developer.paypal.com/studio/checkout/standard/getstarted

https://developer.paypal.com/studio/checkout/standard/integrate

- No way to have custom button without dealing with paypal support :’(
    - https://medium.com/@mahdidavoodi7/how-to-have-a-fully-customized-paypal-button-in-react-b9b860d80d2d
    - https://stackoverflow.com/questions/71266823/how-to-have-a-custom-handler-instead-of-a-paypal-button-in-react

Is there a way to redirect the user ? Or create our own pop-up ?

To redirect in any way the API allows us to gather the links to the payment: https://developer.paypal.com/docs/api/orders/v2/#orders_create (rel === “approve”).

### Solution

“window.open” to create a pop-up then gathering order status from paypal API until it is processed before closing the window. Needs further testing for all browsers; from mozilla docs, this won’t work in Opera and Safari browsers → we’ll need to adapt but this is no priority.

Test credentials:

    sb-vqy7u30887067@personal.example.com
    T)x&B&0q