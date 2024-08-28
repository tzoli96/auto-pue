const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
});

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
