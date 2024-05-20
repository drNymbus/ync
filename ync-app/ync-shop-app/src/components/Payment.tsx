import { useState, useContext } from 'react';
import APIContext from "../context/APIProvider";

function Payment({ basket }) {
    const [command, setForm] = useState({
        first_name: '', name: '', phone: '', mail: '',
        address: '', postal_code: '', city: '', country: ''
    });
    const { postCommand } = useContext(APIContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((command) => ({...command, [name]: value}));
    };

    const time2Pay = () => {
        console.log(basket);
        console.log({...command, items: basket, item_count: -1});
        postCommand({...command, items: basket, item_count: -1});
    };

    return (
        <div className="payment-form">
            <div className="contact">
                <h1>Contact</h1>
                <input type="text" name="first_name" placeholder="Prénom" onChange={handleChange}/>
                <input type="text" name="name" placeholder="Nom" onChange={handleChange}/>
                <input type="text" name="phone" placeholder="Téléphone" onChange={handleChange}/>
                <input type="email" name="mail" placeholder="E-mail" onChange={handleChange}/>
                <input type="checkbox" name="newsletter" onChange={handleChange}/>
                <label htmlFor="newsletter">M'envoyer un mail lorsque YNC sort une nouvelle création.</label>
            </div>

            <div className="shipping">
                <h1>Livraison</h1>
                <input type="text" name="address" placeholder="Adresse" onChange={handleChange}/>
                <input type="text" name="postal_code" placeholder="Code Postal" onChange={handleChange}/>
                <input type="text" name="city" placeholder="Ville" onChange={handleChange}/>
                <input type="text" name="country" placeholder="Pays" onChange={handleChange}/>
            </div>

            <button onClick={time2Pay}>JE FINALISE MON ACHAT</button>
        </div>
    );
} export default Payment;