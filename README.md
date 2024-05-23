# YNC (Young new code)

Site infrastructure for the [YNC (Young New Corporation) project](http://88.174.59.203:15779/).

The Young New Code project is a project to learn, to improve, to get started, to go further, to connect and obviously to have fun! This project is only a part of the Young New Corporation project. If you wish to learn more about Young New Corporation, you'll find every information needed in the "Contribute" section of the [YNC website](http://88.174.59.203:15779/). Young New Code being built after an application ready project from Young New Corporation then the thought process was done in a top-down manner. The backbone of this project being to learn as much as possible, we've decided to improve our Kubernetes and Docker knowledge through Young New Code. With this approach in mind, our Young New Code is composed of three main services:

- Applications (ync-app): the final layer of the infrastructure. Semi-standalone programs handling data through API calls. An application could operate on the database directly, this is simply not recommended since the API service can help unload development complexities in the application.

- APIs (ync-api): a set of interfaces with the sole purpose to manage the database keyspaces. This layer's role is to ensure data consistency across different tables, Cassandra being NoSQL no foreign keys are specified, and allows the next layer to be able to gather and post data to the database.

- Database (ync-database): the YNC core, all useful data and information is stored in it. With an approach on learning, we thought of a NoSQL database that would also fit our criteria to be kubernetes compatible. In this aspect, we chose to go for [Cassandra](https://cassandra.apache.org/_/index.html).

The ync-api & ync-app services are made of multiples components, each of which may be widely (or "wildly", as you prefer) different.

# Database: ync-database

This database service is intended to be used in a containerized environment. As expained in the introduction, the choice made is not completely thought out and a different database support may better suit our needs. For the moment every piece of documentation about 'ync-database' is about Cassandra in a Docker or Kubernetes setting. If you wish to search more thoroughly about this topic feel free to do so. (Do not hesistate to gain access to the Notion, as you'll get a space where you could better document your search or even pick up some ideas already present in it!)

## Keyspaces & User roles

In Cassandra, tables can be regrouped into a single `KEYSPACE`. Thanks to NoSQL, a `FOREIGN KEY` free database, references can be made between multiple keyspaces. While this seems practical in a lot of scenarios, we would not appreciate doing so in our case. Since multiples APIs will operate on different keyspaces, it would be better to be able to mount and unmount keyspaces only when needed, we wish to be as flexible as possible without duplicating too much tables between keyspaces. In any case, you're options would be: expand a keyspace or create a new one. If you wish to expand an already existing keyspace, you'll need to make sure that associated API's & application's integrity will stay intact.

Our keyspaces are organized such as every application component can access all data needed from a single keyspace. This keyspace oriented strategy drove us to the conclusion that two discting roles would be need to handle a single keyspace: manager and worker. A manager role would have every permissions on a keyspace and would is used when modifying tables in the keyspace. Then, multiple worker users only able to read, maybe even write, on a subset of keyspace's tables.

### storage

This component aims to store any type of file uplaoded, a user could create an account then have access to is own file system. A secondary goal to this file system would be to be able to offer a link transfer service, enabling a public image folder for our other services. The file system could also become core to everything in the database. Those changes will be adressed once the file system comes to maturity.

Let's describe our 'file_system' __keyspace__:

- `storage.File`: contains metadata and content of a file, a unique identifier is attributed for each file to be referenced.
- `storage.Folder`: contains a list to redirect to other folders alongside a list pointing to files. In the same manner as files, a unique identifier is attributed for each folder to be referenced.
- `storage.User`: a table to identify each existing user file_system, this is also the entrypoint to the user file system.
- `storage.Public`: This is yet to decide how it's organized, at the moment the Public table would keep file/folder identifiers to be directly available. It would also keep track of any maxAge policy on public files (-- some may be unperishable).

### store

This component aims to store anything needed to keep track of a user's basket and commands passed by users. 

The 'store' __keyspace__ will track what a user has put in his basket and what command.s he made

- `store.Session`: a table to identify each existing session in a store.
- `store.Basket`: all information about the user's basket.
- `store.Command`: all informations the user has sent us to deliver the package.
- `store.Item`: every item that has been and is currently available in the store.

# APIs

## ync-file-system

## ync-shop-api

This API is intended to operate on the 'store' keyspace of the 'ync-database' component. Multiple operations can be performed:

- **GET `/store?connect=true`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.
- **GET `/store?item=true&id=<item_id#1>[, <item_id#2>, ...]`**: Retrieves all attributes from item_id, all item ids should be separated by a comma. If no attribute exists, the list of all item ids available in the shop is sent.
- **GET `/store?command=true`**: Retrieves the user's previous commands. If no commands are found an empty json object is returned.
- **POST `/store?basket=true`**: Updates the user's cart then retrieve the updated basket.
- **POST `/store?item=true`**: Adds one or several new items to the item table. The response object contains two fields containing item ids: 'completed' for every succesful item insertionl and 'rejected' for every failed item insertion.
- **POST `/store?command=true`**: Adds a new command to the commands table then returns the status of the query: 200 if successful, 500 otherwise. Only one command can be posted at a time.
- **DELETE `/store?item=true&id=<item_id>`**: Removes an item from the table then returns the status of the query: 200 if successful, 500 otherwise.
- **DELETE `/store?command=true&id=<item_id>`**: Removes a command from the table then returns the status of the query: 200 if successful, 500 otherwise.

To learn about how to deploy this component, go to the 'deployment' or 'ync-node-app' section.

# Applications

- __ync-shop-app__: A react app for an online shop experience. This app stores all users's basket and commands, thanks to the *ync-shop-api*, in the store keyspace of the *ync-database*.