const configService = require('../services/configurationService');
const authService = require("../services/authService");

async function initializeConfigurations() {

    await authService.createUser('admin@admin.com', 'admin9999');

    const configurations = [
        { key: 'query.resync_date', value: '', description: `Resynchronization date` },
        { key: 'job.schedule.resync', value: '0 * * * *', description: `Cron schedule for resync job` },
        { key: 'job.schedule.verify', value: '0 * * * *', description: `Cron schedule for verify job` }
    ];

    for (const config of configurations) {
        const existingConfig = await configService.getConfig(config.key);
        if (!existingConfig) {
            await configService.setConfig(config.key, config.value, config.description);
            console.log(`Configuration ${config.key} initialized`);
        } else {
            console.log(`Configuration ${config.key} already exists`);
        }
    }
}

module.exports = initializeConfigurations;
