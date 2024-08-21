FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install playwright

COPY . .

EXPOSE 3002
CMD ["npm", "start"]
