import { createContext } from 'react';
import axios from 'axios';

// init Context
const ShopAPIContext = createContext();

export const ShopAPIProvider = ({ children }) => {
    // const api_address = process.env.API_CONTACT_POINT + ':' + process.env.API_PORT;
    // const api_address = "http://88.174.59.203:15779";
    const api_address = 'http://localhost:3001';
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const fetchBasket = async () => { // Fonction pour récupérer le panier
        try {
            const res = await axios.get(`${api_address}/store/connect`, config);
            let basket = res.data.items;
            for (const k in basket) basket[k] = parseInt(basket[k]);
            console.log('fBasket', res);
            return basket;
        } catch (e) { console.error('[fetchBasket]', e); }
    };

    const postBasket = async (items) => { // Fonction pour mettre à jour le panier
        try {
            const res = await axios.post(`${api_address}/store/basket`, {items}, config);
            return res.data.items;
        } catch (e) { console.error('[postBasket]', e); }
    };

    const fetchItem = async (item) => { // Récupérer les données de l'article en fonction de id_article
        try {
            let res = await axios.get(`${api_address}/store/connect`, config);
            console.log('fItem 1', res);
            res = await axios.get(`${api_address}/store/item?id=${item}`, config);
            console.log('fItem 2', res);
            return res.data[0];
        } catch (e) { console.error('[fetchItem]', e); }
    };

    const fetchOrder = async (order) => {
        try {
            const res = await axios.get(`${api_address}/store/capture?id=${order}`, config);
            // If new cookie in response, goto connect route to retrieve old session token
            return res.data;
        } catch (e) { console.error('[fetchOrder]', e); }
    }

    const postOrder = async (order) => {
        try {
            const res = await axios.post(`${api_address}/store/order`, {order}, config);
            return res.data;
        } catch (e) { console.error('[postOrder]', e); }
    }

    const captureOrder = async (order) => {
        try {
            const res = await axios.post(`${api_address}/store/capture`, {order}, config);
            return res.data;
        } catch (e) { console.error('[captureOrder]', e); }
    };

    return (
        <ShopAPIContext.Provider value={{ fetchBasket, postBasket, fetchItem, fetchOrder, postOrder, captureOrder }}>
            {children}
        </ShopAPIContext.Provider>
    );

};

export default ShopAPIContext;