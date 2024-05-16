import {useContext, useEffect, useState } from "react";
import APIContext from "../context/APIProvider";

/* @desc: This component is used to display all informations about an item in store
 * @param id: the item identifier, used to retrieve item's data
 * @param clickFn: the handler to add the item to the basket
 * @return: Item component of the website page
 */
function Item({ id, clickFn }) {

    const [item, setItem] = useState(null); // Item data
    const { fetchItem, postBasket } = useContext(APIContext);

    useEffect(() => { // Fetch all item's data
        fetchItem(id)
            .then((data) => { setItem(data); })
            .catch((err) => { console.error(err); });
    }, []);

    // async function add() { // Add item to the basket then execute clickFn
    //     await postBasket(id);
    //     clickFn();
    // };

    let img = ( // HTML image rendering 
        <div className="item-image">
            <img src={(item === null) ? "" : item.image} loading="eager" width="400"/>
        </div>
    );

    let desc = ( // HTML description rendering
        <div className="item-description">
            <p>{(item === null) ? "" : item.description}</p>
        </div>
    );

    let price = ( // HTML button rendering
        <button className="item-button" onClick={(e) => {clickFn(e, id)}}>
            {(item === null) ? "" : item.price}$
        </button>
    );

    return (
        <div className="item-container">
            {img}
            {desc}
            {price}
        </div>
    );

} export default Item;