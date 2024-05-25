import { useState, useContext } from 'react';
import { isChrome, isFirefox, isSafari, isOpera, isIE } from 'react-device-detect';

import ShopAPIContext from "../context/ShopAPIProvider";
import MailAPIContext from "../context/MailAPIProvider";

import Basket from "./Basket";

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

async function paypalPage(order, fetchOrder, captureOrder) {
    let popup = window.open(order.links[1].href, ...getBrowserOptions());

    let res = {status: 'NONE'};
    let processed = false;
    while (!processed) {
        res = await fetchOrder(order.id);
        if (res.status === 'APPROVED' || res.status === 'COMPLETED') processed = true;
    }

    await captureOrder(order.id);
    popup?.close();
    return res;
}

function Payment({ basket }) {
    const { fetchItem, fetchOrder, postOrder, captureOrder } = useContext(ShopAPIContext);
    const { mailConfirmation } = useContext(MailAPIContext);

    const [order, setForm] = useState({
        first_name: '', name: '', phone: '', mail: '',
        address: '', postal_code: '', city: '', country: ''
    });
    const [approved, setApproved] = useState('');

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
        await paypalPage(res, fetchOrder, captureOrder).then((order) => {
            // @TODO
            // Page element to thank user;
            setApproved(order.status);
            // mailConfirmation(order);
        }).catch(e => console.error(`[Payment;time2pay] ${e.message} (${e.status})`));
    };

    return (
        <div className="payment">
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
            </div>
            <div className="payment-basket">
                <Basket basket={basket}/>
            </div>
            {(approved !== '') && (
                <div className="payment-message">
                    <p>Thanks!</p>
                </div>
            )}
        </div>

    );
} export default Payment;