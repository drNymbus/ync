import {useContext, useEffect, useState } from "react";
import ArticleContext from "../context/APIProvider";

// Acceuil --> Bandeau, Section, Contenu
function Article({ id }) {

    const [article, setArticle] = useState(null);
    const { fetchArticle, postBasket } = useContext(ArticleContext);

    async function add_to_basket() {
        console.log("Ima buy that!");
        await postBasket(id);
    };

    useEffect(() => {
        fetchArticle(id)
            .then(a => { setArticle(a); })
            .catch(err => { console.error(err); });
    }, []);

    let img = (
        <div className="article-image">
            <img src={(article === null) ? "" : article.image} loading="eager" width="400"/>
        </div>
    );
    let desc = (
        <div className="article-description">
            <p>{(article === null) ? "" : article.description}</p>
        </div>
    );

    let price = (
        <button className="article-button" onClick={add_to_basket}>
            {(article === null) ? "" : (article.price + "$")}
        </button>
    );

    return (
        <div className="article-container">
            {img}
            {desc}
            {price}
        </div>
    );

} export default Article;