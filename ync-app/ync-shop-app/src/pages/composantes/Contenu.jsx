import React, { useEffect, useContext, useState } from "react";

import CstmBouton from "./sous_composantes/Bouton";

import ArticleContext from "../context/ArticleDataProvider";
import DataContext from "../context/BrutDataProvider";

import "../style/styles.css";


function CstmContenu({ page }) {

// State

    const [buttons, setButtons] = useState(null);
    const [article, setArticle] = useState(null);


// A supprimer plus tard, image devra etre donné par article.image !!
    const [image, setImage] = useState("../../assets/tableau_quelconque.png");
    

// Context
    const { fetchContentData } = useContext(DataContext);
    const { fetchArticleData } = useContext(ArticleContext);


// Effect
    useEffect(() => {
        
        const content_data = fetchContentData(page);
        console.log(content_data)
        
        setButtons(content_data.button_data);


        fetchArticleData(content_data.id_article_vitrine).then(articleData => {

            setArticle(articleData);

            setButtons(prevButtons => {
    
                const updatedFirstButton = { ...prevButtons[0], prix: articleData.price };
                return [updatedFirstButton, ...prevButtons.slice(1)];
                
            });

        })
        .catch(error => {
            console.error("Une erreur s'est produite :", error.message);
        });
        

    }, []);


// Render
    return (

        <div className="custom-content-container">

            { article && buttons && <div className="custom-content-image">

                {/* Image du tableau Quelconque */}
                <img src={image} alt="tableau actuel" />

                <div className="custom-content-description">

                    {/* Description */}
                    <p>{article.description}</p>

                    {/* Bouton */}
                    <CstmBouton button_props={buttons[0]} />


                </div>

                    

            </div> }
            
        </div>

    );

}

export default CstmContenu;

// Dans le JSX, l'expression entre accolades {} est interprétée comme du code JavaScript. Dans JavaScript, les instructions conditionnelles if 
// ne peuvent pas être utilisées à l'intérieur des expressions JSX.