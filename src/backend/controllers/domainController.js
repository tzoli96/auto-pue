
const domainService = require('../services/domainService');

class DomainController {
    async getDomains(req, res) {
        try {
            const domains = domainService.getDomains();
            res.json(domains);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async resynchronizeDomains(req, res) {
        try {
            const message = domainService.resynchronizeDomains();
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async verifyWebshopSync(req, res) {
        try {
            const message = domainService.verifyWebshopSync();
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async resynchronizeDomainById(req, res) {
        try {
            const { domainId } = req.params;
            const message = domainService.resynchronizeDomainById(domainId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async verifyWebshopSyncById(req, res) {
        try {
            const { domainId } = req.params;
            const message = domainService.verifyWebshopSyncById(domainId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DomainController();
