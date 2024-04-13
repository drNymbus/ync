import React from "react";
import { ArticleContextProvider } from "./context/ArticleContextProvider";
import { PropsProvider } from "./context/PropsProvider";
import { Routes, Route } from "react-router-dom";
import LogoComponent from "./pages/Splashpage";
import CstmAccueil from "./pages/Accueil";
import CstmPanier from "./pages/Panier";
import CstmPaiement from "./pages/Paiement";
import "./styles.css";


export default function App() {

// Contexte fourni aux composants enfants : <ArticleContextProvider>, <PropsProvider> (On englobe les composantes de notre application pour que le contexte soit disponible partout dans celle-ci)
// + Déclaration des routes de l'application avec <Routes> de la composante <BrowserRouter> ("/" --> CstAccueil; "/Panier" --> CstmPanier; "/Paiement" --> CstmPaiement)

  return (
    <div className="App">


      <ArticleContextProvider>
        <PropsProvider>

          <Routes>
            <Route path="/" element={<LogoComponent content={<CstmAccueil />} />} />
            <Route path="/Panier" element={<CstmPanier />} />
            <Route path="/Paiement" element={<CstmPaiement />} />
          </Routes>

        </PropsProvider>
      </ArticleContextProvider>


    </div>
  );
}
