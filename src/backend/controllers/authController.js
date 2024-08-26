const authService = require('../services/authService');

class AuthController {
    static async login(req, res) {
        console.log('test')
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser(email, password);
            res.json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async test(req, res) {
        console.log('test')
    }
}

module.exports = AuthController;
