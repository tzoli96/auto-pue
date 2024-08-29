const apiClient = require("../api/apiClient");

class DomainService {


    /**
     * Get all domains.
     * @returns {Promise<object>} - The response data from the API containing the created domain.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getDomains() {
        try {
            const response = await apiClient.get('/domains');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get all domains: ${error.message}`);
        }
    }

    /**
     * Creates a new domain.
     * @param {string} domainUrl - The URL of the domain.
     * @param {string} domainType - The type of the domain (e.g., business, personal).
     * @param {Date} domainCreated - The creation date of the domain.
     * @returns {Promise<object>} - The response data from the API containing the created domain.
     * @throws {Error} - Throws an error if the request fails.
     */
    async createDomain(domainUrl, domainType, domainCreated) {
        try {
            const response = await apiClient.post('/domains/create', {
                domainUrl,
                domainType,
                domainCreated
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create domain: ${error.message}`);
        }
    }

    /**
     * Retrieves a domain by its ID.
     * @param {string} id - The ID of the domain.
     * @returns {Promise<object>} - The domain data retrieved from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getDomainById(id) {
        try {
            const response = await apiClient.get(`/domains/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get domain by ID "${id}": ${error.message}`);
        }
    }

    /**
     * Retrieves a domain by its URL.
     * @param {string} url - The URL of the domain.
     * @returns {Promise<object>} - The domain data retrieved from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getDomainByUrl(url) {
        try {
            const response = await apiClient.post(`/url_domains/`, { url });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get domain by URL "${url}": ${error.message}`);
        }
    }

    /**
     * Sets a specific key-value pair for a domain.
     * @param {string} domainId - The ID of the domain.
     * @param {string} key - The key of the attribute to set.
     * @param {string} value - The value to set for the specified key.
     * @returns {Promise<object>} - The updated domain data after setting the attribute.
     * @throws {Error} - Throws an error if the request fails.
     */
    async setDataForSpecificDomain(domainId, key, value) {
        try {
            const response = await apiClient.put(`/domains/${domainId}/set/${key}`, { value });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to set data for domain ID "${domainId}": ${error.message}`);
        }
    }

    /**
     * Retrieves a specific key-value pair for a domain.
     * @param {string} domainId - The ID of the domain.
     * @param {string} key - The key of the attribute to retrieve.
     * @returns {Promise<string>} - The value associated with the specified key.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getDataForSpecificDomain(domainId, key) {
        try {
            const response = await apiClient.get(`/domains/${domainId}/get/${key}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get data for domain ID "${domainId}" and key "${key}": ${error.message}`);
        }
    }

    /**
     * Updates an existing domain by its ID.
     * @param {string} id - The ID of the domain.
     * @param {object} updateData - The data to update for the domain.
     * @returns {Promise<object>} - The updated domain data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    async updateDomain(id, updateData) {
        try {
            const response = await apiClient.put(`/domains/update/${id}`, updateData);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update domain with ID "${id}": ${error.message}`);
        }
    }

    /**
     * Deletes a domain by its ID.
     * @param {string} id - The ID of the domain to delete.
     * @returns {Promise<object>} - The response data confirming the deletion of the domain.
     * @throws {Error} - Throws an error if the request fails.
     */
    async deleteDomain(id) {
        try {
            const response = await apiClient.post('/domains/delete', { id });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete domain with ID "${id}": ${error.message}`);
        }
    }
}

module.exports = new DomainService();
