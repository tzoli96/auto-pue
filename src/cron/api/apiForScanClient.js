const axios = require('axios');

const apiForScanClient = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://scan:3002/api',
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiForScanClient.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

apiForScanClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

module.exports = apiForScanClient;
