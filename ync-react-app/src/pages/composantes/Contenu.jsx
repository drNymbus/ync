import React, { useEffect, useContext, useState } from "react";
// import { Button, Modal, Backdrop, Fade } from '@mui/material';
import ArticleContext from "../context/ArticleDataProvider";
import "../style/styles.css";

function CstmContenu({ id_article, image, description, prix }) {
  // State
  const [showPrice, setShowPrice] = useState(false); // false affiche le texte, au survol affiche le prix
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openAjoutModal, setOpenAjoutModal] = useState(false);
  const [temps_affichage, setTemps_affichage] = useState(2000);

  // useContex Hook
  const { postPanierData } = useContext(ArticleContext);

  //Function
  const togglePrice = () => {
    setShowPrice(!showPrice);
  };

  const clickOnPrice = () => {
    setOpenConfirmationModal(true); // Ouvre le modal confirmation
};

const closeConfirmationModal = () => {
    setOpenConfirmationModal(false); // Ferme le modal confirmation
    setShowPrice(!showPrice);
};

const closeAjoutModal = () => {
    setOpenAjoutModal(false); // Ferme le modal
    setShowPrice(!showPrice);
};


const handleConfirmation = () => {
    setOpenConfirmationModal(false); // Ferme le modal confirmation
    setOpenAjoutModal(true);
};


// useEffect Hook
useEffect(() => {
    
  if (openAjoutModal) {

    postPanierData(id_article).then(newPanier => {
      console.log(`${newPanier} "panier"`);
      console.log(`${id_article} ajoutée`);    
    })
        
    .catch(error => {
      console.error("Une erreur s'est produite :", error.message);
    });

    setTimeout(() => {
      setOpenAjoutModal(false);
    }, 2000); // Ferme le modal après 2 secondes
    
    setShowPrice(!showPrice);
    }

}, [openAjoutModal]);


// Render
return (
<div className="custom-content-container">

  <div className="custom-content-image">

    {/* Image du tableau Quelconque */}
    <img src={image} alt="tableau actuel" />

    {/* Div Description et prix de Quelconque */}
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
