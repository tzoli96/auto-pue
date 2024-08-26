FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["sh", "-c", "npm install --force"]
CMD ["npm", "start"]

#CMD ["node", "--inspect=0.0.0.0:9229", "src/index.js"]
