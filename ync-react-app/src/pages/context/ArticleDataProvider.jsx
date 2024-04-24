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
      console.log(response_ck.data.items) //response_panier_data test 
      const response_item = await axios.get(`http://localhost:3001/store?item=true&id=${id_article}`, config); // Deuxième requête pour récupérer les données de l'article en fonction de id_article
      const data = response_item.data[0]
      return data;
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
    }
  };

  // Fonction qui pop quand on arrive sur la page panier
  const fetchPanierData = async () => { // Fonction pour récupérer le panier
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };
      const response_panier = await axios.get(`http://localhost:3001/store?connect=true`, config);
      console.log(response_panier.data.items)
      const panier = response_panier.data.items
      return panier;
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
    }
  };

  // Fonction qui pop sur la page panier lors de l'ajout d'un autre article du meme type
  // Fonction qui pop sur la page accueil lorsque on clique sur j'aime bien sur l'item
  const postPanierData = async (id_article) => { // Fonction pour ajouter un élément au panier en fonction de id_article et récupérer le nouveau panier
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };
      const response_panier = await axios.post(`http://localhost:3001/store?item=true&id=${id_article}`, config);
      console.log(response_panier.data.items)
      const new_panier = response_panier.data.items
      return new_panier;
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
    }
  };

  const delPanierData = async (id_article) => { // Fonction pour supprimer un élément au panier en fonction de id_article et récupérer le nouveau panier
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      };
      const response_panier = await axios.delete(`http://localhost:3001/store?item=true&id=${id_article}`, config);
      console.log(response_panier.data.items)
      const new_panier = response_panier.data.items
      return new_panier;
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
    }
  };

  return (
    <ArticleContext.Provider value={{ fetchArticleData }}>
        {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;