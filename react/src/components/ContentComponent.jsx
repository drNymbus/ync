import React, { useState } from "react";
import "../styles.css";

function CustomContent({ image, description, prix }) {
  // State
  const [showPrice, setShowPrice] = useState(false);

  const togglePrice = () => {
    setShowPrice(!showPrice);
  };

  return (
    <div className="custom-content-container">
      <div className="custom-content-image">
        <img src={image} alt="tableau actuel" />
      </div>
      <div className="custom-content-description">
        <p>{description}</p>
      </div>
      <div
        className="custom-content-prix"
        onMouseEnter={togglePrice}
        onMouseLeave={togglePrice}
      >
        {showPrice ? (
          <p style={{ color: "#BC2EFE" }}>{prix}</p>
        ) : (
          <p style={{ color: "#ffffff" }} onClick={togglePrice}>
            J'AIME BIEN !
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomContent;
