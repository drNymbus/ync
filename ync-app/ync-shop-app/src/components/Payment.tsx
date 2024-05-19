import { useContext } from 'react';
import APIContext from "../context/APIProvider";

function Payment({ basket }) {
    const { postCommand } = useContext(APIContext);

    function time2Pay(form) {
        let command = {
            id: 0,
            items: basket,
            address: form.get("address"), postal_code: form.get("postal_code"), country: form.get("country"),
            name: form.get("name"), first_name: form.get("first_name"),
            mail: form.get("mail"), phone: form.get("phone")
        };
        postCommand(command);
    }

    return (
        <form action={time2Pay} >
            <div className="contact">
                <h1>Contact</h1>
                <input type="email" placeholder="Email"></input>
                <input name="newsletter"type="checkbox"/>
                <label htmlFor="newsletter">M'envoyer un mail lorsque YNC sort une nouvelle création.</label>
            </div>

            <div className="shipping">
                <h1>Livraison</h1>
                <input/>
                <input type="text" name="address" placeholder="Adresse"/>
                <input type="text" name="postal_code" placeholder="Code Postal"/>
                <input type="text" name="city" placeholder="Ville"/>
                <input type="text" name="country" placeholder="Pays"/>

                <input type="text" name="first_name" placeholder="Prénom"/>
                <input type="text" name="name" placeholder="Nom"/>
                <input type="text" name="phone" placeholder="Téléphone"/>
                <input type="text" name="mail" placeholder="E-mail"/>
            </div>

            {/* <div className="shipping-method">
                <h1>MÉTHODE DE LIVRAISON</h1>
                <input name="shipping-relay" type="radio"/>
                <label htmlFor="shipping-relay">Point relai</label>
                <input name="shipping-address" type="radio"/>
                <label htmlFor="shipping-address">À mon adresse</label>
            </div> */}

            <div className="payment-method">
                {/* We'll for now stick to a paypal payment */}
            </div>

            <button type="submit">JE FINALISE MON ACHAT</button>
        </form>
    );
} export default Payment;