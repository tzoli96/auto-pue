const configService = require('../configurationService');
const URLs = require('../../enums/synchron');
const curlService = require('../curlService');

class DateComparatorService {
    constructor() {
        this.url = URLs.MAIN_DOMAIN_URL;
        this.configKey = 'query.resync_date';
    }

    async getLastModifiedDate() {
        return curlService.getLastModifiedDate(this.url);
    }

    async getConfigDate() {
        return configService.getConfig(this.configKey);
    }

    async updateConfigDate(date) {
        return configService.setConfig(this.configKey, date);
    }

    async compareDates() {
        const [dateFromWeb, dateFromConfig] = await Promise.all([
            this.getLastModifiedDate(),
            this.getConfigDate()
        ]);

        if (dateFromWeb === dateFromConfig) {
            console.log('The dates match.');
            return true;
        } else {
            console.log('The dates do not match. Updating config...');
            await this.updateConfigDate(dateFromWeb);
            return false;
        }
    }
}

module.exports = new DateComparatorService();
