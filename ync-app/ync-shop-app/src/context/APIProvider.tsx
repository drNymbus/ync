import { createContext } from 'react';
import axios from 'axios';

// init Context
const APIContext = createContext();

export const APIProvider = ({ children }) => {

    // const api_address = process.env.API_CONTACT_POINT;
    const api_address = "http://88.174.59.203:15779";
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const fetchItem = async (item) => { // Récupérer les données de l'article en fonction de id_article
        try {
            await axios.get(api_address + `/store?connect=true`, config); // Init cookie
            const res = await axios.get(api_address + `/store?item=true&id=${item}`, config);
            return res.data[0];
        } catch (e) { console.error(e); }
    };

    const fetchBasket = async () => { // Fonction pour récupérer le panier
        try {
            const res = await axios.get(api_address + `/store?connect=true`, config);
            return res.data.items;
        } catch (e) { console.error(e); }
    };

    const postBasket = async (item) => { // Fonction pour ajouter un élément au panier en fonction de id_article et récupérer le nouveau panier
        try {
            const res = await axios.post(api_address + `/store?basket=true&id=${item}`, {item}, config);
            return res.data.items;
        } catch (e) { console.error(e); }
    };

    const delBasket = async (item) => { // Fonction pour supprimer un élément au panier en fonction de id_article et récupérer le nouveau panier
        try {
            const res = await axios.delete(api_address + `/store?basket=true&id=${item}`, config);
            return res.data.items;
        } catch (e) { console.error(e); }
    };

    return (
        <APIContext.Provider value={{ fetchItem, fetchBasket, postBasket, delBasket }}>
            {children}
        </APIContext.Provider>
    );

};

export default APIContext;