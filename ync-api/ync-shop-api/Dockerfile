FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY /etc/letsencrypt/live/yn-corp.xyz/privkey.pem ./sslcert/key.pem
COPY /etc/letsencrypt/live/yn-corp.xyz/fullchain.pem ./sslcert/cert.pem

COPY js ./js

COPY index.js ./index.js

ENTRYPOINT ["node", "index.js"]