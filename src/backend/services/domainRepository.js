const Domain = require('../models/domain');
const { sanitizeDomainUrl } = require('../utils/urlSanitizer');
const unidecode = require('unidecode');

class DomainRepository {
    /**
     * Creates a new domain entry in the database.
     * @param {string} domainUrl - The URL of the domain to create.
     * @param {string} domainType - The type of the domain.
     * @param {Date} domainCreated - The date the domain was created.
     * @returns {Promise<object>} - The created domain object.
     * @throws {Error} - Throws an error if the creation fails.
     */
    async createDomain(domainUrl, domainType, domainCreated) {
        try {
            const sanitizedDomainUrl = sanitizeDomainUrl(domainUrl);
            const sanitizedDomainType = unidecode(domainType);

            const domain = new Domain({
                domain_url: sanitizedDomainUrl,
                domain_type: sanitizedDomainType,
                domain_created_date: domainCreated,
            });

            return await domain.save();
        } catch (error) {
            throw new Error(`Failed to create domain: ${error.message}`);
        }
    }

    /**
     * Sets a key-value pair for a specific domain.
     * @param {number} id - The domain ID.
     * @param {string} key - The key of the attribute.
     * @param {string|object} value - The value of the attribute.
     * @returns {Promise<object>} - The updated domain object.
     * @throws {Error} - Throws an error if the domain is not found or the update fails.
     */
    async setDataForSpecificDomain(id, key, value) {
        try {
            const domain = await this.getDomainById(id);
            await domain.setData(key, value);
            return domain;
        } catch (error) {
            throw new Error(`Failed to set data for domain ID ${id}: ${error.message}`);
        }
    }

    /**
     * Retrieves the value of a specific attribute for a domain.
     * @param {number} id - The domain ID.
     * @param {string} key - The key of the attribute.
     * @returns {Promise<string|null>} - The value of the attribute or null if not found.
     * @throws {Error} - Throws an error if the domain is not found.
     */
    async getDataForSpecificDomain(id, key) {
        try {
            const domain = await this.getDomainById(id);
            return domain.getData(key) || null;
        } catch (error) {
            throw new Error(`Failed to retrieve data for domain ID ${id}: ${error.message}`);
        }
    }

    /**
     * Retrieves a domain by its URL.
     * @param {string} url - The URL of the domain.
     * @returns {Promise<object|null>} - The domain object or null if not found.
     * @throws {Error} - Throws an error if the domain retrieval fails.
     */
    async getDomainByUrl(url) {
        try {
            const domain = await Domain.findOne({ domain_url: url });
            if (!domain) {
                throw new Error('Domain not found');
            }
            return domain;
        } catch (error) {
            throw new Error(`Failed to retrieve domain by URL "${url}": ${error.message}`);
        }
    }

    /**
     * Retrieves a domain by its ID.
     * @param {number} id - The domain ID.
     * @returns {Promise<object>} - The domain object.
     * @throws {Error} - Throws an error if the domain is not found.
     */
    async getDomainById(id) {
        try {
            const domain = await Domain.findOne({ domain_id: id });
            if (!domain) {
                throw new Error('Domain not found');
            }
            return domain;
        } catch (error) {
            throw new Error(`Failed to find domain by ID ${id}: ${error.message}`);
        }
    }

    /**
     * Retrieves all domains in the database.
     * @returns {Promise<Array<object>>} - An array of domain objects.
     * @throws {Error} - Throws an error if the retrieval fails.
     */
    async getAllDomains() {
        try {
            return await Domain.find({});
        } catch (error) {
            throw new Error(`Failed to retrieve domains: ${error.message}`);
        }
    }

    /**
     * Retrieves all domains that match specific criteria.
     * - Includes domains where the `attributes` field is empty.
     * - Includes domains where `is_dns_setup` is "0" or `is_default_hosting_page` is "1".
     * @returns {Promise<Array<object>>} - An array of filtered domain objects.
     * @throws {Error} - Throws an error if the retrieval fails.
     */
    async getShouldScan() {
        try {
            return await Domain.find({
                $or: [
                    { "attributes": {} }, // Match documents where the `attributes` field is empty
                    {
                        $or: [
                            { "attributes.is_dns_setup": "0" }, // Match documents where `is_dns_setup` is "0"
                            { "attributes.is_default_hosting_page": "1" } // Match documents where `is_default_hosting_page` is "1"
                        ]
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Failed to retrieve domains: ${error.message}`);
        }
    }


    /**
     * Retrieves all domains that are marked as a webshop and have at least one email address.
     * @returns {Promise<Array<object>>} - An array of filtered domain objects.
     * @throws {Error} - Throws an error if the retrieval fails.
     */
    async getFillteredDomains() {
        try {
            return await Domain.find({
                "attributes.is_webshop": "1",
                "attributes.emailAddresses": { $exists: true, $ne: {} }
            });
        } catch (error) {
            throw new Error(`Failed to retrieve filtered domains: ${error.message}`);
        }
    }


    /**
     * Updates a domain by its ID.
     * @param {number} id - The domain ID.
     * @param {object} updateData - The data to update the domain with.
     * @returns {Promise<object|null>} - The updated domain object or null if not found.
     * @throws {Error} - Throws an error if the update fails.
     */
    async updateDomain(id, updateData) {
        try {
            const updatedDomain = await Domain.findOneAndUpdate({ domain_id: id }, updateData, { new: true });
            if (!updatedDomain) {
                throw new Error('Domain not found');
            }
            return updatedDomain;
        } catch (error) {
            throw new Error(`Failed to update domain ID ${id}: ${error.message}`);
        }
    }

    /**
     * Deletes a domain by its ID.
     * @param {number} id - The domain ID.
     * @returns {Promise<object|null>} - The deleted domain object or null if not found.
     * @throws {Error} - Throws an error if the deletion fails.
     */
    async deleteDomain(id) {
        try {
            const deletedDomain = await Domain.findOneAndDelete({ domain_id: id });
            if (!deletedDomain) {
                throw new Error('Domain not found');
            }
            return deletedDomain;
        } catch (error) {
            throw new Error(`Failed to delete domain ID ${id}: ${error.message}`);
        }
    }
}

module.exports = new DomainRepository();
