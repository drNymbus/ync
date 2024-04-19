import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";

function CstmBoutonMenu({ key, text, style, includeOnClick}) {

// <CstmBoutonMenu 
//   key={button.id} 
//   text={button.text} 
//   style={button.style} 
//   includeOnClick={button.includeOnClick} 
// />

  const navigate = useNavigate();
  
  const on_click = () => { 
    if (includeOnClick) navigate("/Panier"); 
  };

  return (
    <p className="sub-menu" id={key} style={style} onClick={on_click}>
      {text}
    </p>
  );
}

export default CstmBoutonMenu;
