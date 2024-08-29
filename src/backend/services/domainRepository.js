const Domain = require('../models/domain');
const DomainAttributeValue = require('../models/domain_attribute');
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
            // Sanitize the domain URL
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

    async getDomainById(id) {
        try {
            const domain = await Domain.find({domain_id:id});

            if (!domain) {
                throw new Error('Domain not found');
            }
            const attributes = await DomainAttributeValue.find({ domain_id: domain.domain_id }).populate('attribute_id');
            return {
                domain,
                attributes
            };
        } catch (error) {
            throw new Error(`Failed to find domain by ID: ${error.message}`);
        }
    }

    async getAllDomains() {
        try {
            return await Domain.find({});
        } catch (error) {
            throw new Error(`Failed to retrieve domains: ${error.message}`);
        }
    }

    async updateDomain(id, updateData) {
        try {
            return await Domain.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Failed to update domain: ${error.message}`);
        }
    }

    async deleteDomain(id) {
        try {
            return await Domain.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Failed to delete domain: ${error.message}`);
        }
    }
}

module.exports = new DomainRepository();
