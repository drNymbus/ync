# ync-database

As specified before, the ync-database uses Cassandra to store __EVERYTHING__. You can find all different keyspaces in the database-init directory. Each keyspace is associated to folder, containing at least a 'keyspace.cql' file defining all tables and a 'roles.cql' defining all user roles. You can also find the script used to initialize keyspaces and user-roles in 'database-init/init.sh'. Additionally, the 'superuser.cql' file defines a role able to operate on the entire database.

## User Roles

For each keyspace in the database, different roles and users are needed to operate on it. Users can operate solely on a defined keyspace and should not be able to access multiple keyspaces. If you encounter a situation where a role needs to access several keyspaces simultaneously try extending the keyspace tables or create a new keyspace custom tailored to that role. Ideally each keyspace should have two type of roles:

- Manager: acts as a superuser dedicated to the keyspace. This role is able to perform any action on all tables in the keyspace. (It is not recommended to have multiple manager roles in the same keyspace)
- Worker: has a limited range of action on the keyspace. Each worker would restricted depending on the utility of the API linked to it.

## Deployment

You can execute the start and shutdown bash scripts ('./start.sh' & './shutdown.sh') for a quick and efficient deployment on docker of the ync-database.
Every steps are commented.

If you wish to deploy this component on kubernetes, you'll eventually find some resources in the 'deployment' folder of this repository.

## Keyspace: __Store__

__Table: Session__

- cookie_id UUID [PRIMARY KEY]: cookie string to be encoded, hence the session identifier
- unperishable boolean: wether the session should be persistent or not
- last_update timestamp: timestamp of the last action performed with this session

__Table: Basket__

- cookie_id UUID [PRIMARY KEY]: the session identifier
- items set<varchar>: items currently in the basket, we currently don't support multiple baskets for a single session

__Table: Command__

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

__Table: Item__

- item_id varchar [PRIMARY KEY]: shop's item identifier
- image blob: image associated to the item
- display_name varchar: name of the item to be displayed in the shop
- description varchar: the description of the item -- to be displayed or not
- price decimal: item's price to be displayed

## TODO

- Do we need a custom docker image for ync-database or should it be initialized by hand?
- How should a cassandra container (a.k.a node) should be initialized?
    - Should the container contain files to initialize keyspaces and user-roles?
    - Will the container duplicate data base on master node?
