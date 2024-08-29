const configService = require('../services/configurationService');
const DomainAttributeService = require('../services/domainAttributeService');

async function initializeConfigurations() {

    const domainAttributes = [
        { attribute_name: 'is_webshop' },
        { attribute_name: 'email' },
        { attribute_name: 'phone' },
        { attribute_name: 'company_name' },
        { attribute_name: 'is_filled_content' },
    ];
    for (const attribute of domainAttributes) {
        const existingAttribute = await DomainAttributeService.getAttributeByAttributeName(attribute.attribute_name);
        if (!existingAttribute) {
            await DomainAttributeService.createAttribute(attribute.attribute_name);
            console.log(`Configuration ${attribute.attribute_name} initialized`);
        } else {
            console.log(`Configuration ${attribute.attribute_name} already exists`);
        }
    }

    const configurations = [
        { key: 'query.resync_date', value: '', description: `Resynchronization date` },
        { key: 'job.schedule.resync', value: '* * * * *', description: `Cron schedule for resync job` },
        { key: 'job.schedule.verify', value: '* * * * *', description: `Cron schedule for verify job` }
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
