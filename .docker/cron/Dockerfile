FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install bull bull-board node-cron

COPY . .

EXPOSE 3003
CMD ["sh", "-c", "npm install --force && npm start"]
