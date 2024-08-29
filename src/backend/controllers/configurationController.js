
const ConfigurationService = require('../services/configurationService');

class ConfigurationController {

    async setConfig(req, res) {
        try {
            const { key,value } = req.body;
            const message = await ConfigurationService.setConfig(key,value);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getConfig(req, res) {
        try {
            const { key } = req.body;
            const message = await ConfigurationService.getConfig(key);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


}

module.exports = new ConfigurationController();
