import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";

function CstmBoutonMenu({ text, style, includeOnClick}) {

  const navigate = useNavigate();
  
  const on_click = () => { 
    if (includeOnClick !== null) {
      navigate(includeOnClick);
    }
  };
  

  return (
    <p className="sub-menu" style={style} onClick={on_click}>
      {text}
    </p>
  );
}

export default CstmBoutonMenu;

// <CstmBoutonMenu 
//   key={button.id} 
//   text={button.text} 
//   style={button.style} 
//   includeOnClick={button.includeOnClick} 
// />