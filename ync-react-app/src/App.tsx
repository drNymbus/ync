import React from "react";
import { Routes, Route } from "react-router-dom";
import LogoComponent from "./pages/Splashpage";
import CstmAccueil from "./pages/Accueil";
import CstmPanier from "./pages/Panier";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<LogoComponent content={<CstmAccueil />} />}
        />
        <Route exact path="/Panier" element={<CstmPanier />} />
      </Routes>
    </div>
  );
}
