/* npm & React module imports */
import { useState, useContext, useEffect } from "react";

/* Custom context imports */
import ArticleContext from "./context/APIProvider";

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
    const { fetchBasket, postBasket } = useContext(ArticleContext);

    // Define default app state
    const [state, setState] = useState({current: "HOME", goto: "BASKET"});

    // Retrieve basket/session if it exists
    const [basket, setBasket] = useState([]);
    useEffect(() => {
        fetchBasket()
            .then((data) => { data === undefined ? [] : setBasket(data); })
            .catch((err) => { console.error(err); });
    }, []);

    // Define default "Bandeau" and "Section" state
    const [button_display, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    // Define default content state
    const updateBasket = async () => {
        let basket = await postBasket();
        setBasket(basket);
    }
    const [content, setContent] = useState(<Logo content={<Item id="quelconque" clickFn={updateBasket}/>}/>);
    // const [content, setContent] = useState(<Item id="quelconque" clickFn={updateBasket}/>);

    // onClick home button
    const gotoHome = () => {
        setButtonDisplay("PANIER");
        setSection({name: "Quelconque", image: "assets/home_icon.svg"})
        setContent(<Item id="quelconque" clickFn={updateBasket}/>);
        setState({current: "HOME", goto: "BASKET"});
    };

    const gotoPayment = () => {
        setButtonDisplay("RETOUR");
        setSection({name: "Payment", image: "assets/home_icon.svg"})
        setContent(<Payment />);
        setState({current: "PAYMENT", goto: "BASKET"});
    };

    // onClick top right button
    const updateState = () => {
        if (state.current === "HOME") {
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"})
            setContent(<Basket basket={basket} update={updateBasket} next={gotoPayment}/>);
            setState({current: "BASKET", goto: "HOME"});
        } else if (state.current === "BASKET") {
            setButtonDisplay("PANIER");
            setSection({name: "Quelconque", image: "assets/home_icon.svg"})
            setContent(<Item id="quelconque" clickFn={updateBasket}/>);
            setState({current: "HOME", goto: "BASKET"});
        } else if (state.current === "PAYMENT") {
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"});
            setContent(<Basket basket={basket} update={updateBasket} next={gotoPayment}/>);
            setState({current: "BASKET", goto: "HOME"});
        }
    }

    return ( // HTML website rendering
        <div className="App">
            <Bandeau name={button_display} basketSize={basket.length} homeFn={gotoHome} clickFn={updateState}/>
            <Section name={section.name} image={section.image}/>
            {content}
        </div>
    );

} export default App;