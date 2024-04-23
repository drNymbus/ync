import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const ArticleContext = createContext();

// Création du fournisseur de contexte
export const ArticleContextProvider = ({ children }) => {
  
  // const [article, setArticle] = useState(null);
  
  const fetchArticleData = async (id_article) => { // Fonction pour récupérer les données de l'article en fonction de id_article
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };

      const response_ck = await axios.get(`http://localhost:3001/store?connect=true`, config); // Première requête pour initier les données de cookie
      const response_item = await axios.get(`http://localhost:3001/store?item=true&id=${id_article}`, config); // Deuxième requête pour récupérer les données de l'article en fonction de id_article
      const data = response_item.data[0]
      // setArticle(response_item.data[0]); // Mis à jour le state avec les données de l'article
      return data;
      // console.log(response_item.data[0]);
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
    }
  };

  // useEffect(() => {
  //   fetchArticleData("quelconque_1"); // Utilisation de la fonction fetchArticleData du context ArticleContext pour charger les données de la page "accueil"
  // }, [article]);

  return (
    <ArticleContext.Provider value={{ fetchArticleData }}>
        {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext; // NE PAS OUBLIER LE DYNAMIC TCHECK DE ARTICLE {article && ... }

 // Le json qu'on recupere en requetant l'API, table item (item_id), table basket (cookie_id)
  
  // json item API
  // {
  //     "item_id": "",
  //     "description": "",
  //     "display_name": "",
  //     "image": [],
  //     "price": ""
  // }
