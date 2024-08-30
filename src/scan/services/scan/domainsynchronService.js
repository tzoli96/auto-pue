const configService = require('../configurationService');
const DomainService = require('../domainService');
const dateComparatorService = require('./dateComparatorService');
const TableScraperService = require('./tableScraperService');

class DomainSynchronService {

    async synchron() {
        const dateCompare = await dateComparatorService.compareDates();
        if (!dateCompare) {
            try {
                const scraper = new TableScraperService();
                const data = await scraper.scrapeTable();
                for (const item of data) {
                    try {
                        await DomainService.createDomain(item.domain_url,item.domain_type,item.domain_created_date);
                        console.log(`Domain created: ${item.domain_url}`);
                    } catch (error) {
                        console.error(`Failed to create domain for URL: ${item.domain_url}. Error: ${error.message}`);
                    }
                }
            } catch (error) {
                console.error('Failed to scrape table data:', error);
            }
        }
    }
}

module.exports = new DomainSynchronService();
