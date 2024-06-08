#!/bin/bash

echo "REACT_APP_API_CONTACT_POINTS=\"${API_CONTACT_POINTS}\"" > .env
echo "REACT_APP_API_PORT=${API_PORT}" >> .env

echo "installing..."
npm install
# If you are building your code for production in CI/CD
# https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
# RUN npm ci --omit=dev

echo "run build..."
npm run build

echo "install serve..."
npm install -g serve

echo "serving..."
serve -s build