#!/usr/bin/bash

cd ..

# Build API image
cd ync-shop-api
docker build -t ync-shop-api .
cd ..

# Build React image
cd ync-shop-app
docker build -t ync-shop-app .
cd ..

# Register custom images to k3s
docker save ync-node-app:latest | sudo k3s ctr images import -
# docker save ync-react-app:latest | sudo k3s ctr images import -