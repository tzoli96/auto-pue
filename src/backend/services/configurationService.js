const Configuration = require('../models/configuration');

class ConfigurationService {
    async setConfig(key, value, description = '') {
        return await Configuration.findByIdAndUpdate(
            key,
            { value, description },
            { upsert: true, new: true }
        );
    }

    async getConfig(key) {
        const config = await Configuration.findById(key);
        return config ? config.value : null;
    }

    async deleteConfig(key) {
        return await Configuration.findByIdAndDelete(key);
    }


    async getAllConfigs() {
        return await Configuration.find();
    }
}

module.exports = new ConfigurationService();
