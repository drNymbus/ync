/* npm & React module imports */
import { useState, useContext, useEffect } from "react";

/* Custom context imports */
import APIContext from "./context/APIProvider";

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
    const { fetchItem, fetchBasket, postBasket } = useContext(APIContext);
    const [basket, setBasket] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchBasket()
            .then((data) => { if (data) setBasket(data); })
            .catch(e => console.error(`[useBasket;useEffect | fetchBasket] ${e.message} (${e.status}))`));

        for (let item in basket) {
            fetchItem(item)
                .then((data) => {
                    if (data) {
                        const amount = parseFloat(data.price);
                        setTotal(total + (amount * basket[item]))
                    }
                })
                .catch(e => console.error(`[useBasket;useEffect | fetchItem] ${e.message} (${e.status})`))
        }
    }, []);

    function addBasket(item, price) {
        if (typeof price === "string") price = parseFloat(price);

        let count = 1;
        if (basket[item]) count = basket[item] + 1;

        postBasket({...basket, [String(item)]: count});
        setBasket({...basket, [String(item)]: count});
        setTotal(total + price);
    };

    function removeBasket(item, price) {
        if (basket[item]) {
            let count = basket[item] - 1;
            
            postBasket({...basket, [item]: count});
            setBasket({...basket, [item]: count});
            setTotal(total - price);
        }
    };

    return { basket, total, addBasket, removeBasket };
}

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { basket, total, addBasket, removeBasket } = useBasket();

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

    const content = (
        <div className="App">
            <Bandeau name={buttonDisplay} basket={basket} homeFn={homeState} clickFn={updateState}/>
            <Section name={section.name} image={section.image}/>

            <div style={{display: (state == "HOME") ? "block" : "none" }}>
                <Item id="quelconque" add={addBasket} goto={basketState}/>
            </div>
            <div style={{display: (state == "BASKET") ? "block" : "none" }}>
                <Basket basket={basket} add={addBasket} rm={removeBasket} next={paymentState}/>
            </div>
            <div style={{display: (state == "PAYMENT") ? "block" : "none" }}>
                <Payment basket={basket} price={total}/>
            </div>
        </div>
    );

    return ( // HTML website rendering
        // <Logo content={content} />
        content
    );

} export default App;