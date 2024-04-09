import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";

function CstmBoutonMenu({ id, text, color }) {
  const navigate = useNavigate();
  return (
    <p
      className="sub-menu"
      id={id}
      style={{ color: color }}
      onClick={() => navigate("/Panier")}
    >
      {text}
    </p>
  );
}

export default CstmBoutonMenu;
