import React, { useContext, useState } from "react";
import Props from "../../context/PropsProvider";
import CstmBoutonMenu from "./sous_composantes/BoutonMenu";
import "../../styles.css";

function CstmBandeau({list_btn_ids}) {

const {props} = useContext(Props);
const [submenuProps] = props.submenuProps;

// Convertir les IDs en un tableau pour pouvoir utiliser includes
const list_btn_ids_array = Object.keys(list_btn_ids);
// Filtrer les submenuProps pour ne conserver que ceux correspondant aux IDs dans list_btn_ids_array
const filteredSubmenuProps = submenuProps.filter(submenu => list_btn_ids_array.includes(submenu.id.toString()));

  return (

    <div className="custom-bandeau">

      <div className="gauche">
        {filteredSubmenuProps.length > 0 && (
         <CstmBoutonMenu key={filteredSubmenuProps[0].id} text={filteredSubmenuProps[0].text} style={filteredSubmenuProps[0].style} includeOnClick={filteredSubmenuProps[0].includeOnClick} />)}
      </div>

      <div className="droite">
        {filteredSubmenuProps.slice(1).map((submenuprop) => (<CstmBoutonMenu key={submenuprop.id} text={submenuprop.text} style={submenuprop.style} includeOnClick={submenuprop.includeOnClick} />))}
      </div>

    </div>
  );
}

export default CstmBandeau;
