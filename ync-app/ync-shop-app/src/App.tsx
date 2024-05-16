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

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { fetchBasket, postBasket } = useContext(APIContext);

    // Define default app state
    const [state, setState] = useState({current: "HOME", goto: "BASKET"});

    // Retrieve basket/session if it exists
    const [basket, setBasket] = useState([]);
    useEffect(() => {
        fetchBasket()
            .then((data) => { (data === undefined) ? [] : setBasket(data); })
            .catch((err) => { console.error(err); });
    }, []);

    // Define default "Bandeau" and "Section" state
    const [button_display, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    const addBasket = async (e, id) => {
        console.log("addBasket", id);
        let new_basket = await postBasket([...basket, id]);
        setBasket(new_basket);
    }

    const removeBasket = async (e, id) => {
        console.log("removeBasket", id);
        let new_basket = [...basket];
        let index = new_basket.indexOf(id);
        new_basket.splice(index, 1);

        new_basket = await postBasket(new_basket);
        setBasket(new_basket);
    }

    // Define default content state
    // const [content, setContent] = useState(<Logo content={<Item id="quelconque" clickFn={updateBasket}/>}/>);
    const [content, setContent] = useState(<Item id="quelconque" clickFn={addBasket}/>);

    // onClick home button
    const gotoHome = () => {
        setButtonDisplay("PANIER");
        setSection({name: "Quelconque", image: "assets/home_icon.svg"})
        setContent(<Item id="quelconque" clickFn={addBasket}/>);
        setState({current: "HOME", goto: "BASKET"});
    };

    // onClick payment button
    const gotoPayment = () => {
        setButtonDisplay("RETOUR");
        setSection({name: "Payment", image: "assets/home_icon.svg"})
        setContent(<Payment />);
        setState({current: "PAYMENT", goto: "BASKET"});
    };

    // onClick top right button
    const updateState = () => {
        if (state.current === "HOME") { // From home go to basket
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"})
            setContent(<Basket basket={basket} add={addBasket} remove={removeBasket} next={gotoPayment}/>);
            setState({current: "BASKET", goto: "HOME"});

        } else if (state.current === "BASKET") { // From basket go to home
            setButtonDisplay("PANIER");
            setSection({name: "Quelconque", image: "assets/home_icon.svg"})
            setContent(<Item id="quelconque" clickFn={addBasket}/>);
            setState({current: "HOME", goto: "BASKET"});

        } else if (state.current === "PAYMENT") { // From payment go to basket
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"});
            setContent(<Basket basket={basket} add={addBasket} remove={removeBasket} next={gotoPayment}/>);
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