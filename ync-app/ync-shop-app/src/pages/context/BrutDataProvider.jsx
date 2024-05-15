import React, {useEffect, createContext} from 'react';

import props_ids from './props.json'; // Import du fichier JSON contenant les identifiants permettant de recupérer les données spécifiques aux différentes pages
import brutdata from './brutdata.json'; // Import du premier fichier JSON contenant les données statiques

// init Context
const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const fetchBannerData = (page) => { // Récupérer les données du bandeau pour une page spécifique

        const { lists_button_ids } = props_ids[page]; 
        
        const button_data = lists_button_ids[0].map(button_id => brutdata.button[button_id]);

        const data = {
            button_data: button_data,
        };

        return data;

    };


    const fetchSectionData = (page) => { // Récupérer les données de la section pour une page spécifique.

        const { section_id } = props_ids[page];
        
        const section_data = brutdata.section[section_id];

        const data = {
            section_data: section_data
        };
        
        return data;   
        
    };


    const fetchContentData = (page) => { // Récupérer les données autres de la page spécifique.

        const { lists_button_ids } = props_ids[page];

        const button_data = lists_button_ids[1].map(button_id => brutdata.button[button_id]);

        const data = {
            button_data: button_data
        };

        if (page === "accueil") {

            const { id_article_vitrine } = props_ids[page];
            data.id_article_vitrine = id_article_vitrine;
            

        }

        if (page === "panier") {

            const { nbrIncrementationMax } = props_ids[page];
            const { prix_livraison } = props_ids[page];

            data.nbrIncrementationMax = nbrIncrementationMax
            data.prix_livraison =prix_livraison

        }
        
        return data;

    };


//Render
    return (

        <DataContext.Provider value={{ fetchBannerData, fetchSectionData, fetchContentData }}> 
            {children}
        </DataContext.Provider>

    );

};

export default DataContext;


// Function   
    // const fetchDataForPage = (page) => { // Récupérer les données de la page spécifique.

    //     if (brutdata && props_ids) {

    //         const data_ids = props_ids[page]
    //         const { lists_button_ids, section_id } = data_ids;
            
    //         const buttonDataBandeau = lists_button_ids[0].map(buttonId => brutdata.button_id[buttonId]);

    //         let buttonData = null
    //         if (lists_button_ids.length === 2){
    //             buttonData = lists_button_ids[1].map(buttonId => brutdata.button[buttonId]);
    //         } 

    //         const sectionData = brutdata.section[section_id];

    //         const data = {
    //             buttonDataBandeau: buttonDataBandeau,
    //             buttonData: buttonData,
    //             sectionData: sectionData
    //         };

    //         if (page === "accueil") {

    //             const { id_article_vitrine } = data_ids;
    //             data.id_article_vitrine = id_article_vitrine;

    //         }

    //         if (page === "panier") {

    //             const { nbrIncrementationMax } = data_ids;
    //             data.nbrIncrementationMax = nbrIncrementationMax;

    //             const { prix_livraison } = data_ids;
    //             data.prix_livraison = prix_livraison;

    //         }
            
    //         return data;
        
    //     }

    // };