import React, {useState, useContext, useEffect} from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmPanierHaut from "./composantes/PanierHaut";
import CstmPanierBas from "./composantes/PanierBas";
import DataContext from "./context/BrutDataProvider";
import ArticleContext from "./context/ArticleDataProvider";
import "./style/styles.css";

// Panier --> Bandeau, Section, PanierHaut, PanierBas
function CstmPanier() {

  const [pageData, setPageData] = useState(null); 

  const { fetchDataForPage } = useContext(DataContext);

  useEffect(() => {

    const pageD = fetchDataForPage("panier");
    setPageData(pageD); 
    
    //fonction_fetch_panier # meme si c'est null

  }, []);

  return (
    <div>
      {pageData && <CstmBandeau buttons={pageData.buttonData} />}
      {pageData && <CstmSection image={pageData.sectionData.image} name={pageData.sectionData.name} />}
      {/* <CstmPanierHaut image={premierArticle.image}
        description={premierArticle.description}
        prix={premierArticle.prix}/> */}
      <CstmPanierBas />
    </div>
  );
}

export default CstmPanier;