import React from "react";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import "../style/styles.css";


// Bandeau --> BoutonMenu
function CstmBandeau({buttons}) {

    // Render
    return (

        <div className="custom-bandeau">

            <div className="bandeau_gauche">

            {buttons.length > 0 && (
            <CstmBoutonMenu 
                text={buttons[0].text} 
                style={buttons[0].style}
                navigation={buttons[0].navigation}
                functions={buttons[0].functions}
                component_contents={buttons[0].component_contents}
            />)}

            </div>

            <div className="bandeau_droite">

            {buttons.slice(1).map((button) => (
            <CstmBoutonMenu 
                key={button.id} 
                text={button.text} 
                style={button.style} 
                navigation={button.navigation}
                functions={button.functions}
                component_contents={button.component_contents} 
            />))}

            </div>

        </div>

    );

    }

    export default CstmBandeau;