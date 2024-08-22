const express = require('express');
const connectToDatabase = require('./db/db');
const setupBullBoard = require('./bullBoard/bullBoard');
const scheduleCronJobs = require('./jobs/cronJobs');
const { port, mongoUri } = require('./config/config');
const indexRouter = require('./routes/index');

const app = express();

connectToDatabase(mongoUri);

setupBullBoard(app);

scheduleCronJobs();

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Cron service running on port ${port}`);
});
