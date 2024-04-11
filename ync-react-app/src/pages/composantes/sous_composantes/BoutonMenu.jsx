import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";

function CstmBoutonMenu({ id, text, style, includeOnClick}) {
  const navigate = useNavigate();

  const on_click = () => { if (includeOnClick) navigate("/Panier"); };

  return (
    <p
      className="sub-menu"
      id={id}
      style={style}
      onClick={on_click}
    >
      {text}
    </p>
  );
}

export default CstmBoutonMenu;
