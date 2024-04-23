import React, {useContext, useEffect, useState } from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import ArticleContext from "../context/ArticleDataProvider";
import DataContext from "../context/BrutDataProvider";
import "../styles.css";

// Acceuil --> Bandeau, Section, Contenu
function CstmAccueil() {

  // Initialisation à null pour le dynamic tcheck lors de la création des composants
  const [pageData, setPageData] = useState(null); 
  const [article, setArticle] = useState(null);

  // Utilisation du hook useContext pour accéder au contexte DataContext et à sa fonction fetchDataForPage, au contexte ArticleContext, à sa fonction fetchArticleData
  const { fetchDataForPage } = useContext(DataContext); 
  const { fetchArticleData } = useContext(ArticleContext);


  useEffect(() => {

    const pageD = fetchDataForPage("accueil"); // Utilisation de la fonction fetchDataForPage pour charger les données de la page "accueil"
    setPageData(pageD); 
    // console.log(pageD);
    
    fetchArticleData("quelconque_1") // .then .cath car utilisation d'une fonction faisant appel à une promesse
      .then(articleD => {
        setArticle(articleD);
        // console.log(articleD); // Affiche les données de l'article
      })
      .catch(error => {
        console.error("Une erreur s'est produite :", error.message);
      });

  }, []); // Exécutée une seule fois au chargement de la page car tableau de dépendances vide ([]). 
  //Aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent, ici non.


// Dynamic tcheck pour article et pageData
  return (
    <div className="custom-full-page-content">
      {pageData && <CstmBandeau buttons={pageData.buttonData} />}
      {pageData && <CstmSection image={pageData.sectionData.image} name={pageData.sectionData.name} />}
      {article && <CstmContenu
        image={"../../images/tableau_quelconque.png"}
        description={article.description}
        prix={article.price}
      />}
    </div>
  ); // image={article.image}
}

export default CstmAccueil;
  // {
  //     "item_id": "",
  //     "description": "",
  //     "display_name": "",
  //     "image": [],
  //     "price": ""
  // }
  // { 
  //  buttonData: [
  //   { "id": "0",
  //     "text": "YNG SHOP", 
  //     "style": { 
  //       "marginLeft": "10px",
  //       "justifyContent": "space-between",
  //       "color": "#000000"
  //     },
  //     "includeOnClick":false
  //   },
  //   { "id": "1",
  //     "text": "Panier", 
  //     "style": { 
  //       "marginLeft": "10px", 
  //       "justifyContent": "space-between", 
  //       "color": "#111111" 
  //       },
  //       "includeOnClick":true
  //   }],
  //   sectionData: { 
  //     "image": "images/sectionQuelconque.png", 
  //     "name": "Quelconque" 
  //   }
  // };
  
  
