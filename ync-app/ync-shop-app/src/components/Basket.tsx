import {useContext, useEffect, useState, useCallback } from "react";
import APIContext from "../context/APIProvider";
import { useBasket } from "../hooks/Basket";

/* @desc: This component is used to display all informations about an item in store specifically for the basket page.
 * @param id: the item identifier, used to retrieve item's data
 * @param count: how many time the item is currently in the basket
 * @return: Row item component for the basket page
 */
function BasketItem({ basket, id, add, rm }) {
    const { fetchItem } = useContext(APIContext);

    const [item, setItem] = useState(null);
    const [icons, setIcons] = useState([]);

    useEffect(() => { // Retrieve item's data
        fetchItem(id)
        .then((data) => { setItem(data); })
        .catch((err) => { console.error(err); });
        
        setIcons(basket.filter(el => el === id));
    }, [basket]);

    return ( // HTML item's basket rendering 
        <div className="basket-row">
            <img className="basket-image" src={(!item) ? "" : item.image}/>
            <p>{(!item) ? "?" : item.basket_description}</p>

            <div className="basket-icon">
                {
                    (icons.length < 5) ?
                        icons.map((el, i) => <img key={i} className="basket-icon" src="assets/home_icon.svg"/>)
                        : (<><img className="basket-icon" src="assets/home_icon.svg"/><p>x{icons.length}</p></>)
                }
                <img className="basket-icon" src="assets/home_icon.svg"/>
            </div>

            <button id={id} className="basket-remove" onClick={() => rm(id)}>-</button>
            <button id={id} className="basket-add" onClick={() => add(id)}>+</button>

            <p className="basket-item-price">{(!item || !icons) ? "?" : item.price * icons.length}$</p>
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
            <p className="total">Total: {price.amout + price.fee}</p>
            <button className="price-button" onClick={next}>JE PASSE A LA SUITE !</button>
        </div>
    );
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, add, rm, next }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (basket) {
            // For each distinct value in list
            var unique = basket.filter((val, i, arr) => arr.indexOf(val) === i);
            // let item_count = basket.reduce((b, v) => ({...b, [v]: (b[v] || 0) + 1}), {});

            let newRows = [];
            for (let id in unique) {
                newRows.push(<BasketItem key={unique[id]} basket={basket} id={unique[id]} add={add} rm={rm}/>);
            }
            setRows(newRows);
        }
    }, [basket]);

    return ( // HTML basket rendering
        (!basket) ?
            (<div>No item in your cute lil basket</div>)
            : (<div className="basket">
                <div className="basket-rows">
                    {/* {item_count.map(([id, count]) => {
                        <BasketItem id={id} count={count} add={add} rm={rm}/>
                    })} */rows}
                </div>
                <BasketPrice basket={basket} next={next}/>
            </div>)
    );

} export default Basket;