import React, { useState } from "react";
import "../style/styles.css";

function CstmContenu({ image, description, prix }) {
  // State
  const [showPrice, setShowPrice] = useState(false);

  const togglePrice = () => {
    setShowPrice(!showPrice);
  };

  return (
    <div className="custom-content-container">

        <div className="custom-content-image">

          {/* Image du tableau Quelconque */}
          <img src={image} alt="tableau actuel" />

          {/* Description et prix de Quelconque */}
          <div className="custom-content-description">

            {/* Description */}
            <p>{description}</p>

            {/* Bouton Prix */}
            <div className="custom-content-prix" onMouseEnter={togglePrice}
                                               onMouseLeave={togglePrice}>
              {showPrice ? 
                (<p style={{ color: "#FFFFFF" }}>{prix}</p>) :
                (<p style={{ color: "#BC2EFE" }} onClick={togglePrice}>Je le veux</p>)}
            </div>

          </div>

          

        </div>
      
    </div>
  );
}

export default CstmContenu;
