const express = require('express');
const scanRoutes = require('./routes/scanRoutes');

const app = express();

app.use(express.json());

app.use('/api', scanRoutes);

module.exports = app;
