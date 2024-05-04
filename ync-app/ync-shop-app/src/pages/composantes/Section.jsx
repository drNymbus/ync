import React from "react";
import "../style/styles.css";


function CstmSection({ image, name }) {

// Render
return (

<div className="custom-section-container">

    <div className="custom-section-image">

        <img src={image} alt="Home Icon" />

    </div>

    <div className="custom-section-title">

        <p>{name}</p>

    </div>

</div>

);

}

export default CstmSection;
