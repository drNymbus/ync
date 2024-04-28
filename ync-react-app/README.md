# YNC Application


### Introduction


Cette section fournit une présentation de l'application et de son objectif principal.


- **Description de l'application**: L'application est un e-shop destiné à la vente de produits estampillés YNC à des utilisateurs. Son objectif est de fournir une plateforme solide et évolutive pour faciliter l'achat et la vente de produits de manière efficace et moderne.
  
- **Objectif**: L'objectif principal de l'application est de fournir une expérience d'achat en ligne fluide et sécurisée pour les utilisateurs, tout en offrant une gestion efficace des produits et des commandes de la boutique en ligne.

  
### Structure du projet
    

    /public/ 
    |   index.html              # Point d'entrée de l'application web
    |___/assets/                # Dossier contenant l'ensemble des assets du sites

    /src/ 
    |   index.tsx               # Point d'entrée de l'application React
    |   App.tsx                 # Composant racine de l'application
    |___/pages/                 # Dossier contenant les différentes pages de l'application
    |       |   Accueil.jsx                 # Page d'accueil de l'application
    |       |   Panier.jsx                  # Page panier de l'application       
    |       |   Paiement.jsx                # Page de paiement de l'application
    |       |   Erreur.jsx                  # Page d'erreur de l'application
    |       |   Splashpage.jsx              # Splashpage du logo YNC
    |       |___/composantes/               # Dossier contenant les composants utilisés dans les pages
    |               |   Bandeau.jsx                 # Composant "Bandeau" qui compose l'ensemble des pages
    |               |   Section.jsx                 # Composant "Section" qui compose l'ensemble des pages
    |               |   Contenu.jsx                 # Composant "Contenu" qui compose la page accueil
    |               |   PanierBas.jsx               # Composant "PanierBas" qui compose la page panier
    |               |   PanierHaut.jsx              # Composant "PanierHaut" qui compose la page panier
    |               |___/sous_composantes/          # Dossier contenant les sous-composants utilisés dans les composants 
    |                       |   BoutonMenu.jsx                  # Sous-composant "BoutonMenu" qui est utilisé sur l'ensemble des composantes
    |                       |   IncrementationPanier.jsx        # Sous-composant "IncrementationPanier" qui est utilisé dans PanierHaut
    |    
    |
    |___/context/               # Dossier contenant les contextes de données de l'application  
    |       |   ArticleDataProvider.jsx     # Fournisseur de données principal (API)
    |       |   BrutDataProvider.jsx        # Fournisseur de données brut (json)
    |       |   brutdata.json               # Fichier de données brutes au format JSON
    |       |   props.json                  # Fichier de controle de données au format JSON        
    |   
    |
    |___/style/         # Dossier contenant les fichiers CSS
    |       |   styles.css          # Fichier de styles principal
    |       |   errorstyle.css      # Fichier de styles dédié à la page Erreur
    

### React


React est une bibliothèque JavaScript utilisée pour construire des interfaces utilisateur interactives.


#### Composant :


React s'appuie sur la création de composants, des blocs autonomes réutilisables qui englobent à la fois la logique et l'interface utilisateur d'une partie de l'application. À l'intérieur de ces composants, on peut définir des variables d'état (state) et des fonctions pour une utilisation locale. Chaque composant retourne ensuite un rendu (render), déterminant ce que l'interface utilisateur doit afficher à un moment donné. 

Par exemple, les pages elles-mêmes sont des composants, pouvant à leur tour contenir d'autres composants. Les plus petits éléments, souvent appelés sous-composants, servent à organiser et à moduler le code de manière efficace, favorisant ainsi la réutilisabilité du code.


#### Communication inter-composants : 


##### Props : 


En React, les données peuvent être transmises entre composants à différents niveaux en utilisant les props, permettant ainsi une communication efficace et modulaire. Les "props" (propriétés) en React sont des objets contenant des données que vous pouvez passer de parent à enfant lors du rendu des composants. Ils permettent de configurer et de personnaliser les composants, en leur transmettant des valeurs comme des chaînes de caractères, des fonctions ou même des objets. Les props sont immuables et en lecture seule dans le composant enfant.


##### Contexte : 


Le contexte en React offre un mécanisme permettant de partager des données entre les composants de manière efficace, sans avoir à les passer explicitement via les props à chaque niveau. Le contexte permet de créer un "provider" qui fournit les données et un ou plusieurs composants qui les utilisent. Ainsi, les composants qui ont besoin de ces données peuvent y accéder directement, simplifiant ainsi la gestion des données et la communication entre les différents éléments de l'application.
    

### Pages principales


Cette section fournit une description des pages principales de l'application, ainsi que des informations sur la navigation entre ces pages et des détails sur leur structure et leur logique.

![Description application](/readme_images/DescriptionApplication.png) 

Les pages de l'application sont généralement composées de plusieurs composants réutilisables qui sont assemblés pour former la structure de la page. La logique spécifique à chaque page peut être implémentée dans les composants correspondants, en utilisant des états locaux ou des contextes de données pour gérer l'état de l'application.


#### Page d'accueil (Accueil.jsx)


La page d'accueil présente une vue générale de l'application et offre des liens vers d'autres sections importantes.

- **Description**: La page d'accueil propose un menu de navigation permettant aux utilisateurs de se diriger vers différentes sections de l'application, y compris leur panier d'achat. En arrivant sur la page, les utilisateurs peuvent également voir un article mis en avant, ce qui leur permet de le sélectionner directement depuis la page d'accueil. Cette approche facilite la découverte des produits et incite les utilisateurs à explorer davantage.
- **Structure/Logique**: Le composant Accueil.jsx utilise des composants réutilisables tels que Bandeau.jsx, Section.jsx et Contenu.jsx pour afficher des éléments structurés de la page. La logique de chargement des données initiales peut être implémentée dans ce composant, en utilisant les contextes de données.


#### Page Panier (Panier.jsx)


La page Panier affiche les éléments ajoutés par l'utilisateur dans son panier d'achat.

- **Description**: La page Panier permet aux utilisateurs de visualiser et gérer les articles qu'ils ont ajoutés à leur panier d'achat. Chaque article est répertorié avec son nom, son prix, sa description et la quantité actuelle dans le panier. Les utilisateurs ont la possibilité d'ajuster la quantité d'un article, d'en acquérir davantage ou de supprimer complètement l'article de leur panier. En dessous de cette section de gestion du panier, un espace est dédié à l'affichage du prix total, qui prend en compte le prix de chaque article ainsi que le coût de la livraison. Lorsqu'ils sont prêts à finaliser leur commande, ils peuvent simplement cliquer sur le bouton "Passer à la suite" pour continuer le processus d'achat vers la page de paiement.
- **Structure/Logique**: Le composant Panier.jsx utilise des composants réutilisables tels que Bandeau.jsx, Section.jsx, PanierHaut.jsx et PanierBas.jsx pour afficher le contenu du panier. La logique de gestion du panier peut être implémentée dans ce composant, en utilisant des états locaux ou un contexte de données pour le stockage global du panier.


#### Page Paiement (Paiement.jsx)


En construction // Prochaine étape // NEXT UP // "It's us"


#### Autres pages (Erreur.jsx, Splashpage.jsx)


- **Description de la page d'erreur (Erreur.jsx)**: La page d'erreur est conçue pour gérer les erreurs qui surviennent lors de l'utilisation de l'application. Elle offre une interface permettant d'informer les utilisateurs lorsqu'une erreur se produit. Cela peut inclure des erreurs de chargement de données, des erreurs de connexion ou d'autres problèmes techniques. L'objectif principal de cette page est de fournir une expérience utilisateur transparente en aidant les utilisateurs à comprendre ce qui s'est passé et en leur proposant des solutions ou des actions à entreprendre.

- **Description de la page de Splashpage (Splashpage.jsx)**: La page de Splash est une page d'accueil alternative conçue pour afficher l'animation du logo de l'application YNC. Elle est généralement utilisée pour créer une première impression visuelle attrayante lorsque les utilisateurs accèdent à l'application. Elle redirige les utilisateurs vers la page d'accueil une fois l'animation terminée.


### Composants principaux


Cette section présente une liste des composants réutilisables ou principaux de l'application, ainsi qu'une explication de ce que chaque composant fait et comment il est utilisé.


- **Bandeau.jsx**: Le composant <Bandeau/> affiche l'en-tête de l'application, peut contenir plusieurs <BoutonMenu/>.

- **Section.jsx**: Le composant <Section/> est utilisé pour indiquer visuellement la page actuelle dans l'application. Il contient des éléments tels qu'un titre, une icône pour aider les utilisateurs à se repérer.

- **Contenu.jsx**: Le composant <Contenu/> affiche le contenu principal de la page d'accueil. Il inclut l'image de l'article mis en avant, sa description, ainsi que son prix et un <BoutonMenu/> pour ajouter l'article au panier.

- **PanierHaut.jsx**: En construction // Prochaine étape // NEXT UP // "It's us"

- **PanierBas.jsx**: En construction // Prochaine étape // NEXT UP // "It's us"


### Sous-composants


En plus de ces composants principaux, l'application peut également inclure des sous-composants qui sont utilisés à l'intérieur des composants principaux pour des fonctionnalités spécifiques.

- **BoutonMenu.jsx**: Le composant <BoutonMenu/> est utilisé pour créer des boutons d'action réutilisables dans toute l'application.

- **IncrementationPanier.jsx**: En construction // Prochaine étape // NEXT UP // "It's us"




# Getting Started with Create React App


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)