import React, {useEffect, useContext, useState, createContext} from 'react';
import { useNavigate } from "react-router-dom";
import ArticleContext from "../../context/ArticleDataProvider";
import DataContext from "../../context/BrutDataProvider";
import "../../style/styles.css";

function CstmBouton({ button_props }) {
  

    const [showPrice, setShowPrice] = useState(true); // true affiche le texte, au survol affiche le prix

    const [openModal, setOpenModal] = useState(false);

    

    // State
    const [id_article, setIdArticle] = useState("quelconque_1");
    const [prix, setPrix] = useState("test");


    // useNavigate Hook
    const navigate = useNavigate();

    // useContext Hook
    const { fetchArticleData, fetchPanierData, postPanierData } = useContext(ArticleContext);

    // useContexte Hook
    const { fetchDataForPage } = useContext(DataContext);



    const redirection = () => {
        if (button_props.navigation) {
            navigate(button_props.navigation);
        }
    };
    
    const togglePrice = () => {
        setShowPrice(!showPrice);
        console.log(showPrice)
    };

    const clickOnPrice = () => {
        fetchPanierData().then(panier => {
            
            console.log("panier=", panier);
            if (panier){
                console.log("panier.length", panier.length);
            }
            // console.log("id_article=", id_article);


            if (!panier) {
                postPanierData(id_article).then(newPanier => {
                    if (newPanier.length === 1) {
                        console.log("newPanier.length", newPanier.length);
                        console.log(`${newPanier} "nouveau panier"`);
                        console.log(`${id_article} ajoutée`);
                        navigate(navigation);
                    } else {
                        navigate("erreur");
                    }
                }).catch(error => {
                    console.error("Une erreur s'est produite :", error.message);
                });
            } else {
                console.log("ton panier n'est pas vide alors direction la page panier");
                navigate(button_props.navigation);
            }
        }).catch(error => {
            console.error("Une erreur s'est produite :", error.message);
        });
    };

    const redirection_panier = () => {
        
        
        fetchPanierData().then(panier => {
            console.log("panier",panier)
            if (!panier) {

                setOpenModal(true);

                setTimeout(() => {
                    setOpenModal(false);
                }, 2000);                           // Ferme le modal après 2 secondes
            

            } else {

                if (button_props.navigation) {
                    navigate(button_props.navigation);
                }

            }

        }).catch(error => {
            console.error("Une erreur s'est produite :", error.message);
        });


    };


    switch (button_props.type) {

        case 'bouton_menu_defaut':

            return (

                <p className="sub-menu" style={button_props.style}>
                        {button_props.text}
                </p>

            );

        case 'bouton_menu':

            return (

                <p className="sub-menu" style={button_props.style} onClick={redirection}>
                        {button_props.text}
                </p>

            );

        case 'bouton_menu_modal':
            return (

                <div>
                
                    {!openModal && (
                    <div className="ModalPanier">
                        <p className="sub-menu" style={button_props.style} onClick={redirection_panier}>
                            {button_props.text}
                        </p>
                    </div> )}


                    {openModal && (

                        <div>
                            <div className="ModalPanier">
                                <p className="sub-menu" style={button_props.style} onClick={redirection_panier}>
                                    {button_props.text}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, width: 500 }}>
                                <h2> Vous n'avez pas de produit dans votre panier </h2>
                            </div>
                        </div>

                    )}

                </div>

            );
        
        case 'bouton_contenu_':
            return (
                <p style={button_props.style} onClick={clickOnPrice}>{button_props.prix}</p>
            );
        case 'bouton_contenu_defaut':
            return (
                <p style={button_props.style}>{button_props.text}</p>
            );

        case 'bouton_contenu':
            return (
                <div className="custom-content-prix" onMouseEnter={togglePrice} onMouseLeave={togglePrice}>
                    { !showPrice && (
                        <p style={button_props.style_toggle} onClick={clickOnPrice}>{button_props.prix}</p>
                    )}

                    { showPrice && (
                        <p style={button_props.style}>{button_props.text}</p>
                    )}
                </div>
            );

        default:
        return null;
    }
}

export default CstmBouton;


    