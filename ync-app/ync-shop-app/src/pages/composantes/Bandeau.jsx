import React , {useState, useContext, useEffect} from "react";

import CstmBouton from "./sous_composantes/Bouton";
import DataContext from "../context/BrutDataProvider";

import "../style/styles.css";


function CstmBandeau({page}) {

// State
    const [buttons, setBouttons] = useState(null);


// Context
    const { fetchBannerData } = useContext(DataContext);


// Effect
    useEffect(() => {

        const banner_data = fetchBannerData(page);
        setBouttons(banner_data.button_data);

    }, []);


// Render
    return (

        <div className="custom-bandeau">


            {buttons && <div className="bandeau_gauche">

                {buttons.length > 0 && ( <CstmBouton button_props={buttons[0]} />)}

            </div>}


            { buttons && <div className="bandeau_droite">

                {buttons.slice(1).map((button) => (<CstmBouton button_props={button} />))}

            </div> }


        </div>

    );

}

export default CstmBandeau;


        // const {openPanierModal}= useContext(BoutonContext);
    // useEffect(() => {
    //     console.log("La valeur de openPanierModal a changé :", openPanierModal);
    // }, [openPanierModal]);

    // {/* {openPanierModal && (

    //                 <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, width: 500 }}>
    //                     <h2> Vous n'avez pas de produit dans votre panier </h2>
    //                 </div>

    //             )} */}:;l