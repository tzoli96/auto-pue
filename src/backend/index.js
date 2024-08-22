const express = require('express');
const connectToDatabase = require('./db/db');
const indexRouter = require('./routes/index');
const { port, mongoUri } = require('./config/config');

const app = express();

connectToDatabase(mongoUri);

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
});
