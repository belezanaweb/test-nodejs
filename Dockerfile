FROM mhart/alpine-node:12

WORKDIR /var/www/test

COPY package.json ./
COPY . .

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "start" ]
