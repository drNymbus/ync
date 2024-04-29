#!/bin/bash

cd ync-database
chmod +x start.sh
./start.sh
cd ..

cd ync-node-app
npm i
node index.js