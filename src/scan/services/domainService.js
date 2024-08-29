const apiClient = require("../api/apiClient");

class DomainService {
    
    /**
     * Creates a new domain.
     * @param {string} domainUrl - The URL of the domain.
     * @param {string} domainType - The type of the domain.
     * @param {Date} domainCreated - The creation date of the domain.
     * @returns {Promise<object>} - The response data from the API.
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
     * @returns {Promise<object>} - The domain data.
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
     * Updates an existing domain by its ID.
     * @param {string} id - The ID of the domain.
     * @param {object} updateData - The data to update.
     * @returns {Promise<object>} - The updated domain data.
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
     * @returns {Promise<object>} - The response data from the API.
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
