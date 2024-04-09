import React, { useState } from "react";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import "../../styles.css";

function CstmBandeau() {
  const [submenuProps, setSubmenuProps] = useState([
    { id: 0, text: "YNG SHOP", color: "#000000" },
    { id: 1, text: "PANIER", color: "#B311FF" },
  ]);

  return (
    <div className="custom-bandeau">
      {submenuProps.map((submenuprop) => (
        <CstmBoutonMenu
          key={submenuprop.id}
          text={submenuprop.text}
          color={submenuprop.color}
        />
      ))}
    </div>
  );
}

export default CstmBandeau;
