import React, {useContext, useState } from "react";
import ArticleContext from "../context/ArticleContextProvider";
import Props from "../context/PropsProvider";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import "../styles.css";

// Composante Acceuil --> appelle les composantes Bandeau, Section, Contenu
function CstmAccueil() {

// Hook useContext pour accéder aux données des contextes
const {article} = useContext(ArticleContext) || [{}];
const [premierArticle] = article[0] || [{}];
const {props} = useContext(Props) || []; 
const [p_sectionProps] = props.sectionProps[0] || [];
const recup_id = useState(null);

  return (
    <div className="custom-full-page-content">
      <CstmBandeau list_btn_ids={recup_id} />
      <CstmSection image={p_sectionProps.image} name={p_sectionProps.name} />
      <CstmContenu
        image={premierArticle.image}
        description={premierArticle.description}
        prix={premierArticle.price}
      />
    </div>
  );
}

export default CstmAccueil;
