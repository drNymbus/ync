# ync-database

## Deployment

You can execute the start and shutdown bash scripts ('./start.sh' & './shutdown.sh') for a quick and efficient deployment on docker of the ync-database.
Every step is commented.

## Keyspace: __Store__

__Table: Session__

    cookie_id UUID PRIMARY KEY,
    unperishable boolean,
    last_update timestamp

__Table: Basket__

    cookie_id UUID PRIMARY KEY,
    items set<varchar>

__Table: Command__

    cookie_id UUID,
    command_id varchar,
    item_count bigint,
    items list<varchar>,
    address varchar,
    postal_code varchar,
    country varchar,
    name varchar,
    first_name varchar,
    mail varchar,
    phone varchar,
    available boolean,
    PRIMARY KEY (cookie_id, command_id)

__Table: Item__

    item_id varchar PRIMARY KEY,
    image blob,
    display_name varchar,
    description varchar,
    price decimal
