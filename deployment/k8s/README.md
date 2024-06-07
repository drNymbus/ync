# YNS Kubernetes Deployment

All yaml files to start and shutdown the Young New Service.

To set the default namespace: `kubectl config set-context --current --namespace=<my-namespace || default>`

## ync-database

- `database.yaml`: Describes the StatefulSet and Service for the Cassandra node.
- `storage.yaml`: Describe the Persistent Volume to set and the Persistent Volume Claim to be used by the StatefulSet.
- `inspector.yaml`: The only purpose of the resource is to monitor the Persistent Volume directly; this also is used to entirely delete the Persistent Volume if needed (see the "delete" section in the "service.sh" bash script).

The job folder contains every different jobs ran against the StatefulSet, those scripts are able to run only if the Cassandra node is fully initialized.

## ync-api & ync-app

Each yaml file should contain a Deployment resource to run the API/App with the service associated so that other resources can reach the API/App.

# Credentials

For the APIs and Applications to be able to connect to the Cassandra cluster we use a Username-Password authentication. Those credentials are stored thanks to kubernetes Secrets resources, then fetched from environment variables in APIs and Applications.

# Bash scripting

- `service.sh`: Every comand needed to start, stop, update, scale and delete the entire service.

- `build.sh`: Creates all docker images needed to run the entire service. (An option can be given to register images in a k3s cluster)

We will switch to Dagger and (Apache airflow)[https://github.com/apache/airflow-client-go] in Go to handle the CI/CD loop and kubernetes resources