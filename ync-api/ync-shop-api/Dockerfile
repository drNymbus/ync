FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

ENV CASSANDRA_CONTACT_POINTS='127.0.0.1'
ENV PORT=3000

# If you are building your code for production
# RUN npm ci --omit=dev

COPY sslcert ./sslcert
COPY js ./js

COPY index.js ./index.js

EXPOSE ${PORT}/tcp

ENTRYPOINT ["node", "index.js"]