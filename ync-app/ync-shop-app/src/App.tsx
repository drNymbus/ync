/* npm & React module imports */
import { useState } from "react";

/* Custom component imports */
import Bandeau from "./element/Bandeau";
import Section from "./element/Section";
import Logo from "./element/Splashpage";
import Article from "./element/Article";
import Basket from "./element/Basket";

/* Style imports */
import "./style/styles.css";


function App() {
    const [state, setState] = useState({current: "HOME", goto: "BASKET"});

    const [button_display, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});
    // const [content, setContent] = useState(<Logo content={<Article id="quelconque"/>}/>);
    const [content, setContent] = useState(<Article id="quelconque"/>);

    function updateState() {
        if (state.current === "HOME") {
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"})
            setContent(<Basket />);

            setState({current: "BASKET", goto: "HOME"});
        } else if (state.current === "BASKET") {
            setButtonDisplay("PANIER");
            setSection({name: "Quelconque", image: "assets/home_icon.svg"})
            setContent(<Article id="quelconque" />);

            setState({current: "HOME", goto: "BASKET"});
        } else if (state.current === "PAYMENT") {
            setButtonDisplay("RETOUR");
            setSection({name: "Panier", image: "assets/home_icon.svg"});
            setContent(<Basket />);

            setState({current: "BASKET", goto: "HOME"});
        }
    }

    return (
        <div className="App">
            <Bandeau name={button_display} click={updateState}/>
            <Section name={section.name} image={section.image}/>
            {content}
        </div>
    );

} export default App;