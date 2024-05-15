import React from "react";
import { Routes, Route } from "react-router-dom";

import { DataProvider } from "./pages/context/BrutDataProvider";
import { ArticleContextProvider } from "./pages/context/ArticleDataProvider";
import {PageProvider} from "./pages/context/PageProvider";

import LogoComponent from "./pages/Splashpage";
import CstmAccueil from "./pages/Accueil";
import CstmPanier from "./pages/Panier";
import CstmPaiement from "./pages/Paiement";

import "./pages/style/styles.css";


export default function App() {

// Contexte fourni aux composants enfants : <ArticleContextProvider>, <PropsProvider> (On englobe les composantes de notre application pour que certaines données soit disponible)
// + Déclaration des redirections de l'application avec <Routes> de la composante <BrowserRouter> ("/" --> CstAccueil; "/Panier" --> CstmPanier; "/Paiement" --> CstmPaiement)

// Render
    return (

        <div className="App">

            
            <PageProvider>

                <DataProvider>

                    <ArticleContextProvider>

                        <Routes>

                            <Route path="/" element={<LogoComponent content={<CstmAccueil />} />} />
                            <Route path="/Panier" element={<CstmPanier />} />
                            <Route path="/Paiement" element={<CstmPaiement />} />

                        </Routes>
                        
                    </ArticleContextProvider>

                </DataProvider>

            </PageProvider>
            


        </div>
        
    );
    
}
