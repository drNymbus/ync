# YNC Node API

This application uses Express and CassandraDB to manage a simple shopping cart system.

## Exposed Routes and Methods

### store

- **CONNECT `/store`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.

        {
            'cookie_id':string,
            'item_count': int,
            'items list': string
        }

- **GET `/store?item=<item_id>`**: Retrieves all attributes from item_id. If no attribute exists, the list of all item ids available in the shop is sent.

        {
            'item_id': string,
            'image': img?,
            'display_name': string,
            'description': string,
            'price': decimal
        }

- **POST `/store`**: Adds a new item to the user's cart then retrieve the basket.

        {
            'cookie_id':string,
            'item_count': int,
            'items_list': string
        }

- **DELETE `/store`**: Removes an item from the user's cart.

        {
            'cookie_id':string,
            'item_count': int,
            'items =_list': string
        }

Each action requires the user to be authenticated via a signed cookie. The system generates and updates these cookies as needed to track session and cart information securely.

## Deployment

You can generate an image of this API with the help of Docker:

    docker build -t ync-node-api .

Then run the container:

    docker run -p 3000:3000 --env CASSANDRA_CONTACT_POINTS=[<cassandra-cluster-ip1>,] --name=store_api ync-node-api

You're good to go :)