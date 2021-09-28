FROM node:16.7.0-alpine3.12

COPY ./package.json /app/package.json

WORKDIR /app

RUN npm install --ignore-scripts

COPY ./ /app

RUN npm run dev

CMD npm run serve