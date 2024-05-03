# YNS Kubernetes Deployment

All yaml files to start and shutdown the Young New Service.
You can find all commands needed to startup the entire YNC service in the bash files './start.sh' and './service.sh'; for the entire component chain to run you'll need kubernetes cluster running. To delete all ync-app resources, execute 'shutdown.sh' file.
To set the default namespace: `kubectl config set-context --current --namespace=<my-namespace || default>`

## ync-database

A configMap volume is created to allow keyspaces to be created when a pod is started. Once the configMap is up, the cassandra StatefulSet can be launched alongside the LoadBalancer service.

## ync-shop-api

A simple deployment configuration. The image is locally pulled but that could change if we decide to put all our images on dockerhub or a similar provider. The CASSANDRA_CONTACT_POINT is defined accordingly to the ync-database yaml configuration file (Service.LoadBalancer.spec.clusterIP).

## service.sh

## build.sh

The 'build.sh' file can be used to build docker images to be used on the kubernetes cluster, the last lines are here to register those images to a k3s cluster. On a local setting you should comment out those lines.


# TODO

- Configure Node API Service
- Init keyspace automatically after cassandra pod starts
- How to expose minikube services to the world wide web 
