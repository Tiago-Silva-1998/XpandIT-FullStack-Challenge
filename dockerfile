FROM node:alpine

WORKDIR /usr/app
COPY . /usr/app
RUN npm install
RUN npm run build

CMD ["npm","run", "start"]