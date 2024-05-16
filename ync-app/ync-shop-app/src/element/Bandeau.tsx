// Bandeau --> BoutonMenu
function Bandeau({name, click}) {

    return (
        <div className="bandeau">
            <button className="bandeau left">
                YNC SHOP
            </button>
            <button className="bandeau right" onClick={click}>
                {name}
            </button>
        </div>
    );

} export default Bandeau;