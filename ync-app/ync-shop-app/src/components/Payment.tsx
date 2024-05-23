import { useState, useContext } from 'react';
import APIContext from "../context/APIProvider";

function Payment({ basket, price }) {
    const { fetchItem, postOrder } = useContext(APIContext);
    const [order, setForm] = useState({
        first_name: '', name: '', phone: '', mail: '',
        address: '', postal_code: '', city: '', country: ''
    });
    const [message, setMessage] = useState('');

    // const paypalOptions = {
    //     "client-id": "test",
    //     // "enable-funding": "venmo",
    //     // "disable-funding": "",
    //     country: "FR",
    //     currency: "EUR",
    //     "data-page-type": "product-details",
    //     components: "buttons",
    //     "data-sdk-integration-source": "developer-studio",
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((order) => ({...order, [name]: value}));
    };

    const time2Pay = async () => {
        console.log({...order, items: basket, price: price});
        postOrder({...order, items: basket, price: price})
            .then((res) => console.log(res))
            .catch((e) => console.error(`[Payment;time2Pay] ${e.message} (${e.status})`));
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

            {/* <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons />
            </PayPalScriptProvider> */}
        </div>
    );
} export default Payment;