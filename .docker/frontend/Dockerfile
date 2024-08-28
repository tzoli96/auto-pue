FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
CMD ["sh", "-c", "npm install --force && npm run dev"]
#CMD ["tail", "-f", "/dev/null"]
