import React from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import "../styles.css";

function CstmPaiement() {

  return (
    <div>
      <CstmBandeau />
      <CstmSection image={firstsection.image} name={firstsection.name} />
    </div>
  );
}

export default CstmPaiement;
