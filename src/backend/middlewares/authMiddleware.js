const TokenUtil = require('../utils/tokenUtil');

class AuthMiddleware {
    static authenticateToken(req, res, next) {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        try {
            const decoded = TokenUtil.verifyToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).send('Invalid token.');
        }
    }
}

module.exports = AuthMiddleware;
