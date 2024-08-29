const express = require('express');
const setupBullBoard = require('./bullBoard/bullBoard');
const scheduleCronJobs = require('./jobs/scheduleCronJobs');
const { port, mongoUri } = require('./config/config');

const app = express();

async function startServer() {
    try {
        // Adding a 30-second delay before scheduling cron jobs
        console.log('Waiting for 30 seconds before starting cron jobs...');
        await new Promise(resolve => setTimeout(resolve, 30000));

        setupBullBoard(app);
        await scheduleCronJobs();
        app.listen(port, () => {
            console.log(`Cron service running on port ${port}`);
        });
    } catch (error) {
        console.error('Error during server initialization:', error);
        process.exit(1);
    }
}


startServer();
