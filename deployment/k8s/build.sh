#!/usr/bin/bash

cd ../..

# Build API images
cd ync-api
for api in `ls -d */`; do
    echo "Building ${api::-1}..."

    cd ${api}
    docker build -t ${api::-1} .
    docker save ${api::-1}:latest | sudo k3s ctr images import -
    cd ..

    echo "Successfully built: ${api::-1}."
done
cd ..

# Build Application images
cd ync-app
for app in `ls -d */`; do
    echo "Building ${app::-1}..."

    cd ${app}
    docker build -t ${app::-1} .
    cd ..

    echo "Successfully built: ${app::-1}."
done
cd ..

# Register custom images to k3s
# docker save ync-react-app:latest | sudo k3s ctr images import -