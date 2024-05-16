import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

// init Context
const APIContext = createContext();


export const APIProvider = ({ children }) => {

    const api_address = "http://88.174.59.203:15779";
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const fetchArticle = async (id_article) => { // Récupérer les données de l'article en fonction de id_article
        try {
            await axios.get(api_address + `/store?connect=true`, config); // Init cookie
            const res = await axios.get(api_address + `/store?item=true&id=${id_article}`, config);
            const data = res.data[0];
            return data;
        } catch (e) { console.error(e); }
    };

    const fetchBasket = async () => { // Fonction pour récupérer le panier
        try {
            const res = await axios.get(api_address + `/store?connect=true`, config);
            const basket = res.data.items;
            return basket;
        } catch (e) { console.error(e); }
    };

    const postBasket = async (id_article) => { // Fonction pour ajouter un élément au panier en fonction de id_article et récupérer le nouveau panier
        try {
            const res = await axios.post(api_address + `/store?basket=true&id=${id_article}`, {id_article}, config);
            const new_panier = res.data.items;
            return new_panier;
        } catch (e) { console.error(e); }
    };

    const delBasket = async (id_article) => { // Fonction pour supprimer un élément au panier en fonction de id_article et récupérer le nouveau panier
        try {
            const res = await axios.delete(api_address + `/store?item=true&id=${id_article}`, config);
            const new_panier = res.data.items;
            return new_panier;
        } catch (e) { console.error(e); }
    };

    return (
        <APIContext.Provider value={{ fetchArticle, fetchBasket, postBasket, delBasket }}>
            {children}
        </APIContext.Provider>
    );

};

export default APIContext;