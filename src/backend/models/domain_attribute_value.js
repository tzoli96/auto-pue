const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const domainAttributeValueSchema = new mongoose.Schema({
    domain_id: {
        type: Number,
        ref: 'Domain',
        required: true,
    },
    attribute_id: {
        type: Number,
        ref: 'DomainAttribute',
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

domainAttributeValueSchema.plugin(AutoIncrement, { inc_field: 'entity_id' });

const DomainAttributeValue = mongoose.model('DomainAttributeValue', domainAttributeValueSchema);

module.exports = DomainAttributeValue;
