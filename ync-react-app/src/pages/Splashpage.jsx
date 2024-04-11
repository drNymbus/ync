import React, { useState } from "react";
import "../styles.css";

function LogoComponent({ content }) {
  // States
  // Comportements
  const [videoEnded, setVideoEnded] = useState(false);
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };
  // Affichages
  return (
    <div className="video-container">
      {!videoEnded ? (
        <video autoPlay muted onEnded={handleVideoEnd}>
          <source src="/videos/logo_yng.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      ) : (
        <div>{content ? content : "Veuillez recharger la page."}</div>
      )}
    </div>
  );
}

export default LogoComponent;
