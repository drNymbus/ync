FROM node:22.2

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

ENV API_CONTACT_POINT='127.0.0.1'
ENV PORT=3000

EXPOSE ${PORT}/tcp

RUN npm install
# If you are building your code for production in CI/CD
# https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
# RUN npm ci --omit=dev
RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["npm", "serve"]