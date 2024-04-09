import React from "react";
import "../../../styles.css";

function CstmArticle() {
  return (
    <div>
      <img src="../../public/images/tab.png" alt="Image article" />
      <h2 className="title"> Quelconque </h2>
      <p className="description"> Description de l'article </p>
      <p className="price"> Prix de l'article </p>
      <div>Article selection</div>
    </div>
  );
}

export default CstmArticle;
