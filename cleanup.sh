#!/bin/bash

sed -i 's/\r$//' deployment/minikube/build.sh
sed -i 's/\r$//' deployment/minikube/service.sh
sed -i 's/\r$//' deployment/k8s/build.sh
sed -i 's/\r$//' deployment/k8s/service.sh
sed -i 's/\r$//' deployment/k8s/start.sh
sed -i 's/\r$//' deployment/k8s/shutdown.sh

sed -i 's/\r$//' ync-database/deploy_keyspace.sh
sed -i 's/\r$//' ync-database/start.sh
sed -i 's/\r$//' ync-database/shutdown.sh