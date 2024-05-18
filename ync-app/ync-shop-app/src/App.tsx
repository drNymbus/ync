/* npm & React module imports */
import { useState, useContext, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

    /* Custom context imports */
import APIContext from "./context/APIProvider";

/* Custom hook imports */
// import { useBasket } from "./hooks/Basket";

/* Custom component imports */
import Bandeau from "./components/Bandeau";
import Section from "./components/Section";
import Logo from "./components/Splashpage";
import Item from "./components/Item";
import Basket from "./components/Basket";
import Payment from "./components/Payment";

/* Style imports */
import "./style/styles.css";

function useBasket() {
    const { fetchBasket, postBasket } = useContext(APIContext);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        fetchBasket()
            .then((data) => setBasket(data))
            .catch((error) => console.error(error));
    }, []);

    function addBasket(item) {
        let newBasket = [item];
        if (basket) { newBasket = [...basket, item] }

        postBasket(newBasket);
        setBasket(newBasket);
    };

    function removeBasket(item) {
        if (!basket) {
            postBasket([]);
            setBasket([]);
        } else {
            let i = basket.indexOf(item);
            let newBasket = [...basket.slice(0, i), ...basket.slice(i + 1)];
            postBasket(newBasket);
            setBasket(newBasket);
        }
    };

    return { basket, addBasket, removeBasket };
}

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { basket, addBasket, removeBasket } = useBasket();

    // Define default app state
    const [state, setState] = useState("HOME");

    // Define default "Bandeau" and "Section" state
    const [buttonDisplay, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    function homeState() {
        setButtonDisplay("PANIER");
        setSection({name: "Quelconque", image: "assets/home_icon.svg"})
        setState("HOME");
    };

    function paymentState() {
        setButtonDisplay("RETOUR");
        setSection({name: "Payment", image: "assets/home_icon.svg"})
        setState("PAYMENT");
    };

    function basketState() {
        setButtonDisplay("RETOUR");
        setSection({name: "Panier", image: "assets/home_icon.svg"})
        setState("BASKET");
    };

    // onClick top right button
    const updateState = () => {
        if (state === "HOME" || state === "PAYMENT") {
            basketState();
        } else if (state === "BASKET") {
            homeState();
        }
    }

    return ( // HTML website rendering
        <div className="App">
            <Bandeau name={buttonDisplay} basketSize={(!basket) ? 0 : basket.length} homeFn={homeState} clickFn={updateState}/>
            <Section name={section.name} image={section.image}/>

            <Item id="quelconque" add={addBasket} goto={basketState}/>
            <Basket basket={basket} add={addBasket} rm={removeBasket} next={paymentState}/>
            <Payment/>

        </div>
    );

} export default App;