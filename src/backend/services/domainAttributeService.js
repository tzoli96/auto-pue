const DomainAttribute = require('../models/domain_attribute');

class DomainAttributeService {

    async createAttribute(attributeName) {
        try {
            const attribute = new DomainAttribute({
                attribute_name: attributeName
            });
            return await attribute.save();
        } catch (error) {
            throw new Error(`Failed to create attribute: ${error.message}`);
        }
    }

    async getAttributeByAttributeName(domainName) {
        try {
            return await DomainAttribute.findOne({ attribute_name: domainName });
        } catch (error) {
            throw new Error(`Failed to find attribute by ID: ${error.message}`);
        }
    }

    async getAllAttributes() {
        try {
            return await DomainAttribute.find({});
        } catch (error) {
            throw new Error(`Failed to retrieve attributes: ${error.message}`);
        }
    }

    async updateAttribute(id, updateData) {
        try {
            return await DomainAttribute.findOneAndUpdate({ id }, updateData, { new: true });
        } catch (error) {
            throw new Error(`Failed to update attribute: ${error.message}`);
        }
    }

    async deleteAttribute(id) {
        try {
            return await DomainAttribute.findOneAndDelete({ id });
        } catch (error) {
            throw new Error(`Failed to delete attribute: ${error.message}`);
        }
    }
}

module.exports = new DomainAttributeService();
