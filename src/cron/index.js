const express = require('express');
const connectToDatabase = require('./db/db');
const setupBullBoard = require('./bullBoard/bullBoard');
const scheduleCronJobs = require('./jobs/scheduleCronJobs');
const { port, mongoUri } = require('./config/config');
const indexRouter = require('./routes/index');

const app = express();

async function startServer() {
    try {

        await connectToDatabase(mongoUri);

        setupBullBoard(app);

        await scheduleCronJobs();


        app.use('/', indexRouter);

        app.listen(port, () => {
            console.log(`Cron service running on port ${port}`);
        });
    } catch (error) {
        console.error('Error during server initialization:', error);
        process.exit(1);
    }
}


startServer();
