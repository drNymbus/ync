# ync-database

This part is to explore all different types of databases; The initialization flow is thought to deploy a database and expanding incrementally through jobs and predefined routines. One directory contains database intializer scripting: `ync-job`. All other are database configurator, for every `ync-<database-distro>` directory.

For a more detailed description of deployment, see the readme file at `ync/deployment/README.md`.

## ync-cassandra

The `Dockerfile` uses the `cassandra.yaml` as instructor for database initialization and `credentials.conf` is used to be able to connect to cqlsh without typing login information.

The remaining `.cql` files are executed after the database cluster is up and running.

## ync-mongodb

Only a docker file needed to set up and initial admin login.

## ync-job

For each distro available there is a directory associated to it. Each directory is able to initialize a specific database engine; a `Dockerfile` can be found in each of them to execute commands needed to run a routine that can be modified at running time. Each collection,keyspace,database ... (or whatever domination used), should be parted in differents directories and should specify the execution's order of scripts thanks to an indexing mechanism.
