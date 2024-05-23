import {useContext, useEffect, useState, useCallback } from "react";
import APIContext from "../context/APIProvider";

/* @desc: This component is used to display all informations about an item in store specifically for the basket page.
 * @param id: the item identifier, used to retrieve item's data
 * @param count: how many time the item is currently in the basket
 * @return: Row item component for the basket page
 */
function BasketItem({ basket, id, add, rm }) {
    const { fetchItem } = useContext(APIContext);

    const [item, setItem] = useState(null);
    useEffect(() => { // Retrieve item's data
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[BasketItem;useEffect] ${e.message}`));
    }, [basket]);

    return ( // HTML item's basket rendering 
        <div className="basket-row">
            <img className="basket-image" src={(!item) ? "" : item.image}/>
            <p>{(!item) ? "?" : item.basket_description}</p>

            <div className="basket-icon">
                {(basket[id] < 5) ?
                    ([...Array(basket[id])].map((_,i) => <img key={i} className="basket-icon" src="assets/home_icon.svg"/>))
                    : (<><img className="basket-icon" src="assets/home_icon.svg"/><p>x{basket[id]}</p></>)
                }
            </div>

            <button id={id} className="basket-remove" onClick={() => rm(id, item.price)}>-</button>
            <button id={id} className="basket-add" onClick={() => add(id, item.price)}>+</button>

            <p className="basket-item-price">{(!item || !basket[id]) ? "?" : item.price * basket[id]}$</p>
        </div>
    );
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function BasketPrice({ basket, next }) {
    const [price, setPrice] = useState({amount: 0, fee: 0});

    return (
        <div className="basket-price">
            <p className="amount">Amount: {price.amount}</p>
            <p className="fee">Shipping fee: {price.fee}</p>  
            <p className="total">Total: {price.amount + price.fee}</p>
            <button className="price-button" onClick={next}>JE PASSE A LA SUITE !</button>
        </div>
    );
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, add, rm, next }) {

    return (
        (!basket) ?
            (<div>No item in your cute lil basket</div>)
            : (<div className="basket">
                <div className="basket-rows">
                    {Object.keys(basket)
                        .map((item, i) => <BasketItem key={i} basket={basket} id={item} add={add} rm={rm}/>)
                    }
                </div>
                <BasketPrice basket={basket} next={next}/>
            </div>)
    );

} export default Basket;