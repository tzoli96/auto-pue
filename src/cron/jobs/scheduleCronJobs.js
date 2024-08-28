const cron = require('node-cron');
const jobDefinitions = require('./jobDefinitions');

function scheduleCronJobs() {
    jobDefinitions.forEach(job => {
        cron.schedule(job.schedule, async () => {
            try {
                console.log(`${job.name} job running`);
                await job.action();
            } catch (error) {
                console.error(`${job.name} job failed:`, error.message);
            }
        });
    });
}

module.exports = scheduleCronJobs;
