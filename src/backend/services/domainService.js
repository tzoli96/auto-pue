const apiClient = require('../api/apiClient');
const DomainRepository = require('./domainRepository');

class DomainService {
    async getDomains() {
        return DomainRepository.getAllDomains();
    }

    async resynchronizeDomains() {
        try {
            const response = await apiClient.get('/resync-domains');
            return response.data;
        } catch (error) {
            throw new Error(`Resynchronize Domains job failed: ${error.message}`);
        }
    }


    async verifyWebshopSync() {
        try {
            const response = await apiClient.get('/verify-webshop-sync');
            return response.data;
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }

    async resynchronizeDomainById(domainId) {
        try {
            const response = await apiClient.get('/resync-domains/'+domainId);
            return response.data;
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }

    async verifyWebshopSyncById(domainId) {

        try {
            const response = await apiClient.get('/verify-webshop-sync/'+domainId);
            return response.data;
        } catch (error) {
            throw new Error(`Verify Webshop Sync job failed: ${error.message}`);
        }
    }
}

module.exports = new DomainService();
