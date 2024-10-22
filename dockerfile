FROM node:alpine

WORKDIR /usr/app
COPY package*.json .
RUN npm install

COPY client ./client
COPY webpack.config.js .
RUN npm run build

COPY server ./server
COPY [ "movie_dataset.json", "init_db.js", "." ]