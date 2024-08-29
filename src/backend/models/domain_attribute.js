const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const domainAttributeSchema = new mongoose.Schema({
    attribute_name: {
        type: String,
        required: true,
        unique: true,
    }
});

domainAttributeSchema.plugin(AutoIncrement, { inc_field: 'attribute_id' });

const DomainAttribute = mongoose.model('DomainAttribute', domainAttributeSchema);

module.exports = DomainAttribute;
