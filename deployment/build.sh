#!/usr/bin/bash

cd ..

# Build API image
cd ync-node-app
docker build -t ync-node-app .
cd ..

# Build React image
cd ync-react-app
docker build -t ync-react-app .
cd ..

# Register custom images to k3s
docker save ync-node-app:latest | sudo k3s ctr images import -
# docker save ync-react-app:latest | sudo k3s ctr images import -