import React from "react";
import CstmIncrementationPanier from "./sous_composantes/IncrementationPanier";
import "../style/styles.css";


function CstmPanierHaut({titre, image, prix, description_livraison, categorie, nombre, nbrIncrementationMax}) {

// Render
    return (

        <div className="container_article">

            <div className="container_article_recap">
                
                <img src={image} alt="Image article" />
                <h2 className="title"> {titre} </h2>
                <p className="description"> {description_livraison} </p>
                
                <CstmIncrementationPanier icone={categorie} nombre={nombre} nbrIncrementationMax={nbrIncrementationMax}/>

            </div>

            <div className="container_article_prix">

                <p className="price"> {prix} </p>
                
            </div>

        </div>

    );

}

export default CstmPanierHaut;
