import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/styles.css";


function CstmBoutonMenu({ text, style, includeOnClick}) {

// useNavigate Hook
    const navigate = useNavigate();

    
// Function
    const on_click = () => { 
        
        if (includeOnClick !== null) {
            navigate(includeOnClick);
        }
    };

    
// Render
    return (

        <p className="sub-menu" style={style} onClick={on_click}>
            {text}
        </p>
        
    );

}

export default CstmBoutonMenu;