const WebshopDetectorService = require('../webshopDetectorService');
const DomainService = require('../domainService');

class DomainDetectorService {

    /**
     * Executes the domain detection process.
     * @throws {Error} - Throws an error if the execution fails.
     */
    async execute() {
        try {
            const domains = await DomainService.getDomains();

            for (const domain of domains) {
                await this.detect(domain);
            }

            return 'Webshop synchronization verified for all domains.';
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }

    /**
     * Detects if the provided domain is a webshop and updates its data accordingly.
     * @param {object} domain - The domain object containing domain_url and other properties.
     * @returns {Promise<void>} - No return value.
     * @throws {Error} - Throws an error if detection or updating fails.
     */
    async detect(domain) {
        try {
            const result = await WebshopDetectorService.isWebshop(domain.domain_url);
            const domainEntity = await DomainService.getDomainByUrl(domain.domain_url);

            if (result.isWebshop) {
                console.log(" --> " + domain.domain_url)
                console.log(result)
                await this.updateDomainData(domainEntity.domain_id, result, true);
                console.log(`${domain.domain_url} is likely a webshop.`);
            } else {
                await this.updateDomainData(domainEntity.domain_id, result, false);
                console.log(`${domain.domain_url} does not appear to be a webshop.`);
            }
        } catch (error) {
            console.error(`Failed to detect domain ${domain.domain_url}: ${error.message}`);
            throw new Error(`Domain detection failed: ${error.message}`);
        }
    }

    /**
     * Updates the domain data in the database based on the detection results.
     * @param {string} domainId - The ID of the domain to update.
     * @param {object} result - The detection result containing keywords, phone numbers, emails, and company names.
     * @param {boolean} isWebshop - Flag indicating whether the domain is a webshop.
     * @returns {Promise<void>} - No return value.
     * @throws {Error} - Throws an error if updating fails.
     */
    async updateDomainData(domainId, result, isWebshop) {
        try {
            await DomainService.setDataForSpecificDomain(domainId, "is_webshop", isWebshop ? "1" : "0");

            if (result.error_code) {
                await DomainService.setDataForSpecificDomain(domainId, "is_dns_setup", "0");
            } else {
                await DomainService.setDataForSpecificDomain(domainId, "is_dns_setup", "1");
            }

            if (result.defaultHostingPage) {
                await DomainService.setDataForSpecificDomain(domainId, "is_default_hosting_page", "1");
            } else {
                await DomainService.setDataForSpecificDomain(domainId, "is_default_hosting_page", "0");
            }

            if (result.phoneNumbers) {
                await DomainService.setDataForSpecificDomain(domainId, "phoneNumbers", result.phoneNumbers);
            }

            if (result.emailAddresses) {
                await DomainService.setDataForSpecificDomain(domainId, "emailAddresses", result.emailAddresses);
            }

            if (result.companyNames) {
                await DomainService.setDataForSpecificDomain(domainId, "companyNames", result.companyNames);
            }

        } catch (error) {
            console.error(`Failed to update domain data for ID ${domainId}: ${error.message}`);
            throw new Error(`Failed to update domain data: ${error.message}`);
        }
    }
}

module.exports = new DomainDetectorService();
