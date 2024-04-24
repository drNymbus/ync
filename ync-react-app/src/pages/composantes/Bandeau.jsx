import React from "react";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import "../style/styles.css";

// Bandeau --> BoutonMenu
function CstmBandeau({buttons}) {

  // Utilisation de la propriété key avec des valeurs uniques pour chaque élément de la liste (key={button.id})
  return (

    <div className="custom-bandeau">

      <div className="gauche">
        {buttons.length > 0 && (
          <CstmBoutonMenu 
            text={buttons[0].text} 
            style={buttons[0].style} 
            includeOnClick={buttons[0].includeOnClick} 
          />)}
      </div>

      <div className="droite">
        {buttons.slice(1).map((button) => (
          <CstmBoutonMenu 
            key={button.id} 
            text={button.text} 
            style={button.style} 
            includeOnClick={button.includeOnClick} 
          />))}
      </div>

    </div>
  );
}

export default CstmBandeau;

//<CstmBandeau buttons={pageData.buttonData} />
    //   [{ "id": "0",
    //     "text": "YNG SHOP", 
    //     "style": { 
    //       "marginLeft": "10px",
    //       "justifyContent": "space-between",
    //       "color": "#000000"
    //     },
    //     "includeOnClick":false
    //   },
    //   { "id": "1",
    //     "text": "Panier", 
    //     "style": { 
    //       "marginLeft": "10px", 
    //       "justifyContent": "space-between", 
    //       "color": "#111111" 
    //       },
    //       "includeOnClick":true
    //   }]