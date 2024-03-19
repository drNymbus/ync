# YNC (Young new code)

Site infrastructure for the [YNG (Young New Gamers) project](./).

## ync-database

Casssandra cluster configuration

- compose.yaml: launch cluster and init keyspace
- database-init: docker image to init keyspace

__store.basket:__

| cookie_id         | item_count                   | items            | last_update                                            |
|-------------------|------------------------------|------------------|--------------------------------------------------------|
| Client identifier | How many items in the basket | Items id in list | Timestamp of last operation applied on this basket row |

## ync-node-app

Node API interfacing CassandraDB

__Routes__:

- basket: Each operation updates the timestamp
    - create: new cookie_id with an empty basket
    - insert: lookup for cookie_id add an item one or multiple times in basket
    - remove: 

## ync-react-app

Website frontend