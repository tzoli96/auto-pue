const domainService = require('../services/domainService');
const DomainRepository = require('../services/domainRepository');

class DomainController {
    /**
     * Handles the request to retrieve all domains.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async getDomains(req, res) {
        try {
            const domains = await domainService.getDomains();
            res.json(domains);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Handles the request to resynchronize all domains.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async resynchronizeDomains(req, res) {
        try {
            const message = await domainService.resynchronizeDomains();
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Handles the request to verify webshop synchronization for all domains.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async verifyWebshopSync(req, res) {
        try {
            const message = await domainService.verifyWebshopSync();
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Handles the request to resynchronize a specific domain by ID.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async resynchronizeDomainById(req, res) {
        try {
            const { domainId } = req.params;
            const message = await domainService.resynchronizeDomainById(domainId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to verify webshop synchronization for a specific domain by ID.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async verifyWebshopSyncById(req, res) {
        try {
            const { domainId } = req.params;
            const message = await domainService.verifyWebshopSyncById(domainId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to create a new domain.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async createDomain(req, res) {
        try {
            const { domainUrl, domainType, domainCreated } = req.body;
            const newDomain = await DomainRepository.createDomain(domainUrl, domainType, domainCreated);
            res.status(201).json(newDomain);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Handles the request to delete a domain by ID.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async deleteDomain(req, res) {
        try {
            const { domainId } = req.body;
            const deletedDomain = await DomainRepository.deleteDomain(domainId);
            res.status(200).json(deletedDomain);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to update a domain by ID.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async updateDomain(req, res) {
        try {
            const { domainId } = req.params;
            const updatedDomain = await DomainRepository.updateDomain(domainId, req.body);
            res.status(200).json(updatedDomain);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to retrieve a domain by its ID.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async getDomainById(req, res) {
        try {
            const { domainId } = req.params;
            const domain = await DomainRepository.getDomainById(domainId);
            res.status(200).json(domain);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to set a specific key-value pair for a domain.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async setDataForSpecificDomain(req, res) {
        try {
            const { domainId, key } = req.params;
            const { value } = req.body;
            const updatedDomain = await DomainRepository.setDataForSpecificDomain(domainId, key, value);
            res.status(200).json(updatedDomain);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to retrieve the value of a specific attribute for a domain.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async getDataForSpecificDomain(req, res) {
        try {
            const { domainId, key } = req.params;
            const value = await DomainRepository.getDataForSpecificDomain(domainId, key);
            res.status(200).json(value);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    /**
     * Handles the request to retrieve a domain by its URL.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     */
    async getDomainByUrl(req, res) {
        try {
            const { url } = req.body;
            const domain = await DomainRepository.getDomainByUrl(url);
            res.status(200).json(domain);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new DomainController();
