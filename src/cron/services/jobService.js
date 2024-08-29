const apiForScanClient = require('../api/apiForScanClient');

class JobService {
    async resynchronizeDomains() {
        try {
            const response = await apiForScanClient.get('/resync-domains');
            return response.data;
        } catch (error) {
            throw new Error(`Resynchronize Domains job failed: ${error.message}`);
        }
    }

    async verifyWebshopSync() {
        try {
            const response = await apiForScanClient.get('/verify-webshop-sync');
            return response.data;
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }
}

module.exports = new JobService();
