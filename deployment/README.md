# YNS Deployment

All yaml files to start and shutdown the Young New Service.
You can find all commands needed to startup the entire YNC service in the bash files './start.sh' and './shutdown.sh';

All components are under the same namespace: ync-app. If you want to deploy locally the all service you'll need docker and minikube installed.

    systemctl start dockerd # Ensure that docker daemon is running
    minikube start

To be able to deploy local docker images, you'll need to configure your minikube cluster to use the docker-env, for UNIX users this would be:

    eval $(minikube -p minikube docker-env)

And for DOS users, you'll need to use Powershell:

    minikube -p minikube docker-env --shell powershell | Invoke-Expression

(In case this command fails, try removing 'minikube -p')

For all services to be able to work properly on a local setting, you'll need to run on a separate terminal (https://minikube.sigs.k8s.io/docs/handbook/accessing/#using-minikube-tunnel):

    minikube tunnel

Once your minikube is set up, you'll be able to run the bash file 'start.sh'. To delete all ync-app resources without effort, execute 'shutdown.sh' file.

## ync-database

A configMap volume is created to allow keyspaces to be created when a pod is started. Once the configMap is up, the cassandra StatefulSet can be launched alongside the LoadBalancer service.

## ync-shop-api

A simple deployment configuration. The image is locally pulled but that could change if we decide to put all our images on dockerhub or a similar provider. The CASSANDRA_CONTACT_POINT is defined accordingly to the ync-database yaml configuration file (Service.LoadBalancer.spec.clusterIP).

# TODO

- Configure Node API Service
- Init keyspace automatically after cassandra pod starts
- How to expose minikube services to the world wide web 
