FROM node:13.8.0-alpine3.10

COPY ./ /app

WORKDIR /app

EXPOSE 4000

RUN npm install --ignore-scripts

RUN npm run dev

CMD npm run serve