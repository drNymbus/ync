import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const ArticleContext = createContext();

// Création du fournisseur de contexte
export const ArticleContextProvider = ({ children }) => {
  const [article, setArticle] = useState(null);

  // useEffect pour exécuter une action une fois que le composant est monté. Fonction asynchrone pour effectuer la requête GET et récupérer les données
  useEffect(() => {
    const fetchData = async () => {
      try {


        // Chargement du fichier de configuration JSON
        fetch('config.json')
          .then(response => response.json())
          .then(data => {
            // Récupération des données spécifiques
            const fifthSubelementOfSecondElement = data[1][4];
            // Mettre à jour l'état avec les données spécifiques
            setSpecificData(fifthSubelementOfSecondElement);
          });


        // Effectue une requête GET pour récupérer la liste d'IDs
        const response1 = await axios.get('http://localhost:3001/store?item=true');
        const list_id = response1.data;

        // Variable données finales
        let finalData = [];

        for (const id of list_id) {
          const response2 = await axios.get(`/store?item=true&id=${id}`); // Supposons que vous avez besoin d'inclure l'ID dans l'URL
          finalData.push(response2.data);
        }
        
        // Effectue une requête GET à l'adresse spécifiée de votre serveur Node.js
        const response = await axios.get('http://localhost:3001/store?item=true');s

        // Mise à jour de l'état avec les données finales
        setArticle(finalData);

      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData(); // Appel de la fonction fetchData pour récupérer les données une fois que le composant est monté
  }, []); // Les crochets vides indiquent que useEffect s'exécutera une seule fois après le montage du composant

  return (
    <ArticleContext.Provider value={article}>
        {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;

  // A ENLEVER SERA RECUPERE PAR LE CONTEXT PROPS OU PLACER DIRECTEMENT DANS LE CODE
  // const sectionProps = useState([
  //   { id: 1, image: "images/sectionQuelconque.png", name: "Quelconque" },
  //   { id: 2, image: "images/sectionPanier.png", name: "Panier" },
  //   { id: 3, image: "images/sectionPanier.png", name: "Paiement" },
  // ]);

// A ENLEVER SERA RECUPERE PAR LE CONTEXT ET AXIOS VIA LA REQUETE A NODE
  // const contentProps = useState([
  //   {
  //     id: 1,
  //     image: "images/tableau_quelconque.png",
  //     description: " “Quelconque” est une photo prise au lac de Gradignan le 14 mars 2024. Alexandre et Victor jouent aux échecs, Alexis prend des photos. Le soleil se couche, il a déjà commencé à se cacher. ",
  //     prix: 10.99,
  //   },
  // ]);