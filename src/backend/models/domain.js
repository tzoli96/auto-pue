const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const domainSchema = new mongoose.Schema({
    domain_url: {
        type: String,
        required: true,
        unique: true,
    },
    domain_type: {
        type: String,
        required: true
    },
    domain_created_date: {
        type: Date,
        default: Date.now,
    },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

// Method to set an attribute
domainSchema.methods.setData = function(attributeCode, attributeValue) {
    if (typeof attributeValue === 'object') {
        this.attributes.set(attributeCode, attributeValue);  // Tárolás objektumként
    } else {
        this.attributes.set(attributeCode, attributeValue);
    }
    return this.save(); // Az attributumok mentése
};

// Method to get an attribute
domainSchema.methods.getData = function(attributeCode) {
    return this.attributes.get(attributeCode);
};

// Static method to create a new domain (if it doesn't exist)
domainSchema.statics.createDomain = async function(domainUrl, domainType) {
    const existingDomain = await this.findOne({ domain_url: domainUrl });
    if (existingDomain) {
        throw new Error('Domain URL already exists');
    }

    const domain = new this({ domain_url: domainUrl, domain_type: domainType });
    return domain.save();
};

// Auto-increment plugin for domain_id
domainSchema.plugin(AutoIncrement, { inc_field: 'domain_id' });

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
