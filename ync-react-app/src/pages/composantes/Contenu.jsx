import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, Backdrop, Fade } from '@mui/material';
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


// Function
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
                <img src={image} alt="tableau actuel"/>
            </div>

            <div className="custom-content-description">
                <p>{description}</p>
            </div>


            <div className="custom-content-prix" onMouseEnter={togglePrice} onMouseLeave={togglePrice}>
                
                {showPrice ? (
                    <p style={{ color: "#BC2EFE" }} onClick={clickOnPrice}>{prix}</p>):(
                    <p style={{ color: "#ffffff" }}>J'AIME BIEN !</p>
                )}

                <Modal open={openConfirmationModal} onClose={closeConfirmationModal} closeAfterTransition>

                    <Fade in={openConfirmationModal}>

                        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 , width: 500}}>
                            
                            <h2>Voulez-vous ajouter cet article à votre panier ?</h2>
                            <Button onClick={handleConfirmation}>Oui</Button>
                            <Button onClick={closeConfirmationModal}>Non</Button>

                        </div>

                    </Fade>

                </Modal>

                <Modal open={openAjoutModal} onClose={closeAjoutModal} closeAfterTransition>

                    <Fade in={openAjoutModal}>

                        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 , width: 500}}>

                            <h2> {id_article} a été ajoutée au panier !</h2>
                            <h2> L'équipe YNC vous remercie pour votre confiance !</h2>

                        </div>

                    </Fade>

                </Modal>
                

            </div>


        </div>

    );
    
}

export default CstmContenu;