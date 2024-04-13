import React, {useContext, useState } from "react";
import ArticleContext from "../context/ArticleContextProvider";
import Props from "../context/PropsProvider";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";
import "../styles.css";

// Composante Acceuil --> appelle les composantes Bandeau, Section, Contenu
function CstmAccueil() {

// Utilisation du hook useContext pour accéder aux données des contextes
const {article} = useContext(ArticleContext) || [{}]; // Vérifie si article est null, et affecte un objet vide par défaut
const [premierArticle] = article[0] || [{}]; // Vérifie si article est null, et affecte un tableau vide par défaut
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
