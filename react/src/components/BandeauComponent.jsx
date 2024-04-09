import React, { useState } from "react";
import CustomSubMenu from "./subcomponents/SubMenuComponent";
import "../styles.css";

function CustomBandeau() {
  const [submenuProps, setSubmenuProps] = useState([
    { id: 1, text: "YNG SHOP", color: "#000000" },
    { id: 2, text: "PANIER", color: "#B311FF" },
  ]);

  return (
    <div className="custom-bandeau">
      {submenuProps.map((submenuprop) => (
        <CustomSubMenu
          key={submenuprop.id}
          text={submenuprop.text}
          color={submenuprop.color}
        />
      ))}
    </div>
  );
}

export default CustomBandeau;
