FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY .well-known ./.well-known
COPY server.js ./server.js

ENTRYPOINT ["node", "server.js"]