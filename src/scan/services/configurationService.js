const apiClient = require("../api/apiClient");

class ConfigurationService {

    /**
     * Sets a configuration key-value pair.
     * @param {string} key - The configuration key.
     * @param {string} value - The configuration value.
     * @returns {Promise<object>} - The response data from the API.
     * @throws {Error} - Throws an error if the request fails.
     */
    async setConfig(key, value) {
        try {
            const response = await apiClient.post('/config/set', { key, value });
            return response.data.message;
        } catch (error) {
            throw new Error(`Failed to set config for key "${key}": ${error.message}`);
        }
    }

    /**
     * Retrieves a configuration value for a given key.
     * @param {string} key - The configuration key to retrieve.
     * @returns {Promise<string>} - The value associated with the configuration key.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getConfig(key) {
        try {
            const response = await apiClient.post('/config/get', { key });
            return response.data.message;
        } catch (error) {
            throw new Error(`Failed to get config for key "${key}": ${error.message}`);
        }
    }
}

module.exports = new ConfigurationService();
