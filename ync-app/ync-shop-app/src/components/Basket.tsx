import {useContext, useEffect, useState, useCallback } from "react";
import APIContext from "../context/ShopAPIProvider";

/* @desc: This component is used to display all informations about an item in store specifically for the basket page.
 * @param id: the item identifier, used to retrieve item's data
 * @param count: how many time the item is currently in the basket
 * @return: Row item component for the basket page
 */
function BasketItem({ basket, id, compact, add, rm }) {
    const { fetchItem } = useContext(APIContext);

    const [item, setItem] = useState(null);
    useEffect(() => { // Retrieve item's data
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[BasketItem;useEffect] ${e.message}`));
    }, [basket]);

    return (
        <div className="basket-row">
            <img className="basket-image" src={(!item) ? "" : item.image}/>
            <p>{(!item) ? "?" : item.basket_description}</p>

            <div className="basket-icon">
                {(basket[id] < 5 && !compact) ?
                    ([...Array(basket[id])].map((_,i) => <img key={i} className="basket-icon" src="assets/home_icon.svg"/>))
                    : (<><img className="basket-icon" src="assets/home_icon.svg"/><p>x{basket[id]}</p></>)
                }
            </div>

            {!compact && <>
                <button id={id} className="basket-remove" onClick={() => rm(id)}>-</button>
                <button id={id} className="basket-add" onClick={() => add(id)}>+</button>
            </>}

            <p className="basket-item-price">{(!item) ? "?" : item.price * basket[id]}$</p>
        </div>
    );
}

function BasketRows({ basket, compact, add, rm }) {
    return (
        <div className="basket-rows">
            {Object.keys(basket).map((item, i) => <BasketItem key={i} basket={basket} id={item} compact={compact} add={add} rm={rm}/>)}
        </div>
    );
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function BasketPrice({ basket, compact, next }) {
    const { fetchItem } = useContext(APIContext);
    const [price, setPrice] = useState({amount: 0, fee: 0});

    useEffect(() => {
        let new_fee = 0, new_amount = 0;
        for (const item in basket) {
            fetchItem(item).then((data) => {
                // Compute fee based on data.price
                // maybe set a coupon system ?
                new_fee += .01 * basket[item];
                new_amount += basket[item] * parseFloat(data.price);
                setPrice( p => ({...p, amount: new_amount, fee: new_fee}) );
            }).catch(e => console.error(`[BasketPrice;useEffect] ${e.message}`));
        }

    }, [basket]);

    return (
        <div className="basket-price">
            <p className="amount">Amount: {price.amount}</p>
            <p className="fee">Shipping fee: {price.fee}</p>  
            <p className="total">Total: {price.amount + price.fee}</p>
            {!compact && (<button className="price-button" onClick={next}>JE PASSE A LA SUITE !</button>)}
        </div>
    );
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, compact=true, add=undefined, rm=undefined, next=undefined }) {

    return (
        (!basket)
            ? (<div>No item in your cute lil basket</div>)
            : (<div className="basket">
                <BasketRows basket={basket} compact={compact} add={add} rm={rm}/>
                <BasketPrice basket={basket} compact={compact} next={next}/>
            </div>)
    );

} export default Basket;