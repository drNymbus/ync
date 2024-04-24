import React, { useState } from "react";
import "./style/styles.css";

function LogoComponent({ content }) {
  const [videoEnded, setVideoEnded] = useState(false);

  // Fonction pour mettre à jour l'état de la vidéo lorsqu'elle se termine
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // Affiche la vidéo si elle n'est pas terminée, sinon affiche le contenu alternatif {content}
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
