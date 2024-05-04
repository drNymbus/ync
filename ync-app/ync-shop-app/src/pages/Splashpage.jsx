import React, { useState } from "react";
import "./style/styles.css";

function LogoComponent({ content }) {

// State
    const [videoEnded, setVideoEnded] = useState(false);


// Function
    const handleVideoEnd = () => {
        setVideoEnded(true);
    };


// Render
    return (

        <div className="video-container">

            {!videoEnded ? (
                <video autoPlay muted onEnded={handleVideoEnd}>
                    <source src="/assets/logo_yng.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            ) : (
                <div>{content ? content : "Veuillez recharger la page."}</div>
            )}

        </div>

    );

}

export default LogoComponent;
