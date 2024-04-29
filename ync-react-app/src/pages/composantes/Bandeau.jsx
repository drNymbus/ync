import React from "react";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import "../style/styles.css";


// Bandeau --> BoutonMenu
function CstmBandeau({buttons}) {

// Render
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

                {buttons.slice(1).map((button) => (<CstmBoutonMenu key={button.id} text={button.text} style={button.style} includeOnClick={button.includeOnClick} />))}
                
            </div>
      <div className="bandeau_droite">
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