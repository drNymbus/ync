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

If you want to deploy locally the all service you'll need docker and minikube installed.

    systemctl start dockerd
    minikube start

To be able to deploy local docker images, you'll need to configure your minikube cluster to use the docker-env:

Under UNIX environment:

    eval $(minikube -p minikube docker-env)

For DOS, you'll need to use Powershell:

    minikube -p minikube docker-env --shell powershell | Invoke-Expression # Powershell

For all services to be able to work properly on a local setting, you'll need to run on a separate terminal (https://minikube.sigs.k8s.io/docs/handbook/accessing/#using-minikube-tunnel):

    minikube tunnel

# ync-database

Create a volume to contain all the initialization files for the cassandra cluster

    kubectl create configmap cassandra-cql --from-file=../ync-database/database-init/

Once all volumes are created we need to launch the loadBalancer for the cassandra StatefulSet

    kubectl apply -f ./ync-service.yml # Launch the node API
    kubectl apply -f ./ync-database.yml

# ync-node-app