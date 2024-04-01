import React from "react";
import LogoComponent from "./components/LogoComponent";
import CustomFullPageContent from "./components/FullPageComponent";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <LogoComponent content={<CustomFullPageContent />} />
    </div>
  );
}
