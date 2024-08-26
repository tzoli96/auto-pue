const express = require('express');
const connectToDatabase = require('./db/db');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const { port, mongoUri } = require('./config/config');

const app = express();

connectToDatabase(mongoUri);

// Middleware
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
});
