/* @desc: the top menu component of the website page
 * @param name: the text to display on the top right button
 * @param basketSize: how many items are currently in the basket
 * @param homeFn: the onClick handler for the top left button
 * @param clickFn: the onClick handler for the top right button
 * @return: the top menu component of the website page
 */
function Bandeau({name, basket, homeFn, clickFn}) {

    // If top right button is "PANIER" then display the number of items in basket next to it
    let display_name = (name === "PANIER") ? `${name}[${Object.values(basket).reduce((a, b) => a + b, 0)}]` : name;

    return (
        <div className="bandeau">
            <button className="bandeau left" onClick={homeFn}>
                YNC SHOP
            </button>
            <button className="bandeau right" onClick={clickFn}>
                {display_name}
            </button>
        </div>
    );

} export default Bandeau;