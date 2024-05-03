import React, { useEffect, useContext, useState } from "react";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Backdrop, Fade } from '@mui/material';
import ArticleContext from "../context/ArticleDataProvider";
import "../style/styles.css";

function CstmContenu({ id_article, image, description, prix, button }) {

// // State
//     const [showPrice, setShowPrice] = useState(false); // false affiche le texte, au survol affiche le prix

// useContext Hook
    // const { fetchPanierData, postPanierData } = useContext(ArticleContext);


// useNavigate Hook
    // const navigate = useNavigate();


//Function
    // const togglePrice = () => {
    //     setShowPrice(!showPrice);
    // };

    // const clickOnPrice = () => {

    //     fetchPanierData().then(panier => {  // Recupération du panier d'origine


    //         console.log("panier.length", panier.length);
    //         console.log("panier=", panier);


    //         if (panier.length === 0){       // Si le panier est vide, ajout d'un article "id_article" au panier + renvoie du nouveau panier 


    //             postPanierData(id_article).then(newPanier => {

    //                 if (newPanier.length === 1){

    //                     console.log("newPanier.length", newPanier.length);

    //                     console.log(`${newPanier} "nouveau panier"`);
    //                     console.log(`${id_article} ajoutée`);

    //                 } else {
    //                     navigate("erreur");//Redirection vers page erreur
    //                 }
                    
    //             }).catch(error => {
    //                 console.error("Une erreur s'est produite :", error.message);
    //             });


    //         }else {                         
    //             navigate("panier");// Redirection page panier
    //         }


    //     }).catch(error => {
    //         console.error("Une erreur s'est produite :", error.message);
    //     });

    // };


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
                    <CstmBoutonMenu 
                        text={button.text} 
                        style={button.style}
                        navigation={button.navigation}
                        component_contents={button.component_contents}
                    />

                </div>

                    

            </div>
            
        </div>

    );

    }

    export default CstmContenu;