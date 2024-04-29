#!/usr/bin/bash

cd ../..

# Build API images
cd ync-api
for api in `ls -d */`; do
    echo "Building ${api::-1}..."
    # Build image and register it to k3s
    docker build -t ${api::-1} ${api}
    echo "Successfully built: ${api::-1}."
done
cd ..

# Build Application images
cd ync-app
for app in `ls -d */`; do
    echo "Building ${app::-1}..."
    docker build -t ${app::-1} ${app}
    echo "Successfully built: ${app::-1}."
done
cd ..
