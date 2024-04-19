import React, {useContext, useEffect} from "react";
import ArticleContext from "../context/ArticleDataProvider";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import DataContext from "../context/BrutDataProvider";
import "../styles.css";

// Composante Acceuil --> appelle les composantes Bandeau, Section, Contenu
function CstmAccueil() {

  // Utilisation du hook useContext pour accéder au contexte DataContext, à sa variable pageData et fonction fetchDataForPage
  const { fetchDataForPage, pageData } = useContext(DataContext); // Déstructuration des valeurs de fetchDataForPage et pageData

  useEffect(() => {
    fetchDataForPage("accueil"); // Utilisation de la fonction fetchDataForPage du context DataContext pour charger les données de la page "accueil"
  }, []); // Cette fonction est exécutée une seule fois au chargement de la page car le tableau de dépendances est vide ([]). Cela signifie qu'il n'y a aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent.

  console.log(pageData);

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

  // Utilisation du hook useContext pour accéder au contexte ArticleContext, à sa variable article et fonction fetchArticleForPage
  const {article} = useContext(ArticleContext);
  const [premierArticle] = article[0];

  return (
    <div className="custom-full-page-content">
      <CstmBandeau buttons={pageData.buttonData} />
      <CstmSection image={pageData.image} name={pageData.name} />
      <CstmContenu
        image={premierArticle.image}
        description={premierArticle.description}
        prix={premierArticle.price}
      />
    </div>
  );
}

export default CstmAccueil;
