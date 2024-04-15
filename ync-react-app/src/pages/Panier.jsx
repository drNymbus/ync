import React, {useContext, useState } from "react";
import ArticleContext from "../context/ArticleContextProvider";
import Props from "../context/PropsProvider";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmPanierHaut from "./composantes/PanierHaut";
import CstmPanierBas from "./composantes/PanierBas";
import "../styles.css";

// Panier --> appelle les composantes Bandeau, Section, PanierHaut, PanierBas
function CstmPanier() {

// Hook useContext pour accéder aux données du contexte article et props qui contiennent /// ///
const {article} = useContext(ArticleContext);
const [premierArticle] = article[0];
const {props} = useContext(Props);
const [p_sectionProps] = props.sectionProps[1];

  return (
    <div>
      <CstmBandeau />
      <CstmSection image={p_sectionProps.image} name={p_sectionProps.name} />
      <CstmPanierHaut image={premierArticle.image}
        description={premierArticle.description}
        prix={premierArticle.prix}/>
      <CstmPanierBas />
    </div>
  );
}

export default CstmPanier;
