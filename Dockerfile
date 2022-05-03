FROM node:16.14.2
ENV NODE_ENV=development

WORKDIR /api

COPY package*.json ./

RUN npm i
RUN npm rebuild
COPY . .
RUN npm run build
COPY ./dist ./dist

EXPOSE 3007
CMD [ "npm", "start" ]
