import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Backdrop, Fade } from '@mui/material';
import BoutonContext from "../../context/BoutonProvider";
import "../../style/styles.css";


function CstmBoutonMenu({ text, style, navigation, component_contents}) {

// State
    const [openPanierModal, setOpenPanierModal] = useState(false);
    const [temps_affichage, setTemps_affichage] = useState(2000);
    const [renderComponent,setRenderComponent]=useState(null);



// useContext Hook
    const contextBouton = useContext(BoutonContext);

// Function   

    

    useEffect(() => {

        // Recuperer le render de chaque bouton A PLACER DANS UNE FONCTION

        if (component_contents && component_contents.length > 0) {

            const boutons = component_contents.map((element, index) => {
                console.log("element",element);

                let component = null;

                if (contextBouton[element] !== null) {

                    component = contextBouton[element]({ text, style, navigation });
                }

                return <div key={index}>{component}</div>;
                

            });
            console.log("boutons",boutons)
            setRenderComponent(boutons);
            
        }
    }, []);


// Render
    return (

        <div>
            {renderComponent && <div>{renderComponent}</div>}
        </div>

        
    );

}

export default CstmBoutonMenu;

    
// Function



// // useEffect Hook
//     useEffect(() => {
        
//         if (openPanierModal) {

//             setTimeout(() => {
//                 setOpenPanierModal(false);
//             }, 2000);                           // Ferme le modal après 2 secondes
            

//         }

//     }, [openPanierModal]);

