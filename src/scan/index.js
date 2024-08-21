const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Hello from Scan!');
});

app.listen(port, () => {
    console.log(`Scan service running on port ${port}`);
});
