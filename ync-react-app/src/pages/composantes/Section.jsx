import React from "react";
import "../../styles.css";

function CstmSection({ image, name }) {
  return (
    <div className="custom-section-container">
      <div className="custom-section-image">
        <img src={image} alt="Section actuelle" />
      </div>
      <div className="custom-section-title">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default CstmSection;
