# **Installation et configuration MongoDB sur un serveur CentOS via Docker de A à Z**

## **1. Utilisation de MongoDB avec Docker**

### A. **Télécharger et exécuter l’image MongoDB**

Docker permet de télécharger et de lancer facilement MongoDB avec une simple commande. L'image officielle de MongoDB est disponible sur Docker Hub.

1. **Tirer l'image MongoDB** :
    - Exécute cette commande pour télécharger l'image MongoDB :
        
        ```bash
        docker pull mongo
        ```
        
    - Cela télécharge l'image officielle `mongo` avec la version la plus récente de MongoDB.
2. **Lancer un conteneur MongoDB** :
    - Utilise la commande suivante pour exécuter MongoDB dans un conteneur Docker :
        
        ```bash
        docker run -d --name mongodb -p 27017:27017 -v ~/mongo-data:/data/db mongo
        ```


    Explication des options :

    - `d` : Exécute le conteneur en mode détaché (en arrière-plan).
    - `-name mongodb` : Nomme le conteneur `mongodb`.
    - `p 27017:27017` : Mappe le port **27017** du conteneur MongoDB au port **27017** de l'hôte. Cela te permet d'accéder à MongoDB depuis ton serveur CentOS ou d'autres machines.
    - `v ~/mongo-data:/data/db` : Monte un volume pour que les données soient persistantes sur le disque de ton serveur, dans le dossier `~/mongo-data`.

### B. **Vérifier si MongoDB fonctionne**

1. **Vérifier l'état du conteneur** :
    - Exécute la commande suivante pour vérifier que le conteneur MongoDB fonctionne bien :
        
        ```bash
        docker ps
        ```
        
    
    Tu devrais voir une ligne listant le conteneur MongoDB avec son `CONTAINER ID` et `STATUS` (qui devrait être "Up").
    
2. **Se connecter au conteneur MongoDB** :
Pour te connecter à MongoDB depuis ton serveur CentOS, utilise le client MongoDB depuis le conteneur :
    - Lance un shell interactif dans le conteneur MongoDB :
        
        ```bash
        docker exec -it mongodb mongo
        ```
        
    
    Tu verras l’invite `>` du shell MongoDB.
    

### C. **Options supplémentaires**

Tu peux aussi personnaliser les options lors de l'exécution du conteneur MongoDB avec Docker.

1. **Configurer les utilisateurs et mots de passe** :
MongoDB te permet d'activer l'authentification et de créer des utilisateurs avec des rôles spécifiques.
    - Pour activer l'authentification et définir un utilisateur administrateur, tu peux utiliser les variables d'environnement `MONGO_INITDB_ROOT_USERNAME` et `MONGO_INITDB_ROOT_PASSWORD` lors du lancement du conteneur :
        
        ```bash
        docker run -d --name mongodb-secure \
           -p 27017:27017 \
           -e MONGO_INITDB_ROOT_USERNAME=admin \
           -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
           -v ~/mongo-data:/data/db \
           mongo
        ```
        
    - Cela va démarrer MongoDB avec un utilisateur `admin` et le mot de passe `admin123`. Tu devras maintenant utiliser ces informations pour te connecter.
    - Pour te connecter au shell MongoDB avec authentification :
        
        ```bash
        docker exec -it mongodb-secure mongo -u admin -p admin123 --authenticationDatabase admin
        ```
        
2. **Personnalisation des volumes et logs** :
Tu peux aussi mapper des volumes spécifiques pour les fichiers de configuration ou les journaux :
    
    ```bash
    docker run -d --name mongodb-custom \
       -p 27017:27017 \
       -v ~/mongo-data:/data/db \
       -v ~/mongo-config:/data/configdb \
       -v ~/mongo-logs:/var/log/mongodb \
       mongo
    ```
    
    Cela permet de stocker les journaux de MongoDB sur ton serveur et de personnaliser davantage le comportement de MongoDB.
    

## **2. Créer une base de données MongoDB**

### A. **Accéder au shell MongoDB**

Pour créer une base de données ou gérer des collections, connecte-toi au shell MongoDB depuis le conteneur.

- Utilise cette commande pour accéder au shell :
    
    ```bash
    docker exec -it mongodb mongo
    ```
    

### B. **Créer une base de données**

1. **Basculer vers une nouvelle base de données** :
    - Dans MongoDB, une base de données est automatiquement créée lorsque tu commences à y insérer des données. Par exemple :
        
        ```bash
        use mydatabase
        ```
        
2. **Créer une collection et insérer un document** :
    - Une fois dans ta base de données, tu peux insérer des documents dans une collection (qui sera également créée automatiquement) :
        
        ```bash
        db.users.insertOne({ name: "Alice", age: 25 })
        ```
        
    - Pour vérifier que le document a été inséré :
        
        ```bash
        db.users.find()
        ```
        

## **3. Arrêter et gérer les conteneurs MongoDB**

### A. **Arrêter le conteneur**

Pour arrêter un conteneur MongoDB en cours d'exécution :

```bash
docker stop mongodb
```

### B. **Redémarrer le conteneur**

Pour redémarrer MongoDB après l'avoir arrêté :

```bash
docker start mongodb
```

### C. **Supprimer un conteneur**

Si tu veux supprimer un conteneur MongoDB (les données seront perdues si tu n'utilises pas de volume) :

```bash
docker rm -f mongodb
```

## 4. Collection

En MongoDB, une **collection** est un regroupement de documents. C'est l'équivalent d'une table dans une base de données relationnelle, mais contrairement à une table, les documents dans une collection MongoDB n'ont pas besoin d'avoir exactement les mêmes champs ou types de données.

Un **document** en MongoDB est l'unité de base des données. C'est un objet de type **JSON** ou **BSON** (Binary JSON), et il ressemble beaucoup à une ligne dans une base de données relationnelle.

### 1. **Création IMPLICITE de collection**

Si vous insérez un document dans une collection qui n'existe pas encore, MongoDB va automatiquement la créer.

```jsx
db.collection1.insertOne({ nom: "Nymbus", age: 26 });
```

### 2. **Création EXPLICITE avec validation de schéma**

Vous pouvez créer une collection en utilisant la commande `createCollection` et y définir un schéma pour valider les documents qui y seront insérés.

```jsx
db.createCollection("collection1", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nom", "age"],
      properties: {
        nom: {
          bsonType: "string",
          description: "Le champ 'nom' doit être une chaîne"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          description: "Le champ 'age' doit être un entier positif"
        }
      }
    }
  }
});
```

- **`validator`** : Ajoute une validation de schéma, garantissant que chaque document dans la collection respecte certaines règles.
    - **`bsonType`** : Indique le type BSON.
    - **`required`** : Les champs `nom` et `age` sont requis pour chaque document inséré dans cette collection.

### Autres commandes MongoDB

### Insertion de documents

```jsx
db.collection1.insertMany([
  { nom: "Nymbus", age: 26 },
  { nom: "Spade", age: 26 }
]);
```

### Lecture des documents

```jsx
db.collection1.find();
```

### Mise à jour des documents

```jsx
db.collection1.updateOne({ nom: "Nymbus" }, { $set: { age: 26 } });
```

### Suppression de documents

```jsx
db.collection1.deleteOne({ nom: "Spade" });
```

### Création d'index

![index.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/17c9f6cd-50b0-49e0-9471-730c4a1ddcc7/70ab7c79-50c0-4aee-999e-79efdec37dfe/index.jpg)

```jsx
db.collection1.createIndex({ nom: 1 });
```

crée un index sur le champ `nom` de `collection1` dans l'ordre croissant (`1`).

### **Changer de base de données**

```jsx
use <nom_de_la_base>;
```

### **Vérifier la base de données actuelle**

```jsx
db;
```

### **Lister les bases de données**

```jsx
show dbs;
```

### **Supprimer** une base de données

```jsx
db.dropDatabase();
```

### L**ister toutes les collections**

```jsx
javascript
Copier le code
show collections;

```

- Affiche toutes les collections dans la base de données actuellement sélectionnée.

```jsx
db.createCollection("nom_de_la_collection");
```

### **Supprimer une collection**

```jsx
db.nom_de_la_collection.drop();
```

## 5. Les opérateurs MongoDB

### **Opérateurs de comparaison**

- **`$eq`** : Égal à
    - Exemple : `{ "age": { "$eq": 25 } }` trouve tous les documents où `age` est égal à 25.
- **`$ne`** : Différent de
- **`$gt`** : Supérieur à
- **`$gte`** : Supérieur ou égal à
- **`$lt`** : Inférieur à
- **`$lte`** : Inférieur ou égal à
- **`$in`** : Dans un ensemble de valeurs
    - Exemple : `{ "age": { "$in": [25, 30, 35] } }` trouve tous les documents où `age` est 25, 30 ou 35.
- **`$nin`** : Pas dans un ensemble de valeurs

### 2. **Opérateurs logiques**

- **`$and`** : Combine plusieurs conditions (toutes doivent être vraies).
    - Exemple : `{ "$and": [ { "age": { "$gt": 25 } }, { "prenom": "Jean" } ] }` trouve tous les documents où `age` est supérieur à 25 et `prenom` est "Jean".
- **`$or`** : Combine plusieurs conditions (au moins une doit être vraie).
- **`$not`** : Inverse une condition.
    - Exemple : `{ "age": { "$not": { "$gte": 25 } } }` trouve tous les documents où `age` n'est pas supérieur ou égal à 25.
- **`$nor`** : Combine plusieurs conditions (aucune ne doit être vraie).
    - Exemple : `{ "$nor": [ { "age": { "$lt": 25 } }, { "prenom": "Jean" } ] }` trouve tous les documents où `age` n'est pas inférieur à 25 et `prenom` n'est pas "Jean".

### 3. **Opérateurs de mise à jour**

- **`$set`** : Modifie ou ajoute une valeur dans un document.
    - Exemple : `{ "$set": { "age": 30 } }` met à jour le champ `age` pour qu'il ait la valeur 30.
- **`$unset`** : Supprime un champ d'un document.
    - Exemple : `{ "$unset": { "age": "" } }` supprime le champ `age` du document.
- **`$inc`** : Incrémente une valeur numérique.
- **`$push`** : Ajoute une valeur à un tableau.
- **`$pull`** : Supprime une valeur spécifique d'un tableau.
- **`$addToSet`** : Ajoute une valeur à un tableau, seulement si elle n'existe pas déjà.
    - Exemple : `{ "$addToSet": { "hobbies": "lecture" } }` ajoute "lecture" uniquement si elle n'est pas déjà présente dans `hobbies`.
- **`$rename`** : Renomme un champ dans un document.
    - Exemple : `{ "$rename": { "prenom": "first_name" } }` renomme le champ `prenom` en `first_name`.

### 4. **Opérateurs de tableau**

- **`$elemMatch`** : Correspond aux documents où au moins un élément d'un tableau satisfait toutes les conditions spécifiées.
    - Exemple : `{ "notes": { "$elemMatch": { "$gte": 85, "$lt": 90 } } }` trouve tous les documents où le tableau `notes` contient un élément entre 85 et 90.
- **`$size`** : Trouve les documents avec des tableaux d'une taille spécifique.
    - Exemple : `{ "hobbies": { "$size": 3 } }` trouve tous les documents où `hobbies` est un tableau de trois éléments.
- **`$all`** : Trouve les documents où un tableau contient tous les éléments spécifiés.
    - Exemple : `{ "hobbies": { "$all": ["lecture", "musique"] } }` trouve tous les documents où `hobbies` contient à la fois "lecture" et "musique".

### 5. **Opérateurs de projection**

- **`$`** : Sélectionne un élément dans un tableau en fonction d'une condition de recherche.
    - Exemple : `{ "notes.$": { "$gte": 85 } }` trouve et retourne uniquement les éléments de `notes` qui sont supérieurs ou égaux à 85.
- **`$slice`** : Limite le nombre d'éléments d'un tableau dans le résultat.
    - Exemple : `{ "hobbies": { "$slice": 2 } }` retourne uniquement les deux premiers éléments du tableau `hobbies`.

## 6. Différence entre l’utilisation de javascript et celle de python pour l’initialisation de MongoDb, et la manipulation de requetes

Les commandes de requêtes en **pymongo** sont très similaires à celles utilisées dans le shell MongoDB en JavaScript.

1. **Connexion au serveur** :
    - En `pymongo`, il est nécessaire de créer une instance de `MongoClient` pour établir la connexion à la base de données, tandis que dans le shell MongoDB, la connexion est implicite.
        
        ```jsx
        db = db.getSiblingDB('ync_database');
        ```
        
        ```python
        from pymongo import MongoClient
        client = MongoClient("mongodb://localhost:27017/")
        db = client["ync_database"]
        ```
        
2. **Types natifs** :
    - Python utilise des dictionnaires natifs (`{}`) pour représenter les objets JSON/BSON, tandis que Mongo Shell utilise les objets JavaScript = les arguments des fonctions sont des dictionnaires en Python, tandis qu'en JavaScript, ce sont des objets littéraux.
3. **Opérateurs MongoDB**  :
    - Les opérateurs MongoDB sont les mêmes dans les deux langages, mais en Python, ils doivent être entourés de guillemets : `"$gte"` au lieu de `$gte` en JavaScript.
4. **Méthodes** :
    - Les méthodes `find`, `update`, etc., sont similaires en nom et en fonctionnalité.

## **7. Etapes à suivre par la suite**

### Prérequis

- **Docker installé**

### Objectifs

Pour lancer une image MongoDB via Docker sur un système CentOS, avec un fichier de configuration et un script permettant de créer les premières tables et d’insérer les premières données.

- **`mongodb.conf`** : Fichier de configuration de MongoDB.
- **`init-mongo.js`** : Script d'initialisation des collections.
- **`docker-compose.yml`** : Fichier de configuration Docker Compose pour lancer MongoDB.

### Paramètres Obligatoires dans `mongodb.conf`

- **Obligatoires** :
    - `storage.dbPath`
    - `systemLog.destination` : la journalisation est essentielle pour le suivi et le débogage, donc ce paramètre doit être défini.
    - `net.port`
    - `net.bindIp`
- **Optionnels mais recommandés** :
    - `security.authorization`
    - `systemLog.path`

En vous assurant que ces paramètres sont correctement configurés, vous pouvez établir un environnement MongoDB fonctionnel et sécurisé.

### Etapes

### 1. Créer un dossier de projet

Créez un répertoire pour Docker MongoDB :

```bash
mkdir ~/mongodb-docker
cd ~/mongodb-docker
```

### 2. Créer un fichier de configuration MongoDB

Créez un fichier `mongodb.conf` pour configurer MongoDB :

```bash
nano mongodb.conf
```

```
# Section de stockage des données
storage:
  dbPath: /var/lib/mongodb/data  # Chemin où MongoDB stocke ses fichiers de données

# Section de journalisation (log)
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log  # Chemin vers le fichier de log
  logAppend: true  # Ajoute les nouvelles entrées au fichier de log au lieu de le remplacer

# Section de configuration réseau
# Accepte les connexions de n'importe quelle IP si = 0.0.0.0 
net:
  bindIp: 10.244.0.15  
  port: 27017  # Port par défaut de MongoDB

# Section de sécurité
security:
  authorization: enabled  # Active l'authentification pour les utilisateurs

# Section de profilage des opérations
# operationProfiling:
#   slowOpThresholdMs: 100  # Enregistre les opérations qui prennent plus de 1# 00 ms

# Section de réplication (pour les déploiements avancés)
# replication:
#  replSetName: "rs0"  # Nom de l'ensemble de réplicas pour la réplication

# Section de configuration des paramètres réseau avancés
# net:
#  maxIncomingConnections: 100  # Limite le nombre de connexions entrantes
```

### 3. Créer un script d'initialisation

Le fichier sera maintenant `init-mongo.py` au lieu de `init-mongo.js`. Il va initialiser la base de données en utilisant Python et la bibliothèque `pymongo`.

```bash
nano init-mongo.py
```

```python
from pymongo import MongoClient, errors

# Connexion à la base de données MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["ync_database"]

# Création de la collection 'utilisateurs' (MongoDB crée la collection automatiquement lors de la première insertion)
utilisateurs = db["utilisateurs"]

# Insertion de documents dans la collection 'utilisateurs'
docs = [
    { "nom": "Dupont", "prenom": "Jean", "age": 30, "email": "jean.dupont@example.com" },
    { "nom": "Martin", "prenom": "Marie", "age": 25, "email": "marie.martin@example.com" },
    { "nom": "Durand", "prenom": "Pierre", "age": 40, "email": "pierre.durand@example.com" }
]

try:
    utilisateurs.insert_many(docs)
    print("Documents insérés avec succès")
except errors.BulkWriteError as e:
    print("Erreur lors de l'insertion des documents :", e.details)

# Ajout d'un index unique sur la collection 'utilisateurs'
try:
    utilisateurs.create_index([("email", 1)], unique=True)
    print("Index créé avec succès")
except errors.OperationFailure as e:
    print("Erreur lors de la création de l'index :", e.details)

# Fermeture de la connexion
client.close()

```

### 4. Créer un fichier `docker-compose.yml`

Créez un fichier `docker-compose.yml` pour configurer et lancer MongoDB :

```bash
nano docker-compose.yml
```

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb_container
    ports:
      - "27017:27017"  # Mappage des ports (hôte:conteneur)
    volumes:
      - ./data:/var/lib/mongodb/data  # Lien des dossiers données
      - ./mongodb.conf:/etc/mongod.conf  # Fichier de configuration
      - ./init-mongo.py:/docker-entrypoint-initdb.d/init-mongo.py  # Script d'initialisation
    command: ["mongod", "--config", "/etc/mongod.conf"]  # Commande pour démarrer MongoDB avec le fichier de config
```

### 5. Lancer MongoDB

Se positionner dans le répertoire où se trouve votre fichier `docker-compose.yml`

```bash
docker-compose up -d
```

`-d` pour lancer les conteneurs en arrière-plan

```bash
docker ps
```

### 6. Accéder au shell MongoDB

```bash
docker exec -it mongodb_container mongo
```

```jsx
use ync_database;
show collections;
db.nom_de_la_collection.stats();
```

### **7. Commandes pour l'administration**

```jsx
db.serverStatus();
```

**Recharger les fichiers de configuration** :

```jsx
db.adminCommand({ "reloadConfiguration" : 1 });
```

MongoDB : Gestion de la sécurité

```yaml
# mongodb.conf (MongoDB)
security:
  authorization: enabled  # Active l'authentification et l'autorisation
```

Ce paramètre signifie que MongoDB utilisera un **contrôle d'accès basé sur les rôles (RBAC)**, et vous devrez créer des utilisateurs avec des rôles spécifiques pour accéder aux ressources.

### Dockerfile (pour MongoDB)

```
FROM mongo:latest

# fichier de configuration
COPY mongodb.conf /etc/mongod.conf

# Créer le répertoire des données
RUN mkdir -p /var/lib/mongodb/data

# Exposer le port 27017
EXPOSE 27017

# Démarrer MongoDB avec le fichier de configuration spécifique
CMD ["mongod", "--config", "/etc/mongod.conf"]
```

COPY credentials.conf /root/.cassandra/cqlshrc —> mongodb equivalent

BIG UP PLUS QU’A SUIVRE LES ETAPES ET CREER CES TROIS FICHIERS MES REUFS M’OCCUPE DE  CA UN PEU PLUS TARD ;) <3