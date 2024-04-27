import React, {useContext, useEffect} from "react";
import DataContext from "./context/BrutDataProvider";
import "./style/errorstyles.css";


// Composant Erreur : reçoit le numéro de l'erreur et la description de l'erreur puis les affiche pour le client.
function CstmErreur({ erreur, descriptionErreur }) {

// useContext Hook
    const { fetchDataForPage, pageData } = useContext(DataContext);


// useEffect Hook    
    useEffect(() => {
        fetchDataForPage("erreur");
    }, []);


// Render
    return (

        <div className="container">

            <CstmBandeau buttons={pageData.buttonData} />
            
            <CstmSection image={pageData.image} name={pageData.name}/>

            <div className="error-container">

                <h2>Erreur: {erreur}</h2>
                <p>Description de l'erreur: {descriptionErreur}</p>
                
            </div>

        </div>

    );
}

export default CstmErreur;
