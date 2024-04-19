import React, {useContext, useEffect} from "react";
import DataContext from "../context/BrutDataProvider";
import "../errorstyles.css";

// Composant Erreur : reçoit le numéro de l'erreur et la description de l'erreur puis les affiche pour le client.
function CstmErreur({ erreur, descriptionErreur }) {

  // Utilisation du hook useContext pour accéder au contexte DataContext, à sa variable pageData et fonction fetchDataForPage
  const { fetchDataForPage, pageData } = useContext(DataContext); // Déstructuration des valeurs de fetchDataForPage et pageData

  useEffect(() => {
    fetchDataForPage("erreur"); // Utilisation de la fonction fetchDataForPage du context DataContext pour charger les données de la page "erreur"
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
    <div className="container">
      <CstmBandeau buttons={pageData.buttonData} />
      <CstmSection image={pageData.image} name={pageData.name}/>
        <div className="error-container">
            <h2>Erreur: {erreur}</h2>
            <p>Description de l'erreur: {descriptionErreur}</p>
        </div>
    </div>
  );
}

export default CstmErreur;
