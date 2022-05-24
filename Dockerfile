FROM node:16.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g sequelize-cli

COPY . .

EXPOSE 3000

CMD ["npm","start"]