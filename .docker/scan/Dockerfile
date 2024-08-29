FROM node:latest

# Alapvető csomagok telepítése a Playwright böngészők futtatásához
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libjpeg-dev \
    libxshmfence-dev \
    libxtst6 \
    libxrender1 \
    libx11-xcb1 \
    libx11-6 \
    libxcb1 \
    libxcursor1 \
    libxi6 \
    libxext6 \
    libgl1 \
    libxss1 \
    libxt6 \
    libegl1 \
    libgl1-mesa-glx \
    libgles2-mesa \
    libgtk-3-0 \
    gstreamer1.0-plugins-base \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-libav \
    gstreamer1.0-tools \
    gstreamer1.0-x \
    gstreamer1.0-alsa \
    gstreamer1.0-gl \
    gstreamer1.0-gtk3 \
    gstreamer1.0-pulseaudio \
    gstreamer1.0-libav \
    libx264-dev \
    libwoff1 \
    libharfbuzz-icu0 \
    libenchant-2-2 \
    libsecret-1-0 \
    libhyphen0 \
    libmanette-0.2-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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
CMD ["sh", "-c", "npm install --force && npx playwright install && npm run dev"]
