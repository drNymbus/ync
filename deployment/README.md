# YNS Deployment

All yaml files to start and shutdown the Young New Service.
You can find all commands needed in the bash files './start.sh' and './stop.sh';

Everything is under the namespace 'ync-app'. A ConfigMap component is needed to initialize cassandra's users and keyspaces.
Once the service is up and running the node service can be started.

// TODO:
    - How do I connect cassandra and node communicate without exposing cassandra ?
    - How do I create a service from a custom image ?
    - How do I expose node services ?

// FUTURE:
    - Once all questions have been answered deploy a react service from a custom image

# Set namespace
kubectl create namespace ync-app
kubectl config set-context --current --namespace=ync-app

# Create a volume to contain all the initialization files for the cassandra cluster
kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/

kubectl apply -f ./ync-database.yml # Launch the cassandra cluster
kubectl apply -f ./ync-node-app.yml # Launch the node API
