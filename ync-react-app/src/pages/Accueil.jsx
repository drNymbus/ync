import React, {useContext, useEffect, useState } from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import ArticleContext from "./context/ArticleDataProvider";
import DataContext from "./context/BrutDataProvider";
import "./style/styles.css";


// Acceuil --> Bandeau, Section, Contenu
function CstmAccueil() {

// State
    const [pageData, setPageData] = useState(null);
    const [articleData, setArticleData] = useState(null);


// useContexte Hook
    const { fetchDataForPage } = useContext(DataContext); 
    const { fetchArticleData } = useContext(ArticleContext);


// useEffect Hook
    useEffect(() => {

        const pageD = fetchDataForPage("accueil");
        console.log(pageD)
        setPageData(pageD); 

        fetchArticleData(pageD.id_article_accueil)
        .then(articleD => {
            setArticleData(articleD);
        })
        .catch(error => {
            console.error("Une erreur s'est produite :", error.message);
        });

    }, []); // Exécutée une seule fois au chargement de la page car tableau de dépendances vide ([]). 
    //Aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent, ici non.


// Render
    return (

        <div className="custom-full-page-content">

            {pageData && <CstmBandeau buttons={pageData.buttonDataBandeau} />}

            {pageData && <CstmSection image={pageData.sectionData.image} name={pageData.sectionData.name} />}

            {articleData && <CstmContenu
                id_article={pageData.id_article_accueil}
                image={"../../assets/tableau_quelconque.png"}
                description={articleData.description}
                prix={articleData.price}
                button={pageData.buttonData}
            />}

        </div>

    ); // image={articleData.image}

}

export default CstmAccueil;