import React, { createContext, useState } from 'react';
import props_ids from '../props.json'; // Import du fichier JSON contenant les identifiants permettant de recupérer les données spécifiques aux différentes pages
import brutdata from '../brutdata.json'; // Import du premier fichier JSON contenant les données statiques

// Initialisation d'un fournisseur de contexte
const DataContext = createContext();

// Utilisation du fournisseur de contexte DataContext pour fournir les valeurs de fetchDataForPage et pageData à tous les composants enfants.
// fetchDataForPage est une fonction qui permet de récupérer les données de la page spécifique.
// pageData est une variable d'état qui stocke les données de la page.
export const DataProvider = ({ children }) => {
    

    const [pageData, setPageData] = useState([]); // Déclaration d'une variable pageData pour stocker les données de la page (tableau vide comme valeur par défaut), d'une fonction setPageData qui permet de mettre à jour la valeur de pageData
    
    const fetchDataForPage = (page) => { // Fonction pour récupérer les données statiques d'une page spécifique contenu dans brutdata

        if (brutdata && props_ids) { // Vérifiez si les données et les jsons sont disponibles

            const data_ids = props_ids[page] // Récupérez les ids des propriétés de la page accueil
            const { lists_ids, section } = data_ids; // Destructuration du dict data_ids, pour plus de clarté ;)
            const buttonData = lists_ids.map(buttonId => brutdata.button_id[buttonId]); // Récupération des données des button_ids correspondants dans brutdata
            const sectionData = brutdata.section_id[section]; // Récupération de la donnée de la section correspondante dans brutdata
            const data = { // Stockage de l'ensemble des données dans data
                buttonData: buttonData,
                sectionData: sectionData
            };
            setPageData(data); // Mis à jour de l'état avec les données
          }

    };

  return (
    <DataContext.Provider value={{ fetchDataForPage, pageData }}> 
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
