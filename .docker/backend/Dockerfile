FROM node:latest

USER node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY entrypoint.sh /app/entrypoint.sh

CMD ["sh", "-c", "npm install --force"]


EXPOSE 3001
CMD ["sh", "-c", "npm install --force && npm run dev"]

#CMD ["tail", "-f", "/dev/null"]
#CMD ["tail", "-f", "/dev/null"]



#CMD ["node", "--inspect=0.0.0.0:9229", "src/index.js"]
