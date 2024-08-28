const scanService = require('../services/scanService');

exports.resynchronizeDomains = async (req, res) => {
    try {
        const result = await scanService.resynchronizeDomains();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyWebshopSync = async (req, res) => {
    try {
        const result = await scanService.verifyWebshopSync();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resynchronizeDomainById = async (req, res) => {
    try {
        const result = await scanService.resynchronizeDomainById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyWebshopSyncById = async (req, res) => {
    try {
        const result = await scanService.verifyWebshopSyncById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
