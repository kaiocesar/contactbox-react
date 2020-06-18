FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 4003

CMD ["node", "/src/index.js"]
