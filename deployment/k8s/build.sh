#!/usr/bin/bash

cd ../..

# Build API images
cd ync-api
for api in `ls -d */`; do
    echo "\n##############\nBuilding ${api}...\n##############\n"

    cd ${api}
    docker build -t ${api} .
    docker save ${api}:latest | sudo k3s ctr images import -
    cd ..

    echo "\n##############\nSuccessfully built: ${api}\n##############\n\n"
done
cd ..

# Build Application images
cd ync-app
for app in `ls -d */`; do
    echo ${app}
    cd ${app}
    docker build -t ${app} .
    cd ..
done
cd ..

# Register custom images to k3s
# docker save ync-react-app:latest | sudo k3s ctr images import -