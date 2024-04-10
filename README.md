# YNC (Young new code)

Site infrastructure for the [YNG (Young New Gamers) project](./).

## ync-database

This component aims to store anything needed to keep track of a basket of a user.

The __keyspace__ 'store' will track what a user has put in his basket and what command.s he made

- store.Session: a table to identify each existing session in a store.
- store.Basket: all information about the user's basket.
- store.Command: all informations the user has sent us to deliver the package.
- store.Item: every item that has been and is currently available in the store.

Docker is needed to run in local, a kubernetes deployment is also available to run the full service.

The 'ync-database' component is destined to grow if need be, other keyspaces and tables may be created.

## ync-node-app

This API is intended to operate on the 'store' keyspace of the 'ync-database' component. Multiple operations can be performed such as:

- **GET `/store?connect=true`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.
- **GET `/store?item=true&id=<item_id>`**: Retrieves all attributes from item_id. If no attribute exists, the list of all item ids available in the shop is sent.
- **POST `/store?basket=true`**: Adds a new item to the user's cart then retrieve the basket.
- **POST `/store?item=true`**: Adds a new item to the items table then retrieve the data from table. All items inserted into the table can be retrieved from the "item_id" field. An output message in also sent to describe the result of the request accompanied by any Object where a warning or error occurred
- **DELETE `/store`**: Removes an item from the user's cart.

To learn about how to deploy this component, go to the 'deployment' or ync-node-app sections.

## ync-react-app

// TO FILL

# Deployment

