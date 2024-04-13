#!bin/bash

cd ..

cd ync-node-app
docker build -t ync-node-app .
cd ..

cd ync-react-app
docker build -t ync-react-app .
cd ..
