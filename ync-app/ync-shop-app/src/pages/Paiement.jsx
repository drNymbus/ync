import React, {useContext, useEffect} from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import DataContext from "./context/BrutDataProvider";
import "./style/styles.css";


// Paiement --> Bandeau, Section, ???
function CstmPaiement() {


// useContexte Hook
    const { fetchDataForPage, pageData } = useContext(DataContext);


// useEffect Hook
    useEffect(() => {
        fetchDataForPage("paiement"); // Utilisation de la fonction fetchDataForPage du context DataContext pour charger les données de la page "paiement"
    }, []); // Cette fonction est exécutée une seule fois au chargement de la page car le tableau de dépendances est vide ([]). Cela signifie qu'il n'y a aucun changement attendu dans les données de ce contexte, donc useEffect() ne sera pas relancé à moins que les dépendances ne changent.

   
// Render
    return (

        <div>

            Paiement
            {/* <CstmBandeau buttons={pageData.buttonData} />
            <CstmSection image={pageData.image} name={pageData.name} /> */}

        </div>

    );
    
}

export default CstmPaiement;