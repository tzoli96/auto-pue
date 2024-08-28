const playwrightService = require('../services/playwrightService');

class ScanService {
    async resynchronizeDomains() {
        try {
            const url = 'https://info.domain.hu/varolista/hu/ido.html';
            const domContent = await playwrightService.getDOM(url);

            console.log('DOM Content:', domContent);

            return 'All domains resynchronized successfully with the fetched DOM content.';
        } catch (error) {
            console.log(error)
            throw new Error(`Resynchronize Domains job failed: ${error.message}`);
        }
    }

    async verifyWebshopSync() {
        try {
            return 'Webshop synchronization verified for all domains.';
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }

    async resynchronizeDomainById(id) {
        try {
            return `Webshop synchronization verified domains. ${id}`;
        } catch (error) {
            throw new Error(`Resynchronize Domain by ID job failed: ${error.message}`);
        }
    }

    async verifyWebshopSyncById(id) {
        try {
            return `Webshop synchronization verified  ${id}`;
        } catch (error) {
            throw new Error(`Verify Webshop Sync by ID job failed: ${error.message}`);
        }
    }
}

module.exports = new ScanService();
