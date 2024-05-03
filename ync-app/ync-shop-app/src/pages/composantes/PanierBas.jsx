import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../style/styles.css";


function CstmPanierBas({compteurMontant, prixLivraison}) {

// State
    const [montant, setMontant] = useState(null);


// useNavigate Hook
    const navigate = useNavigate();


// Function
    const calculerMontant = (compteurMnt) => {

        const mnt_values = Object.values(compteurMnt);
        const mnt = mnt_values.reduce((acc, val) => acc + val, 0);

        return mnt;
    }
    
    
    const on_click = () => { 
        navigate("/paiement");
    };
    

// useEffect Hook
    useEffect(() => {

        const mnt= calculerMontant(compteurMontant);
        setMontant(mnt);

    }, []);


// Render
    return (

        <div className="panier_bas_parent">

            <div className="montant">

                <div className="label_amount">Montant</div>
                {montant && <div className="amount">{montant}€</div>}

            </div>

            <div className="montant_delivery">

                <div className="label_delivery">Livraison</div>
                {prixLivraison && <div className="delivery_price">{prixLivraison}€</div>}

            </div>

            <div className="montant_total">

                <div className="label_total">Total</div>
                {montant && prixLivraison && <div className="total_price">{montant + prixLivraison}€</div>}

            </div>

            <button onClick={on_click}>Passer à la suite</button>

        </div>

    );
    
}

export default CstmPanierBas;