FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

ENV API_CONTACT_POINT='127.0.0.1'
ENV PORT=3000

# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE ${PORT}/tcp

ENTRYPOINT ["npm", "start"]
