import React from "react";
import "../errorstyles.css";

// Composant qui reçoit en props le numéro de l'erreur et la description de l'erreur, puis les affiche pour le client.
function CstmErreur({ erreur, descriptionErreur }) {

  return (
    <div className="container">
        <div className="error-container">
            <h2>Erreur: {erreur}</h2>
            <p>Description de l'erreur: {descriptionErreur}</p>
        </div>
    </div>
  );
}

export default CstmErreur;
