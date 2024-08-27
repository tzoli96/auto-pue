FROM node:latest

USER node

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install playwright

COPY . .

EXPOSE 3002
CMD ["sh", "-c", "npm install --force && npm start"]
