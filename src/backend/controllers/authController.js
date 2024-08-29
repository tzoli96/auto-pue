const authService = require('../services/authService');
const DomainRepository = require('../services/domainRepository');

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser(email, password);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async test(req, res) {
        try {
            const domainWithAttributes = await DomainRepository.getDataForSpecificDomain(100,"owner");
            res.json({ domainWithAttributes });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
