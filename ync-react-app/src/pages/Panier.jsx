import React from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmPanierHaut from "./composantes/PanierHaut";
import CstmPanierBas from "./composantes/PanierBas";
import "../styles.css";

function CstmPanier() {
  return (
    <div>
      <CstmBandeau />
      <CstmSection />
      <CstmPanierHaut />
      <CstmPanierBas />
    </div>
  );
}

export default CstmPanier;
