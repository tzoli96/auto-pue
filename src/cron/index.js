const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');

const app = express();
const port = 3003;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

cron.schedule('* * * * *', () => {
    console.log('Cron job running every minute');
});

app.get('/', (req, res) => {
    res.send('Hello from Cron!');
});

app.listen(port, () => {
    console.log(`Cron service running on port ${port}`);
});
