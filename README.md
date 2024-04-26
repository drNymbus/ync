# YNC (Young new code)

Site infrastructure for the [YNC (Young New Corporation) project](http://88.174.59.203:15779/).

This projcet aims to provide a wide range of services for different applications. The stack is composed of three layers:

- Database: a Cassandra database deployed as a StatefulSet. This will store any useful information in different keyspaces with a basic user-roles management for each distinct keyspace. The database should be hidden as much as possible.

- APIs: a set of interfaces with the sole purpose to manage the database keyspaces. This layer's role is to ensure data consistency across different tables, Cassandra being NoSQL no foreign keys are specified, and allows the next layer to be able to gather and post data to the database.

- Applications: the frontend and final layer of the infrastructure. All applications should not operate on the database directly, the APIs are handling all data consistency.

# Database: ync-database

This component aims to store anything needed to keep track of a basket of a user.

The __keyspace__ 'store' will track what a user has put in his basket and what command.s he made

- `store.Session`: a table to identify each existing session in a store.
- `store.Basket`: all information about the user's basket.
- `store.Command`: all informations the user has sent us to deliver the package.
- `store.Item`: every item that has been and is currently available in the store.

Docker is needed to run in local, a kubernetes deployment is also available to run the full service.

The 'ync-database' component is destined to grow if need be, other keyspaces and tables may be created.

# APIs

## ync-shop-api

This API is intended to operate on the 'store' keyspace of the 'ync-database' component. Multiple operations can be performed:

- **GET `/store?connect=true`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.
- **GET `/store?item=true&id=<item_id#1>[, <item_id#2>, ...]`**: Retrieves all attributes from item_id, all item ids should be separated by a comma. If no attribute exists, the list of all item ids available in the shop is sent.
- **GET `/store?command=true`**: Retrieves the user's previous commands. If no commands are found an empty json object is returned.
- **POST `/store?basket=true&id=<item_id#1>[, <item_id#2>, ...]`**: Adds a new item to the user's cart then retrieve the updated basket.
- **POST `/store?item=true`**: Adds one or several new items to the item table. The response object contains two fields containing item ids: 'completed' for every succesful item insertionl and 'rejected' for every failed item insertion.
- **POST `/store?command=true`**: Adds a new command to the commands table then returns the status of the query: 200 if successful, 500 otherwise. Only one command can be posted at a time.
- **DELETE `/store?basket=true&id=<item_id#1>[, <item_id#2>, ...]`**: Removes one or several items from the user's cart, all item ids should be separated by a comma.
- **DELETE `/store?item=true&id=<item_id>`**: Removes an item from the items table then returns the status of the query: 200 if successful, 500 otherwise.
- **DELETE `/store?command=true&id=<item_id>`**: Removes an item from the items table then returns the status of the query: 200 if successful, 500 otherwise.

To learn about how to deploy this component, go to the 'deployment' or 'ync-node-app' section.

# Applications

## ync-shop-app

// TO FILL

# Deployment

To run this locally, you'll first need to have a minikube working (some help can be found in the 'deployment' folder of this repository). You can deploy all components thanks to the 'deployment/start.sh' bash file in a single command line ! If you wish to get deeper explanations on how each component is deployed, go to the 'deployment' folder of this repository.