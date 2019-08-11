FROM node:12

WORKDIR /app

COPY . .

RUN yarn

CMD [ "node", "src/index.js" ]