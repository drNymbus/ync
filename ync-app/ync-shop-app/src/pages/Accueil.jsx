import React, {useContext, useEffect} from "react";

import PageContext from "./context/PageProvider";

import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmContenu from "./composantes/Contenu";

import "./style/styles.css";


function CstmAccueil() {

// Context
    const { page, setPage } = useContext(PageContext);

    
// Effect
    useEffect(() => {

        setPage("accueil");

    }, []);

  
// Render
    return (

        <div className="custom-full-page-content">

            {page && <CstmBandeau page={page} />}

            {page && <CstmSection page={page} />}

            {page && <CstmContenu page={page} />}

        </div>

    );

}

export default CstmAccueil;