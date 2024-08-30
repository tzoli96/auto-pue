const axios = require('axios');

const apiForBackendClient = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://backend:3001/api',
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiForBackendClient.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

apiForBackendClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

module.exports = apiForBackendClient;
