import React from "react";
import "../../styles.css";

function CustomSubMenu({ id, text, color }) {
  return (
    <p className="sub-menu" id={id} style={{ color: color }}>
      {text}
    </p>
  );
}

export default CustomSubMenu;
