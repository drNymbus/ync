import React, {useState, useContext, useEffect} from "react";
import CstmBandeau from "./composantes/Bandeau";
import CstmSection from "./composantes/Section";
import CstmPanierHaut from "./composantes/PanierHaut";
import CstmPanierBas from "./composantes/PanierBas";
import DataContext from "./context/BrutDataProvider";
import ArticleContext from "./context/ArticleDataProvider";
import "./style/styles.css";


// Panier --> Bandeau, Section, PanierHaut, PanierBas
function CstmPanier() {

// State
    const [pageData, setPageData] = useState(null);
    const [panier, setPanier] = useState(null);
    const [articles, setArticles] = useState(null);
    const [compteur, setCompteur] = useState(null);
    const [compteurMontant, setCompteurMontant] = useState(null);


// useContext Hook
    const { fetchDataForPage } = useContext(DataContext);
    const {fetchArticleData, fetchPanierData } = useContext(ArticleContext); 


// Function
    const compterArticlesDansPanier = (liste) => { // Type de liste -> object
        
        if (!liste || typeof liste !== 'object') {
            return {};
        }

        const compteur = {};
        Object.values(liste).forEach(valeur => {
            compteur[valeur] = (compteur[valeur] || 0) + 1;
        });

        return compteur;
    }

    const calculerListMontant = (articles, compteur) => {

        const articleMontant = {};
        console.log("articlesListMontant:", articles);
        console.log("compteurListMontant:", compteur);
        console.log("articles.length:", articles.length);

        if (articles) {
            articles.map(article => {
                console.log("articleListMontant:", article);
                const { item_id, price } = article;
                const quantity = compteur[item_id];
                articleMontant[item_id] = quantity * price;
            });
        }

        return articleMontant;
    }


// useEffect Hook
    useEffect(() => {

        // Recupère le données json associées à la page panier
        const pageD = fetchDataForPage("panier");
        setPageData(pageD); 
        
        // Recupère le panier
        fetchPanierData().then(panierD => {

            setPanier(panierD);
            console.log(`${panierD} "//panierD stock into panier//"`);
            // console.log(typeof panierD); // Object

            const dict_panier=compterArticlesDansPanier(panierD);
            setCompteur(dict_panier);

            console.log("//dict_panier est egale//", Object.entries(dict_panier).map(([key, value]) => `${key}: ${value}`).join(', '));
            console.log("dict_panier est un tableau:", Array.isArray(dict_panier)); //false
            const keys_panier=Object.keys(dict_panier);

            // console.log(typeof keys_panier); // Object
            console.log(keys_panier);
            console.log("//keys_panier est egale//", Object.entries(keys_panier).map(([key, value]) => `${key}: ${value}`).join(', '));
            console.log("keys_panier est un tableau:", Array.isArray(keys_panier)); // true
            
            const articles_cache = [];

            Promise.all(keys_panier.map(id_article => fetchArticleData(id_article))).then(articleD => {
                
                console.log("articleD",articleD);
                articles_cache.push(...articleD);

                console.log("articles_cache",articles_cache);
                setArticles(articles_cache);
                

                console.log("articles_cache",typeof articles_cache,"dict_panier",typeof dict_panier)
                console.log("articles_cache", articles_cache,"dict_panier", dict_panier)

                // Code effectué une fois que toutes les données ont été récupérées
                const list_montant = calculerListMontant(articles_cache, dict_panier);

                console.log(list_montant, "list_montant");
                setCompteurMontant(list_montant);

            })
            .catch(error => {
                console.error("Une erreur s'est produite :", error.message);
            });
                 
        })
        
    }, []);


// Render
    return (

        <div>

            {pageData && <CstmBandeau buttons={pageData.buttonDataBandeau} />}

            {pageData && <CstmSection image={pageData.sectionData.image} name={pageData.sectionData.name} />}

            {panier && <div>

                {articles && articles.map((article, index) => (
                    <CstmPanierHaut
                    key={index}
                    titre={article.display_name}
                    image={article.image}
                    prix={article.price}
                    description_livraison={article.description_livraison}
                    categorie={article.categorie}
                    nombre={compteur[article.item_id]}
                    nbrIncrementationMax={pageData.nbrIncrementationMax}
                    />
                ))}
                
                {compteurMontant && <CstmPanierBas compteurMontant={compteurMontant} prixLivraison={pageData.prix_livraison}/>}

            </div>}
        
        </div>

    );
}

export default CstmPanier;


  // useEffect(() => {
  //   // requete asynchrone donc artciles_cache est vide 
  //       const list_montant= calculerListMontant(articles_cache, dict_panier);
  //       console.log(list_montant,"list_montant");
  //       setCompteurMontant(list_montant);
  // }, []);


      // Initialiser un tableau pour stocker les articles en cache
      
      // if (Array.isArray(keys_panier)) {

      // }

      // const articles_cache= {}
      //   keys_panier.forEach((id_article) => {
      //     console.log(id_article)
      //     fetchArticleData(id_article)
      //       .then(articleD => {
      //         console.log("articleD",articleD)
      //         articles_cache[id_article] = articleD;
      //         setArticles(prevState => [...prevState, articleD]); // Mettre à jour l'état de l'article avec les données récupérées
      //       })
      //       .catch(error => {
      //         console.error("Une erreur s'est produite :", error.message);
      //       });
      //   });










      // const list_montant= calculerListMontant(articles, dict_panier);

      // .catch(error => {
      //   console.error("Une erreur s'est produite :", error.message);
      // });

    // compterArticlesDansPanier avec panier
    
    // a suppr
    // const dict_panier=compterArticlesDansPanier(panier);

    // console.log(`${dict_panier.values} "dict_panier"`);

    // const keys_panier=Object.keys(dict_panier);

    // console.log(`${keys_panier.values} "keys_panier"`);

    // Parcourir les clés et effectuer l'appel à fetchArticleData pour chaque clé
    // keys_panier.forEach((id_article) => {
    //   console.log(id_article)
    //   fetchArticleData(id_article)
    //     .then(articleD => {
    //       setArticles(prevState => [...prevState, articleD]); // Mettre à jour l'état de l'article avec les données récupérées
    //     })
    //     .catch(error => {
    //       console.error("Une erreur s'est produite :", error.message);
    //     });
    // });






    // console.log(`${articles} "articles"`)
    // console.log(`${dict_panier[0]} "dict_panier"`)
    // const list_montant= calculerListMontant(articles, dict_panier);

    // // console.log(`${list_montant} "list_montant"`);

    // setCompteurMontant(list_montant);
  

  // cas panier nulle deja pris en charge grace au check dynamique "{panier && ... }"" tant qu'il est vide n'affiche pas ce qu'il y a après le &&"
  // 1er cas // panier = ["quelconque_1"]
  // 2eme cas //panier = ["quelconque_1","quelconque_1","quelconque_1"]
  // 3eme cas //panier = ["quelconque_1","quelconque_1","quelconque_2","quelconque_1"]
  // 4eme cas //panier = ["quelconque_1","quelconque_1","quelconque_2","quelconque_1","quelconque_2"]

  // Tout les cas sont gérés ! Bravo jeune écuyer ! 
  //
  // Panier haut doit avoir //
  //                          json -> pageData.buttonData pageData.sectionData pageData.nbrIncrementationMax
  //                           API -> name, image, prix, description_livraison, categorie
  // Panier bas doit avoir //
  //                           fonction --> nombre d'article de chaque    NE PAS OUBLIER LE PRIX DE LIVRAISON 
  //                           API -> prix
  // console.log("Articles = ",articles)