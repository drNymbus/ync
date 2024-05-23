import { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
// import Popup from 'reactjs-popup';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import APIContext from "../context/APIProvider";

function Payment({ basket }) {
    const { fetchItem, postOrder } = useContext(APIContext);

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

    // const paypalOptions = {
    //     "client-id": "AbJEuHlreYGdf5pC3ZoSRC6JfKS1KvOB4wir-Nb38srSNJrPlex1IOPe4YOLukiHplsIW0vlwXdLih8_",
    //     "enable-funding": "paypal",
    //     "disable-funding": "creditcard",
    //     // country: "CA",
    //     currency: "EUR",
    //     "data-page-type": "product-details",
    //     components: "buttons",
    //     "data-sdk-integration-source": "developer-studio",
    //   };

    const time2Pay = async () => {
        let price = 0;
        for (let item in basket) {
            await fetchItem(item)
                .then(data => price += (parseFloat(data.price) * basket[item]))
                .catch(e => console.error(`[Payment;time2pay | fetchItem] ${e.message} (${e.status})`));
        }

        console.log({...order, items: basket, price: price});
        const res = await postOrder({...order, items: basket, price: price});
        console.log(res);
        await setPaypalPage(res.links[1].href);
        setPaying(true);
        // Maybe wait for an event in useEffect to set the modal to false and redirecting to thank you page ?;
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