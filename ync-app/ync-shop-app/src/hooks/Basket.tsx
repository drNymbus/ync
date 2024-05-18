import { useState, useEffect } from "react";

export function useBasket(getBasket) {

    const [basket, setBasket] = useState([]);

    useEffect(() => {
        getBasket()
            .then((data) => setBasket(data))
            .catch((error) => console.error(error));
    }, []);

    const updateBasket = (newBasket) => setBasket(newBasket);

    function addBasket(item, post) {
        let newBasket = [item];
        if (basket) { newBasket = [...basket, item] }

        post(newBasket);
        setBasket(newBasket);
    };

    function removeBasket(item, post) {
        if (!basket) {
            post([]);
            setBasket([]);
        } else {
            let i = basket.indexOf(item);
            let newBasket = [...basket.slice(0, i), ...basket.slice(i + 1)];
            post(newBasket);
            setBasket(newBasket);
        }
    };

    return { basket, addBasket, removeBasket, updateBasket };
};