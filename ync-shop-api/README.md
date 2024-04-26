# YNC Node API

This application uses Express and CassandraDB to manage a simple shopping cart system.

## Exposed Routes and Methods

### store

- **GET `/store?connect=true`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.

        {
            "items": [string, ]
        }

- **GET `/store?item=true&id=<item_id>`**: Retrieves all attributes from item_id, all item ids should be separated by a comma. If no attribute exists, the list of all item ids available in the shop is sent.

        {
            "item_id": string,
            "image": img?,
            "display_name": string,
            "description": string,
            "price": decimal
        }

    In case no id is provided, you'll get the lost of item ids to be queried from this route

        [
            {
                "item_id": <item_id#1>,
            }, {
                "item_id": <item_id#2>,
            }, ...
        ]

- **GET `/store?command=true`**: Retrieves the user's shopping cart. If no cart exists, a new one is created.

        {
            "command_id": string,
            "item_count": integer,
            "items": [string, ],
            "address": string,
            "postal_code": string,
            "country": string,
            "name": string,
            "first_name": string,
            "mail": string,
            "phone": string,
            "processed": bool
        }

- **POST `/store?basket=true`**: Adds a new item to the user's cart then retrieve the basket.

        {
            "items": [string, ],
            "output": string
        }

- **POST `/store?item=true`**: Adds a new item to the items table then retrieve the data from table. All items inserted into the table can be retrieved from the "item_id" field. An output message in also sent to describe the result of the request accompanied by any Object where a warning or error occurred

        {
            "item_id": string | [string, ],
            "output": [string, [Object, ]]
        }

- **POST `/store?command=true`**: Adds a new command to the commands table then returns the status of the query (200 if successful, 500 otherwise). Only one command can be posted at a time.

- **DELETE `/store?basket=true&item=<item_id>`**: Removes one or several items from the user's cart, all item ids should be separated by a comma.

        {
            "items_list": [string, ]
        }

- **DELETE `/store?item=true&item=<item_id>`**: Removes an item from the items table then returns the status of the query ().

Each action requires the user to be authenticated via a signed cookie. The system generates and updates these cookies as needed to track session and cart information securely.

In case a request cannot be completed or fails the response will update the status accordingly to the error type and contain an error message under a json format:

    {
        "error": "Error description"
    }

## Deployment

You can generate an image of this API with the help of Docker:

    docker build -t ync-node-api .

Then run the container:

    docker run -p 3000:3000 --env CASSANDRA_CONTACT_POINTS=[<cassandra-cluster-ip1>,] --name=store_api ync-node-api

You're good to go :)

If you wish to deploy this component through kubernetes and wish to link it to the ync-database component, you'll find some help in the 'deployment' folder of the repository.