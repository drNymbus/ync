import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const Cookie = createContext();

// Création du fournisseur de contexte
export const CookieProvider = ({ children }) => {
  const [cookie, setCookie] = useState(null);

  // useEffect pour exécuter une action une fois que le composant est monté. Fonction asynchrone pour effectuer la requête GET et récupérer les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectue une requête GET à l'adresse spécifiée de votre serveur Node.js
        const response = await axios.get('http://localhost:3001/store?connect=true');
        // Met à jour l'état avec les données récupérées depuis le serveur
        setCookie(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData(); // Appel de la fonction fetchData pour récupérer les données une fois que le composant est monté
  }, []); // Les crochets vides indiquent que useEffect s'exécutera une seule fois après le montage du composant

  return (
    <Cookie.Provider value={cookie}>
        {children}
    </Cookie.Provider>
  );
};

export default Cookie;
