import {useContext, useEffect, useState, useCallback } from "react";
import APIContext from "../context/APIProvider";
import { useBasket } from "../hooks/Basket";

/* @desc: This component is used to display all informations about an item in store specifically for the basket page.
 * @param id: the item identifier, used to retrieve item's data
 * @param count: how many time the item is currently in the basket
 * @return: Row item component for the basket page
 */
function BasketItem({ id, count }) {
    const [item, setItem] = useState(null);
    const [nbItem, setNbItem] = useState(count);
    const { fetchItem, fetchBasket, postBasket } = useContext(APIContext);
    const { addBasket, removeBasket } = useBasket(fetchBasket);

    const addBI = (e) => {
        setNbItem(nbItem + 1);
        addBasket(e.target.id, postBasket);
    };

    const removeBI = (e) => {
        if (nbItem > 0) {
            setNbItem(nbItem - 1);
            removeBasket(e.target.id, postBasket);
        }
    };

    useEffect(() => { // Retrieve item's data
        fetchItem(id)
            .then((data) => { setItem(data); })
            .catch((err) => { console.error(err); });
    }, []);

    if (item !== null) { // If data has been retrieved then we display the item
        let basketIcons = undefined;
        if (nbItem < 5) { // If there is less than 5 of the same item in basket then represent the count as images 
            basketIcons = [];
            for (let i = 0; i < nbItem; i++) { basketIcons.push(<img key={i} className="basket-icon" src="assets/home_icon.svg"/>); }
        } else { // If there is more than 5 of the same item in basket then represent the count as text
            basketIcons = (<>
                <img className="basket-icon" src="assets/home_icon.svg"/>
                <p>x{nbItem}</p>
            </>);
        }

        return ( // HTML item's basket rendering 
            <div className="basket-row">
                <img className="basket-image" src={item.image}/>
                <p>{item.basket_description}</p>
                <div className="basket-icon">{basketIcons}</div>
                <button id={id} className="basket-remove" onClick={removeBI}>-</button>
                <button id={id} className="basket-add" onClick={addBI}>+</button>
                <p className="basket-item-price">{item.price * nbItem}$</p>
            </div>
        );
    }
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function BasketPrice() {}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, next }) {
    // const { fetchBasket } = useContext(APIContext);

    // const [items, setItems] = useState(basket);
    // useEffect(() => {
    //     fetchBasket()
    //         .then((data) => { (data === undefined || data === null) ? [] : setItems(data); })
    //         .catch((err) => { console.error(err); });
    // }, []);

    // Count items in basket
    let item_count = basket.reduce((b, v) => ({...b, [v]: (b[v] || 0) + 1}), {});

    let rows = []; // Display each different item in basket
    for (let id in item_count) {
        rows.push(<BasketItem key={id} id={id} count={item_count[id]} />);
    }

    let price = 0, fee = 0;

    return ( // HTML basket rendering
        <div className="basket">
            <div className="basket-rows">{rows}</div>
            <div className="basket-price">
                <p className="amount">Amount: {price}</p>
                <p className="fee">Shipping fee: {fee}</p>
                <p className="total">Total: {price + fee}</p>
                <button className="price-button" onClick={next}>JE PASSE A LA SUITE !</button>
            </div>
        </div>
    );

} export default Basket;