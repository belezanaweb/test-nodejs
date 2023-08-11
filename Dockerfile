FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm ci
COPY --from=builder ./app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start-prod"]
