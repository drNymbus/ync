# YNC Node API

This application uses Express and CassandraDB to manage a simple shopping cart system. Not only the user's cart can be managed from this API, but also items present in the shop and commands passed by users.

Each action requires the user to be authenticated via a signed HTTP cookie. The system generates and updates these cookies as needed (through the 'connect' route under the method GET) to track session and cart information securely. For a smoother user's experience across all browsers we should use HTTPS, by creating a certificate then validate it (see Let's encrypt for a free certficate validation). This also implies the API to regularly check if the certificate is still valid and generate/re-evaluating in case it is revoked.

## Exposed Routes and Methods

### /store

- **GET `/store/connect`**: In case a cookie is passed then the session is updated then user's shopping cart is retrieved. If no cookie were provided, a new session and basket is created then the new basket is sent.

        {
            "items": [string, ]
        }

- **GET `/store/basket`**: Retrieves the user's shopping cart.

        {
            "items": [string, ]
        }

- **GET `/store/item?id=<item_id#1>[, <item_id#2>, ...]`**: Retrieves all attributes from item_id, all item ids should be separated by a comma. If no attribute exists, the list of all item ids available in the shop is sent.

        {
            "item_id": string,
            "image": string,
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

- **GET `/store/order`**: Retrieves the user's previous commands. If no commands are found an empty json object is returned.

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

- **POST `/store/basket`**: Updates the user's cart then retrieve the updated basket. Request's body:

        {
            "items": {item_id: int, }
        }

    Response's body:

        {
            "items": {item_id: int, }
        }

- **POST `/store/item`**: Adds one or several new items to the item table. The response object contains two fields containing item ids: 'completed' for every succesful item insertionl and 'rejected' for every failed item insertion. Request's body:

        {
            "items": {item_id: int, }
        }

    Response's body:

        {
            "completed": [string, ],
            "rejected": [string, ]
        }

- **POST `/store/command`**: Adds a new command to the commands table then returns the status of the query: 200 if successful, 500 otherwise. Only one command can be posted at a time.

- **DELETE `/store/item?id=<item_id>`**: Removes an item from the table then returns the status of the query: 200 if successful, 500 otherwise.

- **DELETE `/store/order?id=<item_id>`**: Removes a command from the table then returns the status of the query: 200 if successful, 500 otherwise.

In case a request cannot be completed or fails the response will update the status accordingly to the error type and contain an error message under a json format:

    {
        "error": "Error description"
    }

## Deployment

Need to determine a way to have a "private" api (only accessible by other kube components) and a public api that could be accessed also by outer requests.

# Docker

You can generate an image of this API with the help of Docker:

    docker build -t ync-shop-api .

Then run the container:

    docker run -p 3000:3000 --env CASSANDRA_CONTACT_POINTS=[<cassandra-cluster-ip1>,] ync-shop-api

You're good to go :)

If you wish to deploy this component through kubernetes and wish to link it to the ync-database component, you'll find some help in the 'deployment' folder of the repository.

# Minikube