const jobService = require('../services/jobService');
const taskQueue = require('../queues/taskQueue');

module.exports = [
    {
        name: 'ResynchronizeDomains',
        schedule: '* * * * *',
        action: async () => {
            const data = await jobService.resynchronizeDomains();
            console.log(data)
            await taskQueue.add({ jobId: 'ResynchronizeDomains', data });
            console.log('Resynchronize Domains job completed successfully');
        }
    },
    {
        name: 'VerifyWebshopSync',
        schedule: '* * * * *',
        action: async () => {
            const data = await jobService.verifyWebshopSync();
            console.log(data)
            await taskQueue.add({ jobId: 'VerifyWebshopSync', data });
            console.log('Verify Webshop Synchronization job completed successfully');
        }
    }
];
