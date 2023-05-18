FROM node:current

WORKDIR /usr/belezanaweb-api

COPY ./package.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["node", "dist/main"]


