import React, {useContext, useEffect, useState } from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import ArticleContext from "./context/ArticleDataProvider";
import DataContext from "./context/BrutDataProvider";
import "./style/styles.css";

// Acceuil --> Bandeau, Section, Contenu
function CstmAccueil() {

  const [pageData, setPageData] = useState(null); 
  const [article, setArticle] = useState(null);

  const { fetchDataForPage } = useContext(DataContext); 
  const { fetchArticleData } = useContext(ArticleContext);

  useEffect(() => {

    const pageD = fetchDataForPage("accueil");
    setPageData(pageD); 
    
    fetchArticleData("quelconque_1")
      .then(articleD => {
        setArticle(articleD);
      })
      .catch(error => {
        console.error("Une erreur s'est produite :", error.message);
      });

  }, []); // Exécutée une seule fois au chargement de la page car tableau de dépendances vide ([]). 
  //Aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent, ici non.

// Dynamic check pour article et pageData
  return (
    <div className="custom-full-page-content">
      {pageData && <CstmBandeau buttons={pageData.buttonData} />}
      {pageData && <CstmSection image={pageData.sectionData.image} name={pageData.sectionData.name} />}
      {article && <CstmContenu
        image={"../../assets/tableau_quelconque.png"}
        description={article.description}
        prix={article.price}
      />}
    </div>
  ); // image={article.image}
}

export default CstmAccueil;