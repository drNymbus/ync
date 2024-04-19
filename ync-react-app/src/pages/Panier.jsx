import React, {useContext, useEffect} from "react";
import ArticleContext from "../context/ArticleDataProvider";
import Props from "../context/PropsProvider";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmPanierHaut from "./composantes/PanierHaut";
import CstmPanierBas from "./composantes/PanierBas";
import DataContext from "../context/BrutDataProvider";
import "../styles.css";

// Panier --> appelle les composantes Bandeau, Section, PanierHaut, PanierBas
function CstmPanier() {

  // Utilisation du hook useContext pour accéder au contexte DataContext, à sa variable pageData et fonction fetchDataForPage
  const { fetchDataForPage, pageData } = useContext(DataContext); // Déstructuration des valeurs de fetchDataForPage et pageData

  useEffect(() => {
    fetchDataForPage("panier"); // Utilisation de la fonction fetchDataForPage du context DataContext pour charger les données de la page "panier"
  }, []); // Cette fonction est exécutée une seule fois au chargement de la page car le tableau de dépendances est vide ([]). Cela signifie qu'il n'y a aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent.

  console.log(pageData);

  // { 
  //  buttonData: [
  //   { 
  //     "text": "YNG SHOP", 
  //     "style": { 
  //       "marginLeft": "10px",
  //       "justifyContent": "space-between",
  //       "color": "#000000"
  //     },
  //     "includeOnClick":false
  //   },
  //   { 
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

// Hook useContext pour accéder aux données du contexte article et props qui contiennent /// ///
const {article} = useContext(ArticleContext);
const [premierArticle] = article[0];
const {props} = useContext(Props);
const [p_sectionProps] = props.sectionProps[1];

  return (
    <div>
      <CstmBandeau buttons={pageData.buttonData} />
      <CstmSection image={pageData.image} name={pageData.name} />
      <CstmPanierHaut image={premierArticle.image}
        description={premierArticle.description}
        prix={premierArticle.prix}/>
      <CstmPanierBas />
    </div>
  );
}

export default CstmPanier;
