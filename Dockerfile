FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Environment variables
RUN cp ./.env.example ./.env

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "yarn", "run", "start:dev" ]
