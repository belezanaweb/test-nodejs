FROM node:16.14.2
ENV NODE_ENV=dev

WORKDIR /app

COPY [".", "./"]

RUN npm install
RUN npm run build

ENV NODE_ENV=production
COPY . .

EXPOSE 3333
CMD [ "node", "/app/dist/index.js" ]
