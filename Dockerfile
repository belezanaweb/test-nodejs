FROM node:alpine

# Create work directory and ENV vars
WORKDIR /usr/src/app

ARG PORT=3000

ENV PORT=${PORT}


# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy app source to work directory
COPY . ./

# Build project
RUN yarn build

EXPOSE ${PORT}

CMD [ "yarn" , "start" ]
