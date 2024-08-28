const Domain = require('../models/domain');

class DomainService {

    async createDomain(domainUrl,domainType,domainCreated) {
        try {
            const domain = new Domain(
                { domain_url: domainUrl ,domain_type: domainType, domain_created_date: domainCreated}
            );
            return await domain.save();
        } catch (error) {
            throw new Error(`Failed to create domain: ${error.message}`);
        }
    }

    async getDomainById(id) {
        try {
            return await Domain.findById(id);
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

module.exports = new DomainService();
