import React, {useEffect, useState, createContext} from 'react';
import { Button, Modal, Backdrop, Fade } from '@mui/material';
import { useNavigate } from "react-router-dom";

// init Context
const BoutonContext = createContext();



export const BoutonProvider = ({ children }) => {

    const [openPanierModal, setOpenPanierModal] = useState(false);

    // useNavigate Hook
    const navigate = useNavigate();

// Component_contents

    const bouton_menu_defaut = ({ text, style, navigation }) => {

        const redirection = () => {
            if (navigation) {
                navigate(navigation);
            }
        };
    
        return (
            <p className="sub-menu" style={style} onClick={redirection}>
                {text}
            </p>
        );
    };


    const bouton_modal = ({ text, style, navigation }) => {

        const closePanierModal = () => {
            setOpenPanierModal(false); // Ferme le modal panier
        };
    
        return (
            <Modal open={openPanierModal} onClose={closePanierModal} closeAfterTransition>
                <Fade in={openPanierModal}>
                    <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, width: 500 }}>
                        <h2> L'équipe YNC vous remercie pour votre confiance !</h2>
                    </div>
                </Fade>
            </Modal>
        );
    };
    

    const bouton_contenu = ({ text, style, navigation }) => {

        const togglePrice = () => {
            setShowPrice(!showPrice);
        };
    
        const clickOnPrice = () => {
            fetchPanierData().then(panier => {
                console.log("panier.length", panier.length);
                console.log("panier=", panier);
    
                if (panier.length === 0) {
                    postPanierData(id_article).then(newPanier => {
                        if (newPanier.length === 1) {
                            console.log("newPanier.length", newPanier.length);
                            console.log(`${newPanier} "nouveau panier"`);
                            console.log(`${id_article} ajoutée`);
                        } else {
                            navigate("erreur");
                        }
                    }).catch(error => {
                        console.error("Une erreur s'est produite :", error.message);
                    });
                } else {
                    navigate("panier");
                }
            }).catch(error => {
                console.error("Une erreur s'est produite :", error.message);
            });
        };
    
        return (
            <div className="custom-content-prix" onMouseEnter={togglePrice} onMouseLeave={togglePrice}>
                {showPrice ?
                    (<p style={{ color: "#FFFFFF" }} onClick={clickOnPrice}>{prix}</p>) :
                    (<p style={{ color: "#BC2EFE" }}>Je le veux</p>)
                }
            </div>
        );
    };

//Render
    return (

        <BoutonContext.Provider value={{ bouton_menu_defaut, bouton_modal, bouton_contenu }}> 
            {children}
        </BoutonContext.Provider>

    );

};

export default BoutonContext;