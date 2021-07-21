# STAGE 1
FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install --fronzen-lockfile

RUN yarn build

# STAGE 2
FROM node:14-alpine AS release

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

COPY package.json yarn.lock ./

RUN yarn install --fronzen-lockfile --production

EXPOSE 3000

CMD ["yarn", "start:production"]
