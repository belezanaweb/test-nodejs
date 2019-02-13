FROM node:11.9.0

ENV NODE_ENV=production HOME=/app

WORKDIR /${HOME}/server

COPY package.json ${HOME}/server/

RUN yarn && yarn cache clean

COPY . .

CMD ["yarn start"]
