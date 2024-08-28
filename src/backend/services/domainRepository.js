const Domain = require('../models/domain');
const DomainAttributeValue = require('../models/domain_attribute');
const mongoose = require('mongoose');
const {debug} = require("nodemon/lib/utils");

class DomainRepository {

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
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ID format');
            }

            const domain = await Domain.find({domain_id:id});
            throw new Error('Domain not found');

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
