import {useContext, useEffect, useState } from "react";
import APIContext from "../context/APIProvider";

/* @desc: This component is used to display all informations about an item in store
 * @param id: the item identifier, used to retrieve item's data
 * @param clickFn: the handler to add the item to the basket
 * @return: Item component of the website page
 */
function Item({ id, add, goto }) {

    const [item, setItem] = useState(null); // Item data
    const { fetchItem } = useContext(APIContext);

    useEffect(() => { // Fetch all item's data
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[Item;useEffect] ${e.message}`));
    }, []);

    const img = ( // HTML image rendering
        <div className="item-image">
            <img src={(!item) ? "" : item.image} width="400"/>
        </div>
    );

    const desc = ( // HTML description rendering
        <div className="item-description">
            <p>{(!item) ? "" : item.description}</p>
        </div>
    );

    function handleClick() { add(id); goto(); };
    const price = ( // HTML button rendering
        <button className="item-button" id={id} onClick={handleClick}>
            {(!item) ? "" : item.price}$
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