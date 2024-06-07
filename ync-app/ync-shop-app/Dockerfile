FROM node:22.2

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

ARG REACT_APP_API_CONTACT_POINT
ENV REACT_APP_API_CONTACT_POINT=${REACT_APP_API_CONTACT_POINT}
ARG REACT_APP_API_PORT
ENV REACT_APP_API_PORT=${REACT_APP_API_PORT}

EXPOSE ${PORT}/tcp

RUN npm install
# If you are building your code for production in CI/CD
# https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
# RUN npm ci --omit=dev
RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["npm", "run", "serve"]