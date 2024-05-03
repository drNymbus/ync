FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

ENV API_CONTACT_POINT='127.0.0.1'
ENV PORT=3000

COPY . .

EXPOSE 3000/tcp

ENTRYPOINT ["npm", "start"]
