FROM node:16.7.0-alpine3.10

COPY ./package.json /app/package.json

WORKDIR /app

EXPOSE 4000

RUN npm install --ignore-scripts

COPY ./ /app

RUN npm run dev

CMD npm run serve