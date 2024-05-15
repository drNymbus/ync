// Import des modules et composants React nécessaires
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render //
// StrictMode activé : Demander à React de détecter et expliciter plus de problèmes potentiels
// BrowserRouter : Gérer la navigation entre les pages de l'application via les routes
root.render(

    <React.StrictMode>

        <BrowserRouter>

            <App />

        </BrowserRouter>

    </React.StrictMode>

);