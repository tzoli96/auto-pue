const cron = require('node-cron');
const getJobDefinitions = require('./jobDefinitions');

async function scheduleCronJobs() {
    const jobs = await getJobDefinitions();

    for (const job of jobs) {
        cron.schedule(job.schedule, async () => {
            try {
                console.log(`${job.name} job running`);
                await job.action();
            } catch (error) {
                console.error(`${job.name} job failed:`, error.message);
            }
        });
    }
}

module.exports = scheduleCronJobs;
