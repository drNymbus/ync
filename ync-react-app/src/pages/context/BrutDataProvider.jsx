import React, {useEffect, createContext} from 'react';
import props_ids from './props.json'; // Import du fichier JSON contenant les identifiants permettant de recupérer les données spécifiques aux différentes pages
import brutdata from './brutdata.json'; // Import du premier fichier JSON contenant les données statiques

// init Context
const DataContext = createContext();


export const DataProvider = ({ children }) => {

// Function   
    const fetchDataForPage = (page) => { // Récupérer les données de la page spécifique.

        if (brutdata && props_ids) {

            const data_ids = props_ids[page]
            const { lists_ids, section } = data_ids;
            
            const buttonDataBandeau = lists_ids[0].map(buttonId => brutdata.button_id[buttonId]);

            let buttonData = null
            if (lists_ids.length === 2){
                buttonData = lists_ids[1].map(buttonId => brutdata.button_id[buttonId]);
            } 

            const sectionData = brutdata.section_id[section];

            const data = {
                buttonDataBandeau: buttonDataBandeau,
                buttonData: buttonData,
                sectionData: sectionData
            };

            if (page === "accueil") {

                const { id_article_accueil } = data_ids;
                data.id_article_accueil = id_article_accueil;

            }

            if (page === "panier") {

                const { nbrIncrementationMax } = data_ids;
                data.nbrIncrementationMax = nbrIncrementationMax;

                const { prix_livraison } = data_ids;
                data.prix_livraison = prix_livraison;

            }
            
            return data;
        
        }

    };


//Render
    return (

        <DataContext.Provider value={{ fetchDataForPage}}> 
            {children}
        </DataContext.Provider>

    );

};

export default DataContext;