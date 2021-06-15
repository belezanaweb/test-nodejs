FROM node:14

RUN mkdir -p /app
RUN mkdir -p /prod

WORKDIR /app
ADD package.json package.json
RUN npm install --production

RUN cp -r node_modules ../prod

RUN npm install

ADD tsconfig.json tsconfig.json
ADD tsconfig.build.json tsconfig.build.json
ADD src src

RUN npm run build

RUN cp -r dist ../prod

################################################

FROM node:14
RUN apt-get update && apt-get -y install curl

RUN mkdir -p /app
WORKDIR /app

COPY --from=0 /prod/node_modules    /app/node_modules
COPY --from=0 /prod/dist    /app/dist

ADD ["package.json", "./"]

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
