const jobService = require('../services/jobService');
const taskQueue = require('../queues/taskQueue');
const configService = require('../services/configurationService');

async function getJobDefinitions() {
    const resyncSchedule = await configService.getConfig('job.schedule.resync');
    const verifySchedule = await configService.getConfig('job.schedule.verify');

    return [
        {
            name: 'ResynchronizeDomains',
            schedule: resyncSchedule || '* * * * *',
            action: async () => {
                const data = await jobService.resynchronizeDomains();
                await taskQueue.add({ jobId: 'ResynchronizeDomains', data });
                console.log('Resynchronize Domains job completed successfully');
            }
        },
        {
            name: 'VerifyWebshopSync',
            schedule: verifySchedule || '* * * * *',
            action: async () => {
                const data = await jobService.verifyWebshopSync();
                await taskQueue.add({ jobId: 'VerifyWebshopSync', data });
                console.log('Verify Webshop Synchronization job completed successfully');
            }
        }
    ];
}

module.exports = getJobDefinitions;
