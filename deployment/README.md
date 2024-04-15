# YNS Deployment

All yaml files to start and shutdown the Young New Service.
You can find all commands needed in the bash files './start.sh' and './shutdown.sh';

// TODO:
    - Configure Volume Storage
    - Configure Cassandra Service
    - Configure Cassandra StatefulSet

    - Configure Node API Service
    - Configure Node API Deployment

    - How do I connect cassandra and node communicate without exposing cassandra ?

All components will be under the same namespace: ync-app. Now let's break down how every component is deployed.

# ync-database

Create a volume to contain all the initialization files for the cassandra cluster

    kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/

Once all volumes are created we need to launch the loadBalancer for the cassandra StatefulSet

    kubectl apply -f ./ync-service.yml # Launch the node API
    kubectl apply -f ./ync-database.yml

# ync-node-app