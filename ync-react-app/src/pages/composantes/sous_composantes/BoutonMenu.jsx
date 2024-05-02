import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import BoutonContext from "../../context/BoutonProvider";
import "../../style/styles.css";


function CstmBoutonMenu({ text, style, navigation, functions, component_contents}) {

//useState
    const [renderComponent,setRenderComponent]=useState(null);

// useNavigate Hook
    const navigate = useNavigate();

// useContext Hook
    const contextBouton = useContext(BoutonContext);


    // Déplacer la déclaration de storedFunctions à l'extérieur de useEffect
    let storedFunctions = {};

    useEffect(() => {

        // Recuperer les fonctions utiles au render de chaque bouton A PLACER DANS UNE FONCTION / A PLACER AVANT LA RECUP DU RENDER

        // if (functions && functions.length > 0) {

        //     const fonctions = functions.map((fonction, index) => {

        //         console.log(fonction); // redirection
        //         // Allez chercher la fonction redirection du boutoncontext

        //     });

        // }

        

        // Recuperer les fonctions utiles au rendu de chaque bouton
        if (functions && functions.length > 0) {
            storedFunctions = {}; // Objet pour stocker les fonctions

            functions.forEach((functionName) => {
                console.log("functionName",functionName);
                // Vérifier si la fonction existe dans le contexte
                if (contextBouton[functionName]) {
                    storedFunctions[functionName] = contextBouton[functionName];
                } else {
                    console.warn(`La fonction "${functionName}" n'est pas trouvée dans BoutonContext.`);
                }
            });

            // Utilisation ultérieure des fonctions stockées
            console.log("storedFunctions",storedFunctions);
            
        }



        // Recuperer le render de chaque bouton A PLACER DANS UNE FONCTION

        if (component_contents && component_contents.length > 0) {

            const boutons = component_contents.map((element, index) => {
                console.log("element",element);

                let component = null;

                if (contextBouton[element] !== null) {

                    component = contextBouton[element]({ text, style, navigation, storedFunctions });
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



// useEffect Hook
    // useEffect(() => {
    //     if (component_contents && component_contents.length > 0) {

    //             const boutons = component_contents.map((element, index) => {

    //                 const component = contextBouton[element];
    //                 return <div key={index}>{component}</div>;

    //             });

    //             setRenderComponent(boutons);
                
    //         }
    // }, []);



















    // const [boutons, setBoutons] = useState(null);

    // if (component_contents && component_contents.length > 0) {
    //     const contextBouton = useContext(BoutonContext);

    //     boutons = component_contents.map((component_content, index) => {
    //         // Vérifier si la clé existe dans le contexte
    //         if (contextBouton.hasOwnProperty(component_content)) {
    //             const component = contextBouton[component_content];
    //             return <div key={index}>{component}</div>;
    //         } else {
    //             // Gérer le cas où la clé n'existe pas dans le contexte
    //             return null;
    //         }
    //     });
    // }

    


    // let boutons = null;

    // if (component_contents && component_contents.length > 0) {
    //     const contextBouton = useContext(BoutonContext);

    //     boutons = component_contents.map((component_content, index) => {
    //         // Vérifier si le contexte existe et s'il contient la clé
    //         if (contextBouton && contextBouton.hasOwnProperty(component_content)) {
    //             const component = contextBouton[component_content];
    //             return <div key={index}>{component}</div>;
    //         } else {
    //             // Gérer le cas où la clé n'existe pas dans le contexte
    //             return null;
    //         }
    //     });
    // }


    // if (component_contents && component_contents.length > 0) {

    //     component_contents.map((component_content) => (
    //         const {component_content} = useContext(BoutonContext);
    //     ));

    //     const boutons = component_contents.map((bouton, index) => (

    //         <div key={index}>{bouton}</div>
    
    //     ));

    // }

    

// const contextBouton = useContext(BoutonContext);

    // if (component_contents && component_contents.length > 0) {
    //     component_contents.map(bouton => contextBouton[bouton]);
    // }
    // const boutons = component_contents.map((bouton, index) => (

    //     <div key={index}>{bouton}</div>

    // ));




    // "component_contents":["bouton_menu_defaut","bouton_modal"]

    // Dans le contexte bouton_menu_defaut et bouton_modal :
    // const bouton_menu_defaut = (<p className="sub-menu" style={style} onClick={redirection}>{text}</p>);

    // const bouton_modal = (<Modal open={openAjoutModal} onClose={closeAjoutModal} closeAfterTransition><Fade in={openAjoutModal}><div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 , width: 500}}>
    //         <h2> {id_article} a été ajoutée au panier !</h2>
    //         <h2> L'équipe YNC vous remercie pour votre confiance !</h2>
    //     </div></Fade></Modal>);

// useContext Hook
    // const ["bouton_menu_defaut","bouton_modal"] = useContext(BoutonContext);

    // const boutonttt = useContext(BoutonContext)["bouton_menu_defaut","bouton_modal"];

    // // const bouton_menu_defaut = useContext(BoutonContext)["bouton_menu_defaut"];
    // // const bouton_modal = useContext(BoutonContext)["bouton_modal"];



    // // Render des boutons basés sur component_contents
    // const boutons = component_contents.map((bouton, index) => (

    //     <div key={index}>{bouton}</div>

    // ));

    
// Function



// // useEffect Hook
//     useEffect(() => {
        
//         if (openPanierModal) {

//             setTimeout(() => {
//                 setOpenPanierModal(false);
//             }, 2000);                           // Ferme le modal après 2 secondes
            

//         }

//     }, [openPanierModal]);

