# Store's tables

Here is all the tables contained in the `store` keyspace.

__Session__

- cookie_id UUID [PRIMARY KEY]: cookie string to be encoded, hence the session identifier
- unperishable boolean: wether the session should be persistent or not
- last_update timestamp: timestamp of the last action performed with this session

__Basket__

- cookie_id UUID [PRIMARY KEY]: the session identifier
- items set<varchar>: items currently in the basket, we currently don't support multiple baskets for a single session

__Command__

- cookie_id UUID: the session identifier
- command_id varchar: command identifier (in case of multiple buys from a single person, should be retained until the command is arrived and well closed)
- item_count bigint: how many items in this command
- items list<varchar>: all items bought to be sent
- address varchar: user address for the package to be sent
- postal_code varchar: user postal code for the package to be sent
- country varchar: user country for the package to be sent
- name varchar: last name of the user for the package name
- first_name varchar: first name of the user for the package
- mail varchar: user's email to be contacted
- phone varchar: user's phone to be contacted

*PRIMARY KEY (cookie_id: command_id)*

__Item__

- item_id varchar [PRIMARY KEY]: shop's item identifier
- image blob: image associated to the item
- display_name varchar: name of the item to be displayed in the shop
- description varchar: the description of the item -- to be displayed or not
- price decimal: item's price to be displayed
