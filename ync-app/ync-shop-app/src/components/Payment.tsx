import { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { isChrome, isFirefox, isSafari, isOpera, isIE } from 'react-device-detect';
// import Popup from 'reactjs-popup';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import APIContext from "../context/APIProvider";

function getBrowserOptions() {
    const windowFeatures = "left=100,top=100,width=600,height=800";
    if (isChrome) {
        return ["chromeWindow", windowFeatures];
    } else if (isFirefox) {
        return ["mozillaWindow", windowFeatures];
    } else if (isOpera || isSafari) {
        return [];
    } else if (isIE) {
        return ["IEWindow", windowFeatures];
    }
}

function Payment({ basket }) {
    const { fetchItem, fetchOrder, postOrder, captureOrder } = useContext(APIContext);

    const [order, setForm] = useState({
        first_name: '', name: '', phone: '', mail: '',
        address: '', postal_code: '', city: '', country: ''
    });
    const [message, setMessage] = useState('');
    const [paying, setPaying] = useState(false);
    const [paypalPage, setPaypalPage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((order) => ({...order, [name]: value}));
    };

    const time2Pay = async () => {
        let price = 0;
        for (let item in basket) {
            await fetchItem(item)
                .then(data => price += (parseFloat(data.price) * basket[item]))
                .catch(e => console.error(`[Payment;time2pay | fetchItem] ${e.message} (${e.status})`));
        }

        let res = await postOrder({...order, items: basket, price: price});
        console.log("post", res);
        let popup = window.open(res.links[1].href, ...getBrowserOptions());

        let processed = false;
        while (!processed) {
            let order = await fetchOrder(res.id);
            console.log("fetch", order);
            if (order.status === 'APPROVED') processed = true;
            await new Promise(r => setTimeout(r, 500));
        }

        await captureOrder(res.id);
        popup?.close();
    };

    return (
        <div className="payment-form">
            <div className="payment-contact">
                <h1>Contact</h1>
                <input type="text" name="first_name" placeholder="Prénom" onChange={handleChange}/>
                <input type="text" name="name" placeholder="Nom" onChange={handleChange}/>
                <input type="text" name="phone" placeholder="Téléphone" onChange={handleChange}/>
                <input type="email" name="mail" placeholder="E-mail" onChange={handleChange}/>
                <input type="checkbox" name="newsletter" onChange={handleChange}/>
                <label htmlFor="newsletter">M'envoyer un mail lorsque YNC sort une nouvelle création.</label>
            </div>

            <div className="payment-shipping">
                <h1>Livraison</h1>
                <input type="text" name="address" placeholder="Adresse" onChange={handleChange}/>
                <input type="text" name="city" placeholder="Ville" onChange={handleChange}/>
                <input type="text" name="postal_code" placeholder="Code Postal" onChange={handleChange}/>
                <input type="text" name="country" placeholder="Pays" onChange={handleChange}/>
            </div>

            <div className="basket-recap"></div>

            <button className="payment-button" onClick={time2Pay}>JE FINALISE MON ACHAT</button>
            <p className="payment-return">{message}</p>

            {/* <Popup trigger={<button> Trigger</button>} position="right center">
                <div>Popup content here !!</div>
            </Popup> */}
            {/* <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons />
            </PayPalScriptProvider> */}
            {paying && createPortal(<iframe className="paypal-page" src={paypalPage}></iframe>, document.body)}
        </div>
    );
} export default Payment;