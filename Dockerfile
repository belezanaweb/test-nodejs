FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
