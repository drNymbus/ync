import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const Props = createContext();

// Création du fournisseur de contexte
export const PropsProvider = ({ children }) => {
//   const [props, setProps] = useState(null);

  const sectionProps = useState([
      { id: 1, image: "images/sectionQuelconque.png", name: "Quelconque" },
      { id: 2, image: "images/sectionPanier.png", name: "Panier" },
      { id: 3, image: "images/sectionPanier.png", name: "Paiement" },
    ]);

  const submenuProps = useState([
    {
        id: 0, 
        text: "YNG SHOP", 
        style: { marginLeft: "10px", justifyContent: "space-between", color: "#000000" },
        includeOnClick:false,
    },

    { 
        id: 1, 
        text: "PANIER", 
        style: { marginRight: "10px", justifyContent: "space-between", color: "#B311FF" },
        includeOnClick:true
    },
    ]);

    const props = { sectionProps, submenuProps };

  return (
    <Props.Provider value={props}>
        {children}
    </Props.Provider>
  );
};

export default Props;
