import {useContext, useEffect, useState } from "react";
import APIContext from "../context/APIProvider";

/* @desc: This component is used to display all informations about an item in store specifically for the basket page.
 * @param id: the item identifier, used to retrieve item's data
 * @param count: how many time the item is currently in the basket
 * @return: Row item component for the basket page
 */
function BasketItem({ id, count, add, remove }) {
    const [item, setItem] = useState(null);
    const { fetchItem } = useContext(APIContext);

    useEffect(() => { // Retrieve item's data
        fetchItem(id)
            .then((data) => { setItem(data); })
            .catch((err) => { console.error(err); });
    }, []);

    if (item !== null) { // If data has been retrieved then we display the item
        let basketIcons = undefined;
        if (count < 5) { // If there is less than 5 of the same item in basket then represent the count as images 
            basketIcons = [];
            for (let i = 0; i < count; i++) { basketIcons.push(<img key={i} className="basket-icon" src="assets/home_icon.svg"/>); }
        } else { // If there is more than 5 of the same item in basket then represent the count as text
            basketIcons = (<>
                <img className="basket-icon" src="assets/home_icon.svg"/>
                <p>x{count}</p>
            </>);
        }

        return ( // HTML item's basket rendering 
            <div className="basket-row">
                <img className="basket-image" src={item.image}/>
                <p>{item.basket_description}</p>
                <div className="basket-icon">{basketIcons}</div>
                <button className="basket-remove" onClick={removeItem}>-</button>
                <button className="basket-add" onClick={addItem}>+</button>
                <p className="basket-item-price">{item.price * count}$</p>
            </div>
        );
    }
}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
// function BasketPrice() {}

/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, update, next }) {
    const { postBasket } = useContext(APIContext);

    const addItem = async (id) => {
        await postBasket(id);
        update();
    };

    const removeItem = async (id) => {
        await delBasket(basket);
        update();
    };

    // Count items in basket
    basket = basket.reduce((b, v) => ({...b, [v]: (b[v] || 0) + 1}), {});

    let rows = []; // Display each different item in basket
    for (let id in basket) {
        rows.push(<BasketItem key={id} id={id} count={basket[id]} add={addItem} remove={removeItem}/>);
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