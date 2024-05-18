import {useContext, useEffect, useState } from "react";
import APIContext from "../context/APIProvider";

/* @desc: This component is used to display all informations about an item in store
 * @param id: the item identifier, used to retrieve item's data
 * @param clickFn: the handler to add the item to the basket
 * @return: Item component of the website page
 */
function Item({ id, clickFn }) {

    const [item, setItem] = useState(null); // Item data
    const { fetchItem } = useContext(APIContext);

    useEffect(() => { // Fetch all item's data
        fetchItem(id)
            .then((data) => { setItem(data); })
            .catch((err) => { console.error(err); });
    }, []);

    let img = ( // HTML image rendering 
    
        <img className="item-image" src={(item === null) ? "" : item.image} width="400"/>

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

            <div className="item-information">
                <div className="ligne"></div>
                {desc}
                {price}
            </div>   

        </div>
    );

} export default Item;