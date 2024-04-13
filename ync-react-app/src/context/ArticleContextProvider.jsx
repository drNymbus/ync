import React, { useContext, createContext, useState, useEffect } from 'react';
import config_json from '../storeAPIconfig.json';
import axios from 'axios';

// Création du contexte
const ArticleContext = createContext();

// Création du fournisseur de contexte
export const ArticleContextProvider = ({ children }) => {
  // const [cookie, setCookie] = useState(null);
  const [article, setArticle] = useState([]);
  const [list_ids, setList_ids] = useState([]);

  // var nombre de boutons par pages
  // ids des boutons par pages {page1:[],page2:[]}
  // liste ids des boutons par page,

  // Les trois types de JSON : 
  // Le json qu'on recupere en requetant l'APi,
  // Le json des données brutes stockées coté React,
  // Le json des paramètres et propriétés du site.
  // Ce dernier permet de récupérer les ids des informations qu'on ira extraire de l'API, dans différentes tables mais aussi 
  [{accueil:{}}{panier:{}}{paiement:{}}{erreur:{}}]
  

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  // useEffect pour exécuter une action une fois que le composant est monté. Fonction asynchrone pour effectuer la requête GET et récupérer les données
  useEffect(() => { 

    const fetchData = async () => {
      
      //Cookie
    await axios.get('http://localhost:3001/store?connect=true', config)

    // console.log(config_json.accueil.contenu_id);
    setList_ids(config_json.accueil.contenu_id);

    // Variable données finales
    let finalData = [];



    try {
      const responsePromises = list_ids.map(id => axios.get(`/store?item=true&id=${id}`));
      const responses = await Promise.all(responsePromises);
      const finalData = responses.map(response => response.data);
      setArticle({finalData});
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
    

    // try {
    //   for (const id of list_ids) {
    //     const response3 = await axios.get(`/store?item=true&id=${id}`); // Supposons que vous avez besoin d'inclure l'ID dans l'URL
    //     console.log("response3"+response3);
    //     finalData.push(response3.data);
    //   }
      
    //   console.log("finalData"+finalData);

    //   // Mise à jour de l'état avec les données finales
    //   setArticle(finalData);

    // } catch (error) {
    //   console.error('Erreur lors de la récupération des données:', error);
    // }




    };
    fetchData(); // Appel de la fonction fetchData pour récupérer les données une fois que le composant est monté
  }, []); // Les crochets vides indiquent que useEffect s'exécutera une seule fois après le montage du composant

  console.log(article);
  console.log(list_ids);

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

  // try {
      //   const response2 = await fetch('../storeAPIconfig.json');
      //   console."log"(response2);
      //   const data = await response2.json();
      //   const { datajson } = data; // Destructurer les données de réponse JSON
      //   setList_ids(datajson); 
      //   console.log(datajson);
      //   // setList_ids(data); // Mettre à jour l'état avec les données du fichier JSON
      //   } catch (error) {
      //     console.error('Erreur lors de la récupération des données:', error);
      //   }

            // //Cookie recupération
      // try {
      //   // Effectue une requête GET à l'adresse spécifiée de votre serveur Node.js
      //   // const response = await axios.get('http://localhost:3001/store?connect=true', config);
      //   axios.get('http://localhost:3001/store?connect=true', config).then((response) => {
      //     console.log(response.headers);
      //     // setCookie(response.data.cookie_id);
      //   })
      //   // Met à jour l'état avec les données récupérées depuis le serveur
      //   // console.log("response : "+response);
      // } catch (error) {
      //   console.error('Erreur lors de la récupération des données:', error);
      // }
      // console.log(cookie);

        // 'Access-Control-Allow-Origin': null, // Permet à toutes les sources d'accéder à la ressource
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS', // Méthodes HTTP autorisées
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // En-têtes autorisés
      // 'Access-Control-Allow-Credentials': true // Autoriser l'envoi des cookies dans les requêtes cross-origin