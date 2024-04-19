import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const ArticleContext = createContext();

// Création du fournisseur de contexte
export const ArticleContextProvider = ({ children }) => {

  // On recupere les données dans la table item de cassandra
  // on les stocke dans article 

  const [article, setArticle] = useState(null);
  const idtest = useState("quelconque_1");
  const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  // Le json qu'on recupere en requetant l'API, table item (item_id), table basket (cookie_id)
  
  // json item API
  // {
  //     "item_id": "",
  //     "description": "",
  //     "display_name": "",
  //     "image": [],
  //     "price": ""
  // }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/store?connect=true`, config);
        console.log(response); // Utilisez response.data pour accéder aux données de la réponse
      } catch (error) {
        console.error('Une erreur s\'est produite :', error.message);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/store?item=true&id=${idtest}`, config);
        console.log(response.data[0]); // Utilisez response.data pour accéder aux données de la réponse
        setArticle(response.data[0]);
      } catch (error) {
        console.error('Une erreur s\'est produite :', error.message);
      }
    };
  
    fetchData();
  }, []);

  console.log('article'+article)

  return (
    <ArticleContext.Provider value={article}>
        {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext; // NE PAS OUBLIER LE DYNAMIC TCHECK DE ARTICLE {article && ... }



  //       // useEffect pour exécuter une action une fois que le composant est monté. Fonction asynchrone pour effectuer la requête GET et récupérer les données
  // useEffect(() => { 

  //   // console.log(config_json.accueil.contenu_id);
  //   setList_ids(config_json.accueil.contenu_id);

  //   const fetchData = async () => {
      
  //     //Cookie
  //     //http://localhost:3001/store
  //   await axios.get('http://localhost:3001/store?connect=true', config)

    

  //   // Variable données finales
  //   let finalData = [];

  //   console.log('list'+typeof(list_ids)+list_ids)

  //   await axios.get(`/store?id=${list_ids}`, config)
  //   // try {
  //   //   const responsePromises = list_ids.map(id => axios.get(`/store?id=${id}`));
  //   //   const responses = await Promise.all(responsePromises);
  //   //   const finalData = responses.map(response => response.data);
  //   //   setArticle({finalData});
  //   // } catch (error) {
  //   //   console.error('Erreur lors de la récupération des données:', error);
  //   // }
    

  //   // try {
  //   //   for (const id of list_ids) {
  //   //     const response3 = await axios.get(`/store?item=true&id=${id}`); // Supposons que vous avez besoin d'inclure l'ID dans l'URL
  //   //     console.log("response3"+response3);
  //   //     finalData.push(response3.data);
  //   //   }
      
  //   //   console.log("finalData"+finalData);

  //   //   // Mise à jour de l'état avec les données finales
  //   //   setArticle(finalData);

  //   // } catch (error) {
  //   //   console.error('Erreur lors de la récupération des données:', error);
  //   // }

  //   };
  //   fetchData(); // Appel de la fonction fetchData pour récupérer les données une fois que le composant est monté
  // }, []); // Les crochets vides indiquent que useEffect s'exécutera une seule fois après le montage du composant











  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/store?connect=true');
  //       // if (!response.ok) {
  //       //   throw new Error('Erreur lors de la récupération des données');
  //       // }
  //       console.log(response.headers.getSetCookie());
  //       response.json().then( json => {
  //         console.log(json);
  //       }
  //       );
  //     } catch (error) {
  //       console.error('Une erreur s\'est produite :', error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/store?item=true&id=${0}`);
  //       // if (!response.ok) {
  //       //   throw new Error('Erreur lors de la récupération des données');
  //       // }
  //       response.json().then( json => {
  //         console.log(json);
  //       }
  //       );
  //     } catch (error) {
  //       console.error('Une erreur s\'est produite :', error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);
