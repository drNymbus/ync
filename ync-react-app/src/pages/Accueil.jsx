import React, { useState } from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import "../styles.css";

function CstmAccueil() {
  // State
  const sectionProps = useState([
    { id: 1, image: "images/ellipse.png", name: "Quelconque" },
    { id: 2, image: "???", name: "Panier" },
  ]);
  const contentProps = useState([
    {
      id: 1,
      image: "images/tab.png",
      description: "Description 1",
      prix: 10.99,
    },
  ]);

  const [firstsection] = sectionProps[0];
  5;
  const [firstcontent] = contentProps[0];

  return (
    <div className="custom-full-page-content">
      <CstmBandeau />
      <CstmSection image={firstsection.image} name={firstsection.name} />
      <CstmContenu
        image={firstcontent.image}
        description={firstcontent.description}
        prix={firstcontent.prix}
      />
    </div>
  );
}

export default CstmAccueil;
