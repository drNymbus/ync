#!/usr/bin/bash

cd ../..

# Build Database images
cd ync-database
for cmp in `ls -d */`; do
    echo "Building ${cmp::-1}..."

    # Build image and register it to k3s
    docker build -t ${cmp::-1} ${cmp}
    if [ "$1" == "k3s" ]; then
        docker save ${cmp::-1}:latest | sudo k3s ctr images import -;
    fi

    echo "Successfully built: ${cmp::-1}."
done
cd ..

# Build API images
cd ync-api
for api in `ls -d */`; do
    echo "Building ${api::-1}..."

    # Build image and register it to k3s
    docker build -t ${api::-1} ${api}
    if [ "$1" == "k3s" ]; then
        docker save ${api::-1}:latest | sudo k3s ctr images import -;
    fi

    echo "Successfully built: ${api::-1}."
done
cd ..

# Build Application images
cd ync-app
for app in `ls -d */`; do
    echo "Building ${app::-1}..."

    docker build -t ${app::-1} ${app}
    if [ "$1" == "k3s" ]; then
        docker save ${app::-1}:latest | sudo k3s ctr images import -;
    fi

    echo "Successfully built: ${app::-1}."
done
cd ..
