import { createContext } from 'react';
import axios from 'axios';

// init Context
const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const api_address = process.env.API_CONTACT_POINT;
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const fetchItem = async (item) => { // Récupérer les données de l'article en fonction de id_article
        try {
            // await axios.get(api_address + `/store?connect=true`, config); // Init cookie
            const res = await axios.get(`${api_address}/store?item=true&id=${item}`, config);
            return res.data[0];
        } catch (e) { console.error(e); }
    };

    const fetchBasket = async () => { // Fonction pour récupérer le panier
        try {
            const res = await axios.get(`${api_address}/store?connect=true`, config);
            let basket = res.data.items;
            for (const k in basket) basket[k] = parseInt(basket[k]);
            return basket;
        } catch (e) { console.error(e); }
    };

    const postBasket = async (basket) => { // Fonction pour mettre à jour le panier
        try {
            const res = await axios.post(`${api_address}/store?basket=true`, {basket}, config);
            return res.data.items;
        } catch (e) { console.error(e); }
    };

    const postCommand = async (command) => {
        try {
            const res = await axios.post(`${api_address}/store?command=true`, {command}, config);
            return res.data.items;
        } catch (e) { console.error(e); }
    }

    return (
        <APIContext.Provider value={{ fetchItem, fetchBasket, postBasket, postCommand }}>
            {children}
        </APIContext.Provider>
    );

};

export default APIContext;