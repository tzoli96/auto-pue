FROM node:latest

# Node felhasználó beállítása
USER node

# Alkalmazás könyvtár létrehozása és beállítása
WORKDIR /app

# Csomagok telepítése
COPY package*.json ./
RUN npm install

# Playwright telepítése
RUN npm install playwright

# Alkalmazás fájlok másolása
COPY . .

# Port expozíciója
EXPOSE 3002

# Parancs futtatása
CMD ["sh", "-c", "npm install --force && npm run dev"]
