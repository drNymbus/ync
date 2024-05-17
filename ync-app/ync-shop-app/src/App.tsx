/* npm & React module imports */
import { useState, useContext, useEffect, useCallback } from "react";

/* Custom context imports */
import APIContext from "./context/APIProvider";

/* Custom hook imports */
import { useBasket } from "./hooks/Basket";

/* Custom component imports */
import Bandeau from "./components/Bandeau";
import Section from "./components/Section";
import Logo from "./components/Splashpage";
import Item from "./components/Item";
import Basket from "./components/Basket";
import Payment from "./components/Payment";

/* Style imports */
import "./style/styles.css";

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { fetchBasket } = useContext(APIContext);
    const { basket } = useBasket(fetchBasket);
    // useEffect(() => { // Retrieve basket if it exists
    //     fetchBasket()
    //         .then((data) => updateBasket(data))
    //         .catch((err) => console.error(err));
    // }, []);

    // Define default app state
    const [state, setState] = useState({current: "HOME", goto: "BASKET"});

    // Define default "Bandeau" and "Section" state
    const [button_display, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    // Define default content state
    // const [content, setContent] = useState(<Logo content={<Item id="quelconque"/>}/>);
    const [content, setContent] = useState(<Item id="quelconque"/>);

    const homeState = () => {
        setButtonDisplay("PANIER");
        setSection({name: "Quelconque", image: "assets/home_icon.svg"})
        setContent(<Item id="quelconque"/>);
        setState({current: "HOME", goto: "BASKET"});
    };

    const paymentState = () => {
        setButtonDisplay("RETOUR");
        setSection({name: "Payment", image: "assets/home_icon.svg"})
        setContent(<Payment />);
        setState({current: "PAYMENT", goto: "BASKET"});
    };

    const basketState = () => {
        setButtonDisplay("RETOUR");
        setSection({name: "Panier", image: "assets/home_icon.svg"})
        setContent(<Basket basket={basket} next={paymentState}/>);
        setState({current: "BASKET", goto: "HOME"});
    };

    // onClick top right button
    const updateState = () => {
        if (state.current === "HOME") {
            basketState();
        } else if (state.current === "BASKET") {
            homeState();
        } else if (state.current === "PAYMENT") {
            basketState();
        }
    }

    return ( // HTML website rendering
        <div className="App">
            <Bandeau name={button_display} basketSize={basket.length} homeFn={homeState} clickFn={updateState}/>
            <Section name={section.name} image={section.image}/>
            {content}
        </div>
    );

} export default App;