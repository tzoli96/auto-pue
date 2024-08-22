const cron = require('node-cron');
const exampleQueue = require('../queues/exampleQueue');

function scheduleCronJobs() {
    cron.schedule('* * * * *', () => {
        console.log('Cron job running every minute');
        exampleQueue.add({ jobId: 'CronJob', message: 'This job runs every minute' });
    });
}

module.exports = scheduleCronJobs;
