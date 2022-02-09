FROM node:16-alpine

# Build Arguments
ARG PORT
ARG DB_ENV

# Environment Variables
ENV LANG=pt_BR.UTF-8
ENV TZ=America/Sao_Paulo
ENV PORT=$PORT
ENV DB_ENV=$DB_ENV

# Create app Directory
WORKDIR /usr/app/api-teste-nodejs

# Copy
COPY ./src/ ./src/
COPY ./package.json ./
COPY ./ormconfig.js ./
COPY ./tsconfig.json ./
COPY ./tsconfig-build.json ./

# Folder
RUN mkdir -p ./temp/uploads/

# Install
RUN npm install -g npm typescript
RUN npm --version && node --version && tsc -v
RUN pwd && ls
RUN npm install --only=prod --ignore-scripts

# Build
RUN npm run build-prod

EXPOSE 80
CMD ["node", "dist/main/server.js" ]
