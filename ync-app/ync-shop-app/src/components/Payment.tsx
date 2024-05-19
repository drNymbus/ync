import { useContext } from 'react';
import APIContext from "../context/APIProvider";

function Payment() {
    const { postCommand } = useContext(APIContext);

    const time2Pay = () => {
        console.log("Yeah !");
        postCommand({});
    }

    return (
        <form onSubmit={time2Pay} >
            <div className="contact">
                <h1>Contact</h1>
                <input type="email" placeholder="Email"></input>
                <input name="newsletter"type="checkbox"/>
                <label htmlFor="newsletter">M'envoyer un mail lorsque YNC sort une nouvelle création.</label>
            </div>

            <div className="shipping">
                <h1>Livraison</h1>
                <input/>
                <input type="text" placeholder="Prénom"/>
                <input type="text" placeholder="Nom"/>
                <input type="text" placeholder="Adresse"/>
                <input type="text" placeholder="Code Postal"/>
                <input type="text" placeholder="Ville"/>
                <input type="text" placeholder="Téléphone"/>
            </div>

            <div className="shipping-method">
                <h1>MÉTHODE DE LIVRAISON</h1>
                <input name="shipping-relay" type="radio"/>
                <label htmlFor="shipping-relay">Point relai</label>
                <input name="shipping-address" type="radio"/>
                <label htmlFor="shipping-address">À mon adresse</label>
            </div>

            <div className="payment-method"> {/* We'll for now stick to a paypal payment */}
                <h1>INFORMATIONS DE MA CARTE</h1>
                <input type="text" placeholder="Numéro de Carte"/>
                <input type="text" placeholder="Date de validité"/>
                <input type="text" placeholder="CVC"/>
            </div>

            <button type="submit">JE FINALISE MON ACHAT</button>
        </form>
    );
} export default Payment;