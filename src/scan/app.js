const express = require('express');
const mongoose = require('mongoose');
const scanRoutes = require('./routes/scanRoutes');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api', scanRoutes);

module.exports = app;
