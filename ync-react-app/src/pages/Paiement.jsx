import React, {useContext, useEffect} from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import DataContext from "../context/BrutDataProvider";
import "../styles.css";

// Paiement --> Bandeau, Section, ???
function CstmPaiement() {

  // Utilisation du hook useContext pour accéder au contexte DataContext, à sa variable pageData et fonction fetchDataForPage
  const { fetchDataForPage, pageData } = useContext(DataContext); // Déstructuration des valeurs de fetchDataForPage et pageData

  useEffect(() => {
    fetchDataForPage("paiement"); // Utilisation de la fonction fetchDataForPage du context DataContext pour charger les données de la page "paiement"
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

  return (
    <div>
      <CstmBandeau buttons={pageData.buttonData} />
      <CstmSection image={pageData.image} name={pageData.name} />
    </div>
  );
}

export default CstmPaiement;
