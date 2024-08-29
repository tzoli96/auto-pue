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
});

domainSchema.pre('save', async function(next) {
    try {
        const domain = await mongoose.models.Domain.findOne({ domain_url: this.domain_url });
        if (domain) {
            throw new Error('Domain URL already exists');
        }
        next();
    } catch (error) {
        next(error);
    }
});
domainSchema.plugin(AutoIncrement, { inc_field: 'domain_id' });

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
