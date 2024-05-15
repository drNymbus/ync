import React, {useContext, useEffect} from "react";

import DataContext from "./context/BrutDataProvider";

import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";

import "./style/styles.css";


// Paiement --> Bandeau, Section, ???
function CstmPaiement() {


// Context
    const { fetchDataForPage, pageData } = useContext(DataContext);


// Effect
    useEffect(() => {
        fetchDataForPage("paiement");
    }, []);

   
// Render
    return (

        <div>

            Paiement
            {/* <CstmBandeau buttons={pageData.buttonData} />
            <CstmSection image={pageData.image} name={pageData.name} /> */}

        </div>

    );
    
}

export default CstmPaiement;
